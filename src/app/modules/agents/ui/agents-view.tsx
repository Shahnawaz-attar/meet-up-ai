"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";


export default function AgentsView() {
  const trpc = useTRPC();
  const { data, } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="flex flex-col p-4 gap-y-4">
      <h1 className="text-2xl font-bold">Agents</h1>
      <ul>
        {data?.map((agent) => (
          <li key={agent.id} className="p-2 border-b">
            {agent.name}
          </li>
        ))}
      </ul>
    </div>
  );
}