import * as ProfileService from "@/lib/api/user/profile/profile.service";
import { supabase } from "@/lib/supabaseClient";

const allowedFileExtensions = ["jpg", "jpeg", "png", "heic"];

const checkExtension = (filename: string) => {
  const extension = filename.split(".").pop();
  if (!extension) {
    return false;
  }
  return allowedFileExtensions.includes(extension);
};

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!userId) {
    return new Response("User id is required", { status: 400 });
  }

  if (!file) {
    return new Response("File not found", { status: 400 });
  }

  if (file.size === 0) {
    return new Response("File is empty", { status: 400 });
  }

  if (checkExtension(file.name)) {
    return new Response("File type not allowed", { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return new Response("File is not an image", { status: 400 });
  }

  const profile = await ProfileService.getProfileByUserId(userId);

  if (!profile) {
    return new Response("Profile not found", { status: 404 });
  }

  try {
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop();
    const fileName = `${userId}.${timestamp}.${fileExtension}`;
    const filePath = `avatars/${userId}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      return new Response("Error to upload avatare", { status: 500 });
    }

    if (!uploadData) {
      return new Response(
        "Error uploading file, no data returned from Supabase",
        { status: 500 }
      );
    }

    const { data: avatarUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    if (!avatarUrlData || !avatarUrlData.publicUrl) {
      console.error(
        "Could not get public URL for uploaded file: ",
        avatarUrlData
      );
      return new Response("File uploaded but could not retrieve public URL.", {
        status: 500,
      });
    }

    const avatarUrl = avatarUrlData.publicUrl;

    await ProfileService.updateProfile({
      profileId: profile.id,
      data: {
        avatar: avatarUrl,
      },
    });
  } catch (error) {
    console.error("Error processing file:", error);
    if (error instanceof Error) {
      return new Response(`Error processing file: ${error.message}`, {
        status: 500,
      });
    }
  }

  return new Response("Avatar updated", { status: 200 });
}
