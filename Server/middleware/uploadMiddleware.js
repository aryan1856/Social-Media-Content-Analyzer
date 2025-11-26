import multer from "multer";
import { cloudinary } from "../utils/cloudinary.js";
import { Readable } from "stream";

// Custom storage engine for Cloudinary
const cloudinaryStorage = {
  _handleFile: (req, file, cb) => {
    const originalName = file.originalname.replace(/\.[^/.]+$/, "");
    const isPdf = file.mimetype === "application/pdf";

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "insights_uploads",
        resource_type: isPdf ? "raw" : "image",
        type: "upload",
        public_id: `${Date.now()}-${originalName}`,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return cb(error);
        }
        cb(null, {
          path: result.secure_url,
          filename: result.public_id,
          url: result.secure_url,
          public_id: result.public_id,
          resource_type: result.resource_type,
          format: result.format,
          bytes: result.bytes,
        });
      }
    );

    // Pipe the file stream directly to Cloudinary
    file.stream.pipe(uploadStream);
  },

  _removeFile: (req, file, cb) => {
    // Optional: implement file removal if needed
    if (file.public_id) {
      cloudinary.uploader.destroy(file.public_id, cb);
    } else {
      cb();
    }
  },
};

const upload = multer({
  storage: cloudinaryStorage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only images and PDFs are allowed"), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default upload;