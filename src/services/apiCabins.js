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
export async function createUpdateCabin(newCabin, id) {
  console.log(newCabin, id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Create new cabin
  let query = supabase.from("cabins");
  //A. CREAT NEW CABIN
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //B. EDIT CABIN
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error(id ? "Cabins wasn't updated" : "Cabins could not created");
  }

  // 2. Upload image
  if (hasImagePath) return data;
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
