import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
    },
    position: {
      type: String,
      required: [true, "Job position is required"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["pending", "interview", "reject"],
      default: "pending",
    },

    workType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "freelance"],
      default: "full-time",
    },
    jobType: {
      type: String,
      enum: ["Remote", "On-site", "Hybrid"],
      default: "On-site",
    },
    workLocation: {
      type: String,
      required: [true, "work location is required"],
      default: "Bengaluru, India",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, //it is a string not a objectId
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
