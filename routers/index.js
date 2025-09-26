import dinosauriosRouter from "./dinosaurios.js";
import paleontologosRouter from "./paleontologos.js";

export default (app) => {
  app.use("/api/dinosaurios", dinosauriosRouter);
  app.use("/api/paleontologos", paleontologosRouter);
};
