import { useMutation } from "@tanstack/react-query";
import axios from "../../lib/axios/axios";
import {TUserCreateForm} from "../../pages/user/form/zodSchema.ts";


const postRequest = async (data: TUserCreateForm) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.post("/register", data);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export default function usePostUser() {
    const { mutate, isPending, error, isError, isSuccess } = useMutation({
        mutationFn: (data: TUserCreateForm) => postRequest(data),
    });

    return {
        mutate,
        isPending,
        error,
        isError,
        isSuccess,
    };
}
