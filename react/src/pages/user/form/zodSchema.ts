import { z } from "zod";

const zodSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Required" })
        .max(255, { message: "max 255" }),
    email: z
        .string()
        .email()
        .min(1, { message: "Required" })
        .max(255, { message: "max 255" }),
    password: z
        .string()
        .min(1, { message: "Required" })
        .max(255, { message: "max 255" }),
    password_confirmation: z
        .string()
        .min(1, { message: "Required" })
        .max(255, { message: "max 255" }),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
});

export type TUserCreateForm = z.infer<typeof zodSchema>;
export { zodSchema };
