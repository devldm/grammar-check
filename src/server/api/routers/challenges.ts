import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import { solutions } from "~/server/db/schema";

type newSolutionSubmission = typeof solutions.$inferInsert;

export const challengesRouter = createTRPCRouter({
  postChallenge: protectedProcedure
    .input(z.object({ solution: z.string(), grammarId: z.number() }))
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const result = db.insert(solutions).values({
        solution: input.solution,
        submittedUserId: userId,
        grammarId: input.grammarId,
      } as newSolutionSubmission);

      return result;
    }),

  getGrammar: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.grammar.findFirst();
  }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.solutions.findMany({
      where: (solutions, { eq }) =>
        eq(solutions.submittedUserId, ctx.session.user.id),
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
