import mongoose from "mongoose";

const { Schema, model } = mongoose;

const DinosaurioSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    periodo: {
      type: String,
      enum: ["Triásico", "Jurásico", "Cretácico"],
      required: true,
      trim: true,
    },
    dieta: {
      type: String,
      enum: ["Herbívoro", "Carnívoro", "Omnívoro"],
      required: true,
      trim: true,
    },
    // Campo  "longitud_metros"
    longitud_metros: { type: Number, required: true, min: 0 },
    // Campo  "descubridor"
    descubridor: { type: String, required: true, trim: true },

    // referencia a Paleontologo
    paleontologo: { type: Schema.Types.ObjectId, ref: "Paleontologo" },
  },
  { timestamps: true }
);

// usa longitud
DinosaurioSchema.virtual("longitud_m")
  .get(function () {
    return this.longitud_metros;
  })
  .set(function (v) {
    this.longitud_metros = v;
  });

// Convierto a  JSON
DinosaurioSchema.set("toJSON", { virtuals: true });
DinosaurioSchema.set("toObject", { virtuals: true });

export default model("Dinosaurio", DinosaurioSchema);
