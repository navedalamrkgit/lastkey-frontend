import {
  QueryClient,
} from "@tanstack/react-query";

function shouldRetryRequest(
  failureCount,
  error,
) {
  const status =
    error?.response?.status;

  if (
    status === 400 ||
    status === 401 ||
    status === 403 ||
    status === 404 ||
    status === 409 ||
    status === 422
  ) {
    return false;
  }

  return failureCount < 2;
}

export const queryClient =
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: shouldRetryRequest,

        staleTime:
          30 * 1000,

        gcTime:
          5 * 60 * 1000,

        refetchOnWindowFocus:
          false,

        refetchOnReconnect:
          true,

        refetchOnMount:
          true,
      },

      mutations: {
        retry: false,
      },
    },
  });

export default queryClient;