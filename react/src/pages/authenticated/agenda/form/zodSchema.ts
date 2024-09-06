import { z } from "zod";

const zodSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Required" })
        .max(255, { message: "max 255" }),

});

export type TAgendaCreateForm = z.infer<typeof zodSchema>;
export { zodSchema };
