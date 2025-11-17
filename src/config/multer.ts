import multer from "multer";
import { resolve } from "path";
import fs from "fs";

export const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            let folder = "others";

            if (file.mimetype === "application/pdf") folder = "pdfs";
            if (file.mimetype.startsWith("image/")) folder = "images";

            const uploadPath = resolve(__dirname, "..", "..", "tmp", "uploads", folder);

            // cria a pasta caso não exista
            fs.mkdirSync(uploadPath, { recursive: true });

            cb(null, uploadPath);
        },

        filename: (req, file, cb) => {
            const ext = file.originalname.split(".").pop();
            const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
            cb(null, fileName);
        },
    }),

    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB

    fileFilter: (req, file, cb) => {
        const allowedMimes = ["application/pdf", "image/png", "image/jpeg"];

        if (!allowedMimes.includes(file.mimetype)) {
            return cb(new Error("Apenas arquivos PDF, PNG ou JPEG são permitidos!"));
        }

        cb(null, true);
    },
});
