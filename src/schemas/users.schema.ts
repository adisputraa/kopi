import { z } from "zod";

export const GetUserByIdParamsSchema = z.object({
  id: z.uuid(),
});

export type GetUserByIdParamsRequest = z.infer<typeof GetUserByIdParamsSchema>;
