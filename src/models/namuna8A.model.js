
const mongoose = require('mongoose');

const namuna8ASchema = new mongoose.Schema({
    gramPanchayat: {
        type: String,
        required: true,
        default: null
    },
    panchayatSamiti: {
        type: String,
        required: true,
        default: null
    },
    gramOrMohalla: {
        type: String,
        required: true,
        default: null
    },
    taluka: {
        type: String,
        required: true,
        default: null
    },
    district: {
        type: String,
        required: true,
        default: null
    },
    serialNo: {
        type: Number,
        required: true,
        default: null
    },
    propertyNo: { //मालमत्ता क्र.
        type: Number,
        required: true,
        default: null
    },
    ownerName: { //घरमालकाचे नाव
        type: String,
        required: true,
        default: null
    },
    wifeName: {
        type: String,
        required: false,
    },
    occupantName: { // भोगवटदार
        type: String,
        required: true,
        default: "स्वत:"
    },
    totalLength: { // एकून जागेची लांबी
        type: Number,
        required: true,
        default: null
    },
    totalWidth: { // एकून जागेची लांबी
        type: Number,
        required: true,
        default: null
    },
    description: { // मालमत्तेचे वर्णन
        type: String,
        required: true,
        enum: ["दगड,विटा,मातीचे कच्चे घर", "गवती/ झोपडी / मातीचे घर", "विटा सिमेंट चे पक्के घर", "आर सी सी", "खाली जागा", "स्लांब ची खाली जागा (पहिला मजला)"]
    },
    constructionLength: { // निर्माण केलेले जागेची लांबी
        type: Number,
        required: false,
        default: null
    },
    constructionWidth: { // निर्माण केलेले जागेची लांबी
        type: Number,
        required: false,
        default: null
    },
    constructionAge: { //बांधकामाच वर्ष
        type: Number,
        required: false,
        default: null
    },
    east: {
        type: String,
        required: false,

    },
    west: {
        type: String,
        required: false,
    }, north: {
        type: String,
        required: false,
    },
    south: {
        type: String,
        required: false,
    },
    gharkul: {
        type: String,
        required: false,
        default: null
    },
    totalAreaSqfeet: {
        type: Number,
        required: true,
    },
    totalAreaSqMeter: {
        type: Number,
        required: true,
    },
    emptySpaceAreaSqfeet: {
        required: false,
        default: null,
        type: String,
    },
    emptySpaceAreaSqMeter: {
        required: false,
        default: null,
        type: String,
    },
    constructionAreaSqfeet: {
        required: false,
        default: null,
        type: String,
    },
    constructionAreaSqMeter: {
        required: false,
        default: null,
        type: String,
    },
    readyRecanaRateOfBuilding: {
        required: false,
        default: null,
        type: String,
    },
    readyRecanaRateOfLand: {
        required: false,
        default: null,
        type: String,
    },
    ghasaraRate: {
        required: false,
        default: null,
        type: String,
    },
    constructionCapital: {
        required: false,
        default: null,
        type: String,
    },
    landCapital: {
        required: false,
        default: null,
        type: String,
    },
    taxRateBuilding: {
        required: false,
        default: null,
        type: String,
    },
    taxRateLand: {
        required: false,
        default: null,
        type: String,
    },
    buildingTax: {
        required: false,
        default: null,
        type: String,
    },
    landTax: {
        required: false,
        default: null,
        type: String,
    },
    electricityTax: {
        required: false,
        default: null,
        type: String,
    },
    healthTax: {
        required: false,
        default: null,
        type: String,
    },
    waterTax: {
        required: false,
        default: null,
        type: String,
    },
    totalTax: {
        required: false,
        default: null,
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',           // Refers to the User model
        required: true
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt automatically
    strict: false
}
);

const Namuna8A = mongoose.model('Namuna8A', namuna8ASchema);

module.exports = Namuna8A;
