import { v2 as cloudianry } from "cloudinary";
import fs from "fs/promises";

const cloudinaryUpload = async (files) => {
  const fileUrl = [];

  for (let file of files.avatar) {
    const result = await cloudianry.uploader.upload(file.path, {
      folder: "hh",
      type: "private",
    });
    fileUrl.push(result);
    await fs.unlink(file.path);
  }
  return fileUrl;
};

export { cloudinaryUpload };
