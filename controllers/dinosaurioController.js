import { validationResult } from "express-validator";
import Dinosaurio from "../models/Dinosaurio.js";

export const getAll = async (req, res, next) => {
  try {
    const { nombre, periodo, dieta } = req.query;
    const q = {};
    if (periodo) q.periodo = new RegExp(`^${periodo}$`, "i");
    if (dieta) q.dieta = new RegExp(`^${dieta}$`, "i");
    if (nombre) q.nombre = new RegExp(nombre, "i");
    const list = await Dinosaurio.find(q)
      .populate("paleontologo")
      .sort({ nombre: 1 });
    res.json(list);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const d = await Dinosaurio.findById(req.params.id).populate("paleontologo");
    if (!d) return res.status(404).json({ error: "No encontrado" });
    res.json(d);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const nuevo = new Dinosaurio(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const updated = await Dinosaurio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "No encontrado" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const removed = await Dinosaurio.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: "No encontrado" });
    res.json({ message: "Eliminado", removed });
  } catch (err) {
    next(err);
  }
};
