import { useMutation } from "@tanstack/react-query";
import {postRequest} from "../../lib/axios/requests.ts";
interface IPermission {
    agendaId: string;
    userId: string;
    can_see: boolean;
    can_edit: boolean;
}

export default function usePostAgendaPermission() {
    const { mutate, isPending, error, isError, isSuccess } = useMutation({
        mutationFn: (data: IPermission) => postRequest(`/api/agenda/${data.agendaId}/user/${data.userId}/share`, data),
    });

    return {
        mutate,
        isPending,
        error,
        isError,
        isSuccess,
    };
}
