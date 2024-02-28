import { EntityType } from "@prisma/client";
import { z } from "zod";

export const entitySchema = z.object({
  id: z.string().optional(),
  displayName: z.string(),
  modId: z.string(),
  resourceName: z.string(),
  version: z.string(),
  image: z.string().optional(),
  type: z.nativeEnum(EntityType),
});
