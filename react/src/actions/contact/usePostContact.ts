import { useMutation } from "@tanstack/react-query";
import {TContactCreateForm} from "../../pages/authenticated/contact/form/zodSchema.ts";
import {postRequest} from "../../lib/axios/requests.ts";

export default function usePostContact(agendaId) {
    const { mutate, isPending, error, isError, isSuccess } = useMutation({
        mutationFn: (data: TContactCreateForm) => postRequest(`/api/agenda/${agendaId}/contact/store`, data),
    });

    return {
        mutate,
        isPending,
        error,
        isError,
        isSuccess,
    };
}
