/*
name
email
password
isPlus
isBlacklisted
*/


const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


const buyerSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        isPlus: {
            type: Boolean,
            required: true,
            default: false,
        },
        isBlacklisted: {
            type: Boolean,
            required: true,
            default: false,
        }
    }
  );


// ------------------------------------- //
// Helper Function while Sign In 
// For matching the Password
// bcrypt used for decoding the encoded password
userSchema.methods.matchPassword = async function (entredPassword) {
    return await bcrypt.compare(entredPassword,this.password);
}



// ------------------------------------- //
// for password encoding
// password should be saved in encoded form
userSchema.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


// ------------- //
const Buyer = mongoose.model("Buyer",buyerSchema);

module.exports = Buyer;