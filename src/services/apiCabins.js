import supabase, { supabaseUrl } from "./supabase";

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
export async function createUpdateCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1. Create new cabin
  const { data, error: errorCreate } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (errorCreate) {
    console.log(errorCreate);
    throw new Error("Cabins could wasn't created");
  }
  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  //3. delete Cabin
  if (storageError) {
    console.log("Error Upload file ==>" + storageError);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("image was not uploaded and the cabin is not created");
  }
  return data;
}
