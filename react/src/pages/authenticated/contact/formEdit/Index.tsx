import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod";
import {TContactEditForm, zodSchema} from "./zodSchema";
import Input from "../../../components/form/fields/Input";
import { AxiosError } from "axios";
import useGetContactById from "../../../../actions/contact/useGetContactById.ts";
import {useEffect} from "react";
import usePutContact from "../../../../actions/contact/usePutContact.ts";
import {QUERY_KEYS_CONTACT} from "../../../../actions/contact/keys/queryKeys.ts";
export default function Index() {

    let { agendaId, contactId } = useParams();

    const queryClient = useQueryClient();

    const {data, isError, error } = useGetContactById({agendaId, contactId})

    const methods = useForm<TContactEditForm>({
        defaultValues: {
            name: data?.data?.name ,
            email: data?.data?.email ,
            phone: data?.data?.phone ,
            description: data?.data?.description
        },
        resolver: zodResolver(zodSchema),
    });

    const {
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = methods;

    const { mutate } = usePutContact(agendaId, contactId);

    useEffect(() => {
        if (data && data.data) {
            reset({
                name: data.data.name,
                email: data.data.email,
                phone: data.data.phone,
                description: data.data.description,
            });
        }
    }, [data, reset]);
    const onSubmit: SubmitHandler<TContactEditForm> = (data) => {
        console.log("onSubmit", data);
        mutate(data, {
            onSuccess: () => {
                console.log("onSuccess");
                reset();
                queryClient.invalidateQueries({ queryKey: QUERY_KEYS_CONTACT.useGetContact(1, agendaId) });
                queryClient.invalidateQueries({ queryKey: QUERY_KEYS_CONTACT.useGetContactById( agendaId, contactId) });

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
            <div>Edit Contact</div>
            <div>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input name={"name"} label={"name"} type={"text"} errors={errors} />
                        <Input name={"email"} label={"email"} type={"text"} errors={errors} />
                        <Input name={"phone"} label={"phone"} type={"text"} errors={errors} />
                        <Input name={"description"} label={"description"} type={"text"} errors={errors} />

                        <button type="submit"> SUBMIT </button>
                    </form>
                </FormProvider>
            </div>
        </>
    );
}
