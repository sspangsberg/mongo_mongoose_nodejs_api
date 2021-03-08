const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new Schema(
    {
        name: { type: String, required: true, minlength: 4, maxlength: 50 },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        inStock: { type: Boolean, required: true }
    }  
);

module.exports = mongoose.model("product", productSchema);

