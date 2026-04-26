import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IBooking extends Document {
  user: Types.ObjectId;
  lodge: Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lodge: { type: Schema.Types.ObjectId, ref: "Lodge", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking: Model<IBooking> =
  mongoose.models.Booking ||
  mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
