export interface BaseLodge {
  _id: string;
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

export interface BaseUser {
  _id: string;
  name: string;
  email: string;
  role: "guest" | "admin" | "superadmin";
  createdAt: string;
  updatedAt: string;
}

export interface BaseBooking {
  _id: string;
  user: BaseUser | string;
  lodge: BaseLodge | string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

// For convenience
export type SerializedLodge = BaseLodge;
export type SerializedUser = BaseUser;
export type SerializedBooking = BaseBooking;
