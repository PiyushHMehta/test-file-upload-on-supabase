const mongoose = require('mongoose'); // Correctly import mongoose
const { Schema } = mongoose; // Destructure Schema from mongoose

// Define the Item schema
const ItemSchema = new Schema({
    name: { type: String, required: true }, // Add validation if needed
    price: { type: String, required: true }, // Consider using a number type if price should be numeric
    image: { type: String, required: false } // Optional field
});

// Create or get the Item model
const Item = mongoose.models?.Item || mongoose.model('Item', ItemSchema);

module.exports = Item; // Use module.exports for Node.js environments
