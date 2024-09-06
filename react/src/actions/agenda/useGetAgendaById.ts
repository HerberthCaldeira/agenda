import { useQuery } from "@tanstack/react-query";
import { getRequest } from "../../lib/axios/requests";

interface IParams {
    agendaId: number;
}

const useGetAgendaById = ({ agendaId }: IParams) => {
    const { data, error, isError, isPending } = useQuery({
        queryKey: ['useGetAgendaById', agendaId],
        queryFn: async () =>
            await getRequest(`/api/agenda/${agendaId}/show`, {
                params: {

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

export default useGetAgendaById;
