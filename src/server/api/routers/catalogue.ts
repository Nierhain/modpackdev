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
          displayName: input.displayName,
          modId: input.modId,
          resourceName: input.resourceName,
          version: input.version,
          image: input.image,
        },
      });
    }),
  createEntities: protectedProcedure
    .input(entitySchema.array())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.entity.createMany({
        data: input,
      });
    }),
  getEntities: publicProcedure.query(({ ctx }) => {
    const entities = ctx.db.entity.findMany({});
    return entities;
  }),
});
