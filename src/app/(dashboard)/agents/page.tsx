import AgentsView from "@/app/modules/agents/ui/agents-view";
import AgentsListHeader from "@/app/modules/agents/ui/components/agents-list-header";
import { ErrorState } from "@/app/modules/agents/ui/views/error-state";
import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {

   const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      redirect("/sign-in");
    }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  

  return (
   <>
   <AgentsListHeader />
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Agents"
            description="Please wait while we load your agents."
          />
        }
      >
        <ErrorBoundary
          fallback={
            <ErrorState
              title="Error"
              description="An unexpected error occurred. Please try again later."
            />
          }
        >
          <AgentsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
   
   </>
  );
};

export default Page;
