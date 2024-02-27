const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Creating the Product -- Admin
exports.createProduct = catchAsyncErrors(
    async (req, res, next) => {
        const product = await Product.create(req.body);
    
        res.status(201).json({
            success: true,
            product
        })
    }
);

//Get all Products
exports.getAllProducts = catchAsyncErrors( async (req, res) => {

    const products = await Product.find()

    res.status(200).json({
        success: true,
        products
    }) 
    // res.render("product");
}
);

//Get a single product
exports.getProduct = catchAsyncErrors( async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
       return next(new ErrorHandler("Product Not Found!", 404));
    }

    res.status(200).json({
        success: true,
        product
    })

});

//Update the product -- Admin
exports.updateProduct = catchAsyncErrors( async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found!", 404));
     }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    });

    res.status(200).json({
        success: true,
        product
    })
});

//Delete the product
exports.deleteProduct = catchAsyncErrors( async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found!", 404));
     }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully!"
    })
});