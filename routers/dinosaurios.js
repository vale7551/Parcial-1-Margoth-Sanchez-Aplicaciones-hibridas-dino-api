import express from "express";
import { body, param } from "express-validator";
import * as ctrl from "../controllers/dinosaurioController.js";

const router = express.Router();

router.get("/", ctrl.getAll);

// GET
router.get(
  "/:id",
  [
    param("id")
      .customSanitizer((v) => (v || "").replace(/["']/g, "").trim())
      .isMongoId()
      .withMessage("ID inválido (debe ser ObjectId)"),
  ],
  ctrl.getById
);
// POST
router.post(
  "/",
  [
    body("nombre").isString().notEmpty(),
    body("periodo")
      .isString()
      .notEmpty()
      .isIn(["Triásico", "Jurásico", "Cretácico"]),
    body("dieta")
      .isString()
      .notEmpty()
      .isIn(["Herbívoro", "Carnívoro", "Omnívoro"]),
    body("longitud_metros")
      .isFloat({ gt: 0 })
      .withMessage("longitud_metros debe ser número > 0"),
    body("descubridor").isString().notEmpty(),
  ],
  ctrl.create
);
// PUT
router.put(
  "/:id",
  [
    param("id")
      .customSanitizer((v) => (v || "").replace(/["']/g, "").trim())
      .isMongoId()
      .withMessage("ID inválido (debe ser ObjectId)"),
    body("longitud_metros")
      .optional()
      .isFloat({ gt: 0 })
      .withMessage("longitud_metros debe ser número > 0"),
  ],
  ctrl.update
);
// DELETE
router.delete(
  "/:id",
  [
    param("id")
      .customSanitizer((v) => (v || "").replace(/["']/g, "").trim())
      .isMongoId()
      .withMessage("ID inválido (debe ser ObjectId)"),
  ],
  ctrl.remove
);

export default router;
