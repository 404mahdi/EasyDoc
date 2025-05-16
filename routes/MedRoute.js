import express from "express";
import { addDrug, listdrugs, removeDrug } from "../controllers/drugController.js";
import multer from "multer";
import authMiddleware from "../middlewares/authMiddleware.js";

const MedRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
});

const upload = multer({storage: storage});

MedRouter.post("/add", upload.single("image"), authMiddleware, addDrug);
MedRouter.get("/list", listdrugs);
MedRouter.post("/remove", authMiddleware, removeDrug);

export default MedRouter;
