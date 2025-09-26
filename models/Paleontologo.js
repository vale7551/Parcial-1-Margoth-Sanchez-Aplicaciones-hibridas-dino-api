import mongoose from "mongoose";

const paleontologoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    nacionalidad: String,
    anio_nacimiento: { type: Number, min: 1800, max: new Date().getFullYear() },
  },
  { timestamps: true }
);

export default mongoose.model("Paleontologo", paleontologoSchema);
