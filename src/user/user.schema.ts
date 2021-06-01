import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number},
    email: {type: String, required: true},
    password: {type: String},
    profilePicture: { type: String},
    isActive: { type: Boolean, default: false },
    createdAt: { type: Date, hidden: true },
    updatedAt: { type: Date, hidden: true },
});
