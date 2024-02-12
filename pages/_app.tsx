import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useState } from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  const [queryClientState] = useState(queryClient);
  return (
    <QueryClientProvider client={queryClientState}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
