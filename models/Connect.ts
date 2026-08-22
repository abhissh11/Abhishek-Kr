import mongoose, { Schema, Document, Model } from "mongoose";

export interface IConnect extends Document {
  email: string;
  selectedOption: string;
  note?: string;
  status: "new" | "read" | "replied" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const ConnectSchema: Schema<IConnect> = new Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    selectedOption: { type: String, required: true, trim: true },
    note: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: ["new", "read", "replied", "archived"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

const Connect: Model<IConnect> =
  mongoose.models.Connect || mongoose.model<IConnect>("Connect", ConnectSchema);

export default Connect;
