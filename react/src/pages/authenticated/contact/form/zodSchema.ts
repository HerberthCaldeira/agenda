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
    phone: z
        .string()
        .min(1, { message: "Required" })
        .max(11, { message: "max 11" }),
    description: z
        .string()
        .min(1, { message: "Required" })
        .max(255, { message: "max 255" }),

});

export type TContactCreateForm = z.infer<typeof zodSchema>;
export { zodSchema };
