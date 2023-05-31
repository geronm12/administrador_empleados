import cloud from "cloudinary";

const cloudinary = cloud.v2;

const secret = "N2pfI9ERTNCqfDwivWTtjOnc_sA";
const key = "111583552736153";
const cloud_name = "dkugqomlx";

cloudinary.config({
  cloud_name,
  api_key: key,
  api_secret: secret,
});

async function UploadPicture(file) {
  const { path } = file;
  const res = await cloudinary.uploader.upload(path, {
    resource_type: "image",
  });
  return res;
}

export { UploadPicture };
