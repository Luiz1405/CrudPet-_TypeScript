import express from "express";
import petRouter from "../Routes/petRouter";
import adotanteRouter from "../Routes/adotanteRouter"

const router = (app:express.Router) => {
    app.use("/pets", petRouter);
    app.use("/adotantes", adotanteRouter);
};

export default router;