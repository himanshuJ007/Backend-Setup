"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    email: { type: String, required: true },
    password: { type: String },
    profilePicture: { type: String },
    isActive: { type: Boolean, default: false },
    createdAt: { type: Date, hidden: true },
    updatedAt: { type: Date, hidden: true },
});
//# sourceMappingURL=user.schema.js.map