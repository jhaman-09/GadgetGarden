function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // When the file is read successfully
    reader.onloadend = () => {
      resolve(reader.result);
    };

    // In case of an error
    reader.onerror = (error) => {
      reject(error);
    };

    // Read the file as a data URL (base64)
    reader.readAsDataURL(file);
  });
}

export default imageToBase64;
