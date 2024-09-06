import { useQuery } from "@tanstack/react-query";
import { getRequest } from "../../lib/axios/requests";
import {QUERY_KEYS_AGENDA} from "./keys/queryKeys.ts";

interface IParams {
    page: number;
    agendaId: number;
}

const useGetUsersForShare = ({ page, agendaId }: IParams) => {
    const { data, error, isError, isPending } = useQuery({
        queryKey: QUERY_KEYS_AGENDA.useGetUsersForShare(page, agendaId),
        queryFn: async () =>
            await getRequest(`/api/agenda/${agendaId}/users`, {
                params: {
                    page

                },
            }),
    });

    return {
        data,
        error,
        isError,
        isPending,
    };
};

export default useGetUsersForShare;
