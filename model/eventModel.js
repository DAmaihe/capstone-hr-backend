import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
     title: { type: String, required: true },
         date: { type: Date, required: true },
             time: { type: String, required: true },
                  mode: { type: String, enum: ["Physical", "Virtual", "Physical/Virtual"], required: true },
                     registrationForm: { type: String }, // Optional Google Form or link
                          createdBy: {
                               type: mongoose.Schema.Types.ObjectId,
                                    ref: "User",
                                      required: true,
    },
  },
      { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
