import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // NOTE: setQueryData -- not setQueriesData, as Jonas suggested
      // and we need ONLY data.user here, not full data, as Jonas suggested
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard");
    },
    onError: () => toast.error("Provided email or password are incorrect"),
  });
  return { login, isLoading };
}
