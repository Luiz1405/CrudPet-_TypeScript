import express from "express";
import petRouter from "../Routes/petRouter";
import adotanteRouter from "../Routes/adotanteRouter";
import abrigoRouter from "../Routes/abrigoRouter";

const router = (app:express.Router) => {
    app.use("/pets", petRouter);
    app.use("/adotantes", adotanteRouter);
    app.use("/abrigos", abrigoRouter)
};

export default router;