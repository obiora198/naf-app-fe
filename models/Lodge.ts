import mongoose, { Document, Model, Schema } from "mongoose";

export interface ILodge extends Document {
  name: string;
  base: string;
  state?: string;
  googleMapUrl?: string;
  address: string;
  description: string;
  pricePerNight: number;
  phone: string;
  images: string[];
  isAvailable: boolean;
  rating?: number;
  amenities?: string[];
  roomTypes?: string[];
  totalRooms?: number;
}

const lodgeSchema = new Schema<ILodge>({
  name: { type: String, required: true },
  base: { type: String, required: true },
  state: { type: String },
  googleMapUrl: { type: String },
  address: { type: String, required: true },
  description: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  phone: { type: String, required: true },
  images: [{ type: String }],
  isAvailable: { type: Boolean, default: true },
  rating: { type: Number, default: 4.5 },
  amenities: [{ type: String }],
  roomTypes: [{ type: String }],
  totalRooms: { type: Number, default: 20 },
});

const Lodge: Model<ILodge> =
  mongoose.models.Lodge || mongoose.model<ILodge>("Lodge", lodgeSchema);

export default Lodge;
