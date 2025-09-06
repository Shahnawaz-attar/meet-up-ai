import { agentsRouter } from "@/app/modules/agents/server/procedure";
import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
});
export type AppRouter = typeof appRouter;
