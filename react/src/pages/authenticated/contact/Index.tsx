import { Link, useSearchParams, useParams } from "react-router-dom";
import Paginate from "../../components/form/paginate/Paginate";
import useGetContact from "../../../actions/contact/useGetContact.ts";
import {useAuth} from "../../../actions/auth/useAuth.ts";
import useGetAgendaById from "../../../actions/agenda/useGetAgendaById.ts";

export default function Index() {

    const { user } = useAuth({
        middleware: "auth",
    })

    let { agendaId } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();

    const page = searchParams.get("page")
        ? parseInt(searchParams.get("page"))
        : 1;

    const { data, isError, error } = useGetContact({ page, agendaId });
    const { data: agenda } = useGetAgendaById({  agendaId });

    console.log(agenda)


    if (isError) {
        return <div>{JSON.stringify(error)}</div>;
    }

    return (
        <div>
            <div>
                Contact list
            </div>
            <div>
                {
                    agenda?.data?.created_by == user?.id && (<Link to={`/dashboard/agenda/${agendaId}/contact/new`}>New</Link>)
                }
            </div>

            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>email</th>
                    <th>description</th>
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
                                <td>{i.email} </td>
                                <td>{i.description} </td>
                                <td>{
                                    ( i.agenda.created_by == user?.id || i.agenda.permissions[0]?.pivot?.can_edit == 1 )&& (
                                    <Link to={`/dashboard/agenda/${agendaId}/contact/${i.id}/edit`}>edit</Link>
                                )}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <Paginate data={data}/>
        </div>
    );
}

