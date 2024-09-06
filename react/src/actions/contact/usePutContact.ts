import { useMutation } from "@tanstack/react-query";

import {TContactEditForm} from "../../pages/authenticated/contact/form/zodSchema.ts";
import {putRequest} from "../../lib/axios/requests.ts";

export default function usePutContact(agendaId, contactId) {
    const { mutate, isPending, error, isError, isSuccess } = useMutation({
        mutationFn: (data: TContactEditForm) => putRequest(
            `/api/agenda/${agendaId}/contact/${contactId}/update`, data
        ),
    });

    return {
        mutate,
        isPending,
        error,
        isError,
        isSuccess,
    };
}
