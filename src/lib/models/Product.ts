import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    userId: { type: String, required: true }, // String type to match existing data
  },
  { timestamps: true }
);

export type ProductDoc = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  userId: string;
  createdAt: Date;
};

export const ProductModel = models.Product || model("Product", ProductSchema, "products_new");


