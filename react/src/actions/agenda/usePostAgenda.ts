import { useMutation } from "@tanstack/react-query";
import axios from "../../lib/axios/axios";
import {TAgendaCreateForm} from "../../pages/authenticated/agenda/form/zodSchema.ts";
import {postRequest} from "../../lib/axios/requests.ts";

export default function usePostAgenda() {
    const { mutate, isPending, error, isError, isSuccess } = useMutation({
        mutationFn: (data: TAgendaCreateForm) => postRequest("/api/agenda/store", data),
    });

    return {
        mutate,
        isPending,
        error,
        isError,
        isSuccess,
    };
}
