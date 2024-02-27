const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    description: {
        type: String,
        required: [true, "Please provide product description"]
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    stock: {
        type: Number,
        required: [true, "Please provide stock for the product."],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1
    }
})

module.exports = mongoose.model("Product", productSchema)