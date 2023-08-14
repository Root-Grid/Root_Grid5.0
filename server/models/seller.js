/*
name
email
password
isBlacklisted
*/


const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


const sellerSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        // products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
        isBlacklisted: {
            type: Boolean,
            required: true,
            default: false,
        },
        walletMoney : {
            type: Number,
            require: true,
            default: 10000,
        }
    }
  );


// ------------------------------------- //
// Helper Function while Sign In 
// For matching the Password
// bcrypt used for decoding the encoded password
sellerSchema.methods.matchPassword = async function (entredPassword) {
    return await bcrypt.compare(entredPassword,this.password);
}



// ------------------------------------- //
// for password encoding
// password should be saved in encoded form
sellerSchema.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


// ------------- //
const Seller = mongoose.model("Seller",sellerSchema);

module.exports = Seller;