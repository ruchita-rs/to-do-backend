const mongoose = require('mongoose');

const readyRecanaRateSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        enum: ["दगड,विटा,मातीचे कच्चे घर", "गवती/ झोपडी / मातीचे घर", "विटा सिमेंट चे पक्के घर", "आर सी सी", "खाली जागा", "स्लांब ची खाली जागा (पहिला मजला)", "जमीन"]
    },
    rate: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt automatically
    strict: false
}
);

const ReadyRecanaRate = mongoose.model('ReadyRecanaRate', readyRecanaRateSchema);

module.exports = ReadyRecanaRate;