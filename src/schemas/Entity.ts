import { z } from "zod";

export const entitySchema = z.object({
  name: z.string(),
  modId: z.string(),
  resourceName: z.string(),
  version: z.string(),
  image: z.string().optional(),
});
