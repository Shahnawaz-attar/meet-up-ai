import AgentsView from '@/app/modules/agents/ui/agents-view'
import { ErrorState } from '@/app/modules/agents/ui/views/error-state'
import { LoadingState } from '@/components/loading-state'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import {ErrorBoundary} from 'react-error-boundary'

const Page = async () => {

    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<LoadingState title="Loading Agents" description="Please wait while we load your agents." />}>
            <ErrorBoundary fallback={<ErrorState title="Error" description="An unexpected error occurred. Please try again later." />}>
                <AgentsView />
            </ErrorBoundary>
            </Suspense>
    </HydrationBoundary>
  )
}

export default Page