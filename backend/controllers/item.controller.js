import { tryCatchHandler } from "../middleware/errorHandler.middleware.js";
import ItemModel from "../models/item.model.js";
import {publishEvent} from "../utils/rabbitMQ.js";

export const addItem = tryCatchHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  const newItem = await ItemModel.create({ name });

  res.status(201).json(newItem);
});
export const updateItem = tryCatchHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedItem = await ItemModel.findByIdAndUpdate(
    id,
    { name },
    { new: true },
  );
  if (!updatedItem) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.status(200).json(updatedItem);
});
export const deleteItem = tryCatchHandler(async (req, res) => {
  const { id } = req.params;
  const deletedItem = await ItemModel.findByIdAndDelete(id);
  if (!deletedItem) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.status(200).json({ message: "Item deleted successfully" });
});

export const getAllItems = tryCatchHandler(async (req, res) => {
  const items = await ItemModel.find().sort({ createdAt: -1 });
  res.status(200).json(items);
});

export const getItemById = tryCatchHandler(async (req, res) => {
  const { id } = req.params;
  const item = await ItemModel.findById(id);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.status(200).json(item);
});
