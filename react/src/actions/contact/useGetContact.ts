import { useQuery } from "@tanstack/react-query";
import { getRequest } from "../../lib/axios/requests";
import {QUERY_KEYS_CONTACT} from "./keys/queryKeys.ts";

interface IParams {
    page: number;
    agendaId: number;
}

const useGetContact = ({ page, agendaId }: IParams) => {
    const { data, error, isError, isPending } = useQuery({
        queryKey: QUERY_KEYS_CONTACT.useGetContact(page, agendaId),
        queryFn: async () =>
            await getRequest(`/api/agenda/${agendaId}/contact`, {
                params: {
                    page,

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

export default useGetContact;
