import { useQuery } from "@tanstack/react-query";
import { getRequest } from "../../lib/axios/requests";

interface IParams {
    page: number;
}

const useGetUsersForShare = ({ page }: IParams) => {
    const { data, error, isError, isPending } = useQuery({
        queryKey: ['all', page],
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

export default useGetUsersForShare;
