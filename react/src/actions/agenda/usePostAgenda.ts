import { useMutation } from "@tanstack/react-query";
import axios from "../../lib/axios/axios";
import {TAgendaCreateForm} from "../../pages/authenticated/agenda/form/zodSchema.ts";


const postRequest = async (data: TAgendaCreateForm) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.post("/api/agenda/store", data);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export default function usePostAgenda() {
    const { mutate, isPending, error, isError, isSuccess } = useMutation({
        mutationFn: (data: TAgendaCreateForm) => postRequest(data),
    });

    return {
        mutate,
        isPending,
        error,
        isError,
        isSuccess,
    };
}
