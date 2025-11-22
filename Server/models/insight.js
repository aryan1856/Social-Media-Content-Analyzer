import mongoose from "mongoose";

const insightSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    originalFileUrl: {
        type: String,
        required: true
    },

    extractedText: {
        type: String,
        required: true
    },

    recommendations: {
        type : Object,
        default : {}
    }
}, { timestamps: true });

const Insight = mongoose.model("Insight", insightSchema);

export default Insight;