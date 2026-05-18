import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const ItemModel = mongoose.model("Items", itemSchema);
export default ItemModel;
