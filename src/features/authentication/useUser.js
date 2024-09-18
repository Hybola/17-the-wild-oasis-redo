import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const {
    data: user,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    isFetching,
    user,
    isAuthenticated: user?.role === "authenticated",
  };
}
