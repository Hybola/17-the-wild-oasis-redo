import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const { isLoading, data: settingsData } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { isLoading, settingsData };
}
