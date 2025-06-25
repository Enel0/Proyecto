import { Router } from "express"
import {
    getTareas,
    getTarea,
    createTarea,
    deleteTarea,
    updateTarea
} from "../controllers/tasControlador.js"

const router = Router()

router.get("/", getTareas)
router.get("/:id", getTarea)
router.post("/", createTarea)
router.delete("/:id", deleteTarea)
router.put("/:id", updateTarea)

export default router
