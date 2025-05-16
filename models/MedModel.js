import mongoose from "mongoose";

const MedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mg: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
});

const MedModel = mongoose.model("drugs", MedSchema);

export default MedModel;
