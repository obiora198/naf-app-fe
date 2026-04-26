import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "guest" | "admin" | "superadmin";
  createdAt: Date;
  updatedAt: Date;
  matchPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["guest", "admin", "superadmin"],
      default: "guest",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (this: IUser) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
