const { Schema, model } = require("mongoose")

const userSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            default: "",
        },
        avatarURL: {
            type: String,
            required: true,
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            required: [true, "Verify token is required"],
        },
    },
    { timestamps: true }
)

const User = model("user", userSchema)

module.exports = {
    User,
}
