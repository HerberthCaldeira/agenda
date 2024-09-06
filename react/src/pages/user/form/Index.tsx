import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {TUserCreateForm, zodSchema} from "./zodSchema";
import Input from "../../components/form/fields/Input";
import { AxiosError } from "axios";
import usePostUser from "../../../actions/user/usePostUser.ts";

export default function Index() {

    const navegate = useNavigate();

    const methods = useForm({
        defaultValues: { name: "", email: "", password: "", password_confirmation: "" },
        resolver: zodResolver(zodSchema),
    });

    const {
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = methods;

    const { mutate } = usePostUser();

    const onSubmit: SubmitHandler<TUserCreateForm> = (data) => {
        console.log("onSubmit", data);
        mutate(data, {
            onSuccess: () => {
                console.log("onSuccess");
                reset();
                navegate('/login')

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
            <div>New User</div>
            <div>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input name={"name"} label={"nome"} type={"text"} errors={errors} />
                        <Input name={"email"} label={"E-mail"} type={"email"} errors={errors} />
                        <Input name={"password"} label={"password"} type={"password"} errors={errors} />
                        <Input name={"password_confirmation"} label={"password"} type={"password"} errors={errors} />

                        <button type="submit"> SUBMIT </button>
                    </form>
                </FormProvider>
            </div>
        </>
    );
}
