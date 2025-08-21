import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, index: true },
    image: { type: String },
    password: { type: String },
  },
  { timestamps: true }
);

export type UserDoc = {
  _id: string;
  name?: string;
  email?: string;
  image?: string;
  password?: string;
};

export const UserModel = models.User || model("User", UserSchema, "users_new");


