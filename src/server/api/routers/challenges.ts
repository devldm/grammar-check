import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { solutionComments, solutions } from "~/server/db/schema";

export type newSolutionSubmission = typeof solutions.$inferInsert;
export type newCommentSubmission = typeof solutionComments.$inferInsert;

export const challengesRouter = createTRPCRouter({
  postChallenge: protectedProcedure
    .input(
      z.object({
        solution: z.string(),
        grammarId: z.number(),
        grammar: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const result = db.insert(solutions).values({
        solution: input.solution,
        submittedUserId: userId,
        grammarId: input.grammarId,
        grammar: input.grammar,
      } as newSolutionSubmission);

      return result;
    }),

  getGrammar: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.grammar.findFirst();
  }),

  getGrammarHasBeenCompleted: protectedProcedure
    .input(z.object({ grammarId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.solutions.findFirst({
        where: (solutions, { eq }) => {
          return (
            eq(solutions.submittedUserId, ctx.session.user.id) &&
            eq(solutions.grammarId, input.grammarId)
          );
        },
      });
    }),

  getAllSubmittedByUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.solutions.findMany({
      where: (solutions, { eq }) =>
        eq(solutions.submittedUserId, ctx.session.user.id),
    });
  }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.solutions.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getSolutionComments: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.solutionComments.findMany({
        where: (comments, { eq }) => eq(comments.solutionId, input.id),
      });
    }),

  postComment: protectedProcedure
    .input(
      z.object({
        comment: z.string(),
        solutionId: z.number(),
      }),
    )
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const result = db.insert(solutionComments).values({
        solutionId: input.solutionId,
        comment: input.comment,
        commentingUserId: userId,
      } as newCommentSubmission);

      return result;
    }),
});
