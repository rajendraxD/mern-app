import express from "express";
import {
  addItem,
  deleteItem,
  getAllItems,
  getItemById,
  updateItem,
} from "../controllers/item.controller.js";

const router = express.Router();

router.post("/addItem", addItem);
router.post("/updateItem/:id", updateItem);
router.post("/deleteItem/:id", deleteItem);
router.get("/getAllItems", getAllItems);
router.get("/getItemById/:id", getItemById);

export default router;
