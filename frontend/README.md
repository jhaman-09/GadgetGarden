# Structure

## header

## body



### AdminPanel
    - AllUser

        - ChangeUserDetails

    - AllProduct
    
        - Upload Product




# Cloudinary Steps :
 
- cloudinary -> account -> add_upload_preset -> Upload preset name, Signing Mode: unsigned Asset folder 

- connect cloudinary to upload photos

        const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

        export const uploadImageToClodinary = async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "e-commerce");

        const dataRes = await fetch(url, {
            method: "POST",
            body: formData,
        });

        return dataRes.json();
        };


- uplord to cloudinary

        const handleProductImageUpoad = async (e) => {
        const file = e.target.files[0];
        const uploadedImageToCloudinary = await uploadImageToClodinary(file)

        setData((prev) => {
        return {
            ...prev, 
            productImage : [...prev.productImage, uploadedImageToCloudinary.url]
        }
        })
    };