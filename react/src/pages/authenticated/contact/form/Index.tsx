import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import {TContactCreateForm, zodSchema} from "./zodSchema";
import Input from "../../../components/form/fields/Input";
import { AxiosError } from "axios";
import usePostContact from "../../../../actions/contact/usePostContact.ts";


export default function Index() {

    let { agendaId } = useParams();

    const queryClient = useQueryClient();

    const methods = useForm<TContactCreateForm>({
        defaultValues: {
            name: "",
            email: "" ,
            phone: "" ,
            description: ""
        },
        resolver: zodResolver(zodSchema),
    });

    const {
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = methods;

    const { mutate } = usePostContact(agendaId);

    const onSubmit: SubmitHandler<TContactCreateForm> = (data) => {
        console.log("onSubmit", data);
        mutate(data, {
            onSuccess: () => {
                console.log("onSuccess");
                reset();

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
            <div>Create Contact</div>
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
