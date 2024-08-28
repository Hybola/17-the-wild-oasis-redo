import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}
export async function deleteCabin(cabinId) {
  const { error } = await supabase.from("cabins").delete().eq("id", cabinId);
  if (error) {
    console.log(error);
    throw new Error("The cabin could not be deleted");
  }
}
