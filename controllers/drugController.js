import MedModel from "../models/MedModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";

// add drug items
const addDrug = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const drug = new MedModel({
    name: req.body.name,
    mg: req.body.description,
    price: req.body.price,
    type: req.body.category,
    image: image_filename,
  });
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      await drug.save();
      res.json({ success: true, message: "Drug Added" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all drugs
const listdrugs = async (req, res) => {
  try {
    const drugs = await MedModel.find({});
    res.json({ success: true, data: drugs });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove drug item
const removeDrug = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      const drug = await MedModel.findById(req.body.id);
      fs.unlink(`uploads/${drug.image}`, () => {});
      await MedModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Drug Removed" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addDrug, listdrugs, removeDrug };
