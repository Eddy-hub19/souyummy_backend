const { Schema, model } = require("mongoose")

const userSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        avatarURL: {
            type: String,
            required: false,
            default: "",
        },
        accessToken: String,
    },
    { timestamps: true }
)

const User = model("user", userSchema)

module.exports = {
    User,
}
