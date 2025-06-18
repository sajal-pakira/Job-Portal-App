import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
