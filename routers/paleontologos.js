import express from "express";
import { body, param } from "express-validator";
import * as ctrl from "../controllers/paleontologoController.js";

const router = express.Router();

router.get("/", ctrl.getAll);

router.get(
  "/:id",
  [
    param("id")
      .customSanitizer((v) => (v || "").replace(/["']/g, "").trim())
      .isMongoId()
      .withMessage("ID inválido (debe ser ObjectId)"),
  ],
  async (req, res, next) => {
    //
    try {
      return ctrl.getById ? ctrl.getById(req, res, next) : next();
    } catch (err) {
      next(err);
    }
  }
);

router.post("/", [body("nombre").isString().notEmpty()], ctrl.create);

router.delete(
  "/:id",
  [
    param("id")
      .customSanitizer((v) => (v || "").replace(/["']/g, "").trim())
      .isMongoId()
      .withMessage("ID inválido (debe ser ObjectId)"),
  ],
  ctrl.remove
    ? ctrl.remove
    : (req, res) => res.status(501).json({ error: "Not implemented" })
);

export default router;
