import { QueryClient, QueryClientProvider } from "react-query"
import { RouterProvider } from "react-router-dom"
import Router from "./Router"

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
      retry: false,
    },
  }
})

export default () => {
  return (
    <QueryClientProvider client={client}>
        <div className="font-mono">
          <RouterProvider router={Router}/>
        </div>
    </QueryClientProvider>
  )
}
