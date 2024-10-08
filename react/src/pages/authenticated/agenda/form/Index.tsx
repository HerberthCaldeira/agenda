import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {TAgendaCreateForm, zodSchema} from "./zodSchema";
import Input from "../../../components/form/fields/Input";
import { AxiosError } from "axios";
import usePostAgenda from "../../../../actions/agenda/usePostAgenda.ts";
import {QUERY_KEYS_AGENDA} from "../../../../actions/agenda/keys/queryKeys.ts";


export default function Index() {

    const queryClient = useQueryClient();

    const methods = useForm<TAgendaCreateForm>({
        defaultValues: { name: "" },
        resolver: zodResolver(zodSchema),
    });

    const {
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = methods;

    const { mutate } = usePostAgenda();

    const onSubmit: SubmitHandler<TAgendaCreateForm> = (data) => {
        console.log("onSubmit", data);
        mutate(data, {
            onSuccess: () => {
                console.log("onSuccess");
                reset();
                queryClient.invalidateQueries({ queryKey: QUERY_KEYS_AGENDA.useGetAgenda() });
            },
            onError: (err) => {
                if (err instanceof AxiosError && err?.response.status === 422) {
                    const serverErrors = err?.response.data.errors;

                    for (const key in serverErrors) {
                        setError(key, {
                            type: "serverError",
                            message: serverErrors[key][0],
                        });
                    }
                }
            },
        });
    };

    return (
        <>
            <div>Create Agenda</div>
            <div>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input name={"name"} label={"name"} type={"text"} errors={errors} />

                        <button type="submit"> SUBMIT </button>
                    </form>
                </FormProvider>
            </div>
        </>
    );
}
