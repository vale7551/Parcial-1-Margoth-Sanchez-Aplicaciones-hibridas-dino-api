import { validationResult } from "express-validator";
import Paleontologo from "../models/Paleontologo.js";

export const getAll = async (req, res, next) => {
  try {
    const list = await Paleontologo.find().sort({ nombre: 1 });
    res.json(list);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const p = new Paleontologo(req.body);
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    next(err);
  }
};
