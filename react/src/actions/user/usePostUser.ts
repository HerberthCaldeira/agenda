import { useMutation } from "@tanstack/react-query";
import axios from "../../lib/axios/axios";
import {TUserCreateForm} from "../../pages/user/form/zodSchema.ts";
import {postRequest} from "../../lib/axios/requests.ts";



export default function usePostUser() {
    const { mutate, isPending, error, isError, isSuccess } = useMutation({
        mutationFn: (data: TUserCreateForm) => postRequest('/register',data),
    });

    return {
        mutate,
        isPending,
        error,
        isError,
        isSuccess,
    };
}
