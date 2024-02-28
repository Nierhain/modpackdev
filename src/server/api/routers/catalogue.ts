import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { entitySchema } from "@/schemas/Entity";

export const catalogueRouter = createTRPCRouter({
  createEntity: protectedProcedure
    .input(entitySchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.entity.create({
        data: {
          displayName: input.name,
          modId: input.modId,
          resourceName: input.resourceName,
          version: input.version,
          image: input.image,
        },
      });
    }),
  getEntities: publicProcedure.query(({ ctx }) => {
    const entities = ctx.db.entity.findMany({});
    return entities;
  }),
});
