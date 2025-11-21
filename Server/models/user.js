import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    insights: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Insight"
    }]

});

const User = mongoose.model("User", userSchema);

export default User;