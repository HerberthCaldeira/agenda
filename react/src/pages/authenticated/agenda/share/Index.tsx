import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useQueryClient } from "@tanstack/react-query";
import useGetUsersForShare from "../../../../actions/agenda/useGetUsersForShare.ts";
import usePostAgendaPermission from "../../../../actions/agenda/usePostAgendaPermission.ts";
import {QUERY_KEYS_AGENDA} from "../../../../actions/agenda/keys/queryKeys.ts";

export default function Index(){
    let { agendaId } = useParams();

    const queryClient = useQueryClient();

    const [searchParams, setSearchParams] = useSearchParams();

    const page = searchParams.get("page")
        ? parseInt(searchParams.get("page"))
        : 1;

    const { data, isError, error } = useGetUsersForShare({ page, agendaId });

    const { mutate } = usePostAgendaPermission();

    const handleClick = (user, action) => {
        console.log(user, action)

        let data;

        if(action == 'see'){
             data = {
                userId: user.id,
                agendaId,
                can_see: user.agendas?.length > 0 && user.agendas[0].pivot.can_see == 1? false : true,
                can_edit: user.agendas?.length > 0  ? user.agendas[0].pivot.can_edit : false
            };
        }

        if(action == 'edit') {
             data = {
                userId: user.id,
                agendaId,
                can_see: user.agendas?.length > 0 ? user.agendas[0].pivot.can_see : false,
                can_edit: user.agendas?.length > 0 && user.agendas[0].pivot.can_edit == 1 ? false: true
            };
        }

        mutate(data, {
            onSuccess: () => {
                console.log("onSuccess");
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: QUERY_KEYS_AGENDA.useGetUsersForShare(page, agendaId) });
            },
        })
    }

    return (
        <div> users
            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>can see</th>
                    <th>can edit</th>
                    <th>actions</th>
                </tr>
                </thead>
                <tbody>
                {data &&
                    data?.data.map((i) => {
                        return (
                            <tr key={i.id}>
                                <td>{i.id} </td>
                                <td>{i.name} </td>
                                <td>{i.agendas?.length > 0 && i.agendas[0].pivot.can_see == 1? 'yes' : 'not'} </td>
                                <td>{i.agendas?.length > 0 && i.agendas[0].pivot.can_edit == 1? 'yes' : 'not'} </td>
                                <td>
                                    | <button type='button' onClick={() => handleClick(i, 'see')} > toggle see</button> |
                                    | <button type='button' onClick={() => handleClick(i, 'edit')} > toggle edit</button> |
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    )
}
