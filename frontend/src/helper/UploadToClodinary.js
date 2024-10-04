
const cloudinary_name = process.env.REACT_APP_CLOUD_NAME_CLOUDINARY
const url = `https://api.cloudinary.com/v1_1/${cloudinary_name}/image/upload`;

/*
CLOUDINARY SETUP
cloudianry -> account -> add_upload_preset -> Upload preset name, Signing Mode: unsigned Asset folder 
*/

export const uploadImageToClodinary = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "e-commerce");   // cloudinary folder name = e-commerce

  const dataRes = await fetch(url, {
    method: "POST",
    body: formData,
  });

  return dataRes.json();
};
