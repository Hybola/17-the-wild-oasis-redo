import { useMutation, useQueryClient } from "@tanstack/react-query";
import { udpateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: udpateCurrentUser,
    onSuccess: () => {
      toast.success("The account is successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUser, isUpdating };
}
