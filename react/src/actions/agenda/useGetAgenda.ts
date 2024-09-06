import { useQuery } from "@tanstack/react-query";
import { getRequest } from "../../lib/axios/requests";
import {QUERY_KEYS_AGENDA} from "./keys/queryKeys.ts";

interface IParams {
    page: number;
}

const useGetAgenda = ({ page }: IParams) => {
    const { data, error, isError, isPending } = useQuery({
        queryKey: QUERY_KEYS_AGENDA.useGetAgenda(page),
        queryFn: async () =>
            await getRequest("/api/agenda", {
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

export default useGetAgenda;
