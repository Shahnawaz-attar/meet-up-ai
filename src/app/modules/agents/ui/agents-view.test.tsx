
import { render, screen } from "@testing-library/react";
import AgentsView from "./agents-view";
import { trpc } from "@/trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("@/trpc/client", () => ({
  useTRPC: () => ({
    agents: {
      getMany: {
        useQuery: jest.fn().mockReturnValue({
          data: [
            { id: 1, name: "Agent 1" },
            { id: 2, name: "Agent 2" },
          ],
          isLoading: false,
        }),
      },
    },
  }),
}));

describe("AgentsView", () => {
  it("renders the agents list", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <AgentsView />
      </QueryClientProvider>
    );

    expect(screen.getByText("Agents")).toBeInTheDocument();
    expect(screen.getByText("Agent 1")).toBeInTheDocument();
    expect(screen.getByText("Agent 2")).toBeInTheDocument();
  });
});
