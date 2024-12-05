const cloudinaryConfig = require("../config/cloudnary");

const cloudinary = require("cloudinary").v2;

const uploadToCloudnary = async (fileBuffer) => {

cloudinaryConfig()

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(fileBuffer);
    });

    return result;
  } catch (error) {
    throw new Error(`Cloudinary Upload Failed: ${error.message}`);
  }
};

module.exports = uploadToCloudnary;
