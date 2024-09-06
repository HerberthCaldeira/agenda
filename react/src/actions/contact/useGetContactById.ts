import { useQuery } from "@tanstack/react-query";
import { getRequest } from "../../lib/axios/requests";
import {QUERY_KEYS_CONTACT} from "./keys/queryKeys.ts";

interface IParams {
    agendaId: number;
    contactId: number;
}

const useGetContactById = ({ agendaId, contactId }: IParams) => {
    const { data, error, isError, isPending } = useQuery({
        queryKey: QUERY_KEYS_CONTACT.useGetContactById(agendaId, contactId),
        queryFn: async () =>
            await getRequest(`/api/agenda/${agendaId}/contact/${contactId}/edit`, {
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

export default useGetContactById;
