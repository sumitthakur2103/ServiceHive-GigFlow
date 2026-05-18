import { Schema, model, type InferSchemaType, Types } from "mongoose";
import { LEAD_SOURCES, LEAD_STATUSES } from "../constants/lead.constants.js";

const leadSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
      index: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true
    },
    status: {
      type: String,
      enum: LEAD_STATUSES,
      default: "New",
      index: true
    },
    source: {
      type: String,
      enum: LEAD_SOURCES,
      required: true,
      index: true
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

leadSchema.index({ name: "text", email: "text" });

export type LeadDocument = InferSchemaType<typeof leadSchema> & {
  _id: Types.ObjectId;
};

export const Lead = model("Lead", leadSchema);
