const readyRecanaRate = require("../../utils/helper/readyrecanarate");
const getGhasaraRateByYear = require("../../utils/helper/ghasaraRateByYear");
const taxRate = require("../../utils/helper/taxRate");
const { waterTaxes, electricityTaxes, healthTaxes } = require("../../utils/helper/taxesAccordingToPropertyDescription");
const namuna8AServices = require("../../services/namuna8A.service");

const updateNamuna8A = async (request, response) => {
    try {
        const { id } = request;
        const { _id } = request.body;

        const {
            gramPanchayat, panchayatSamiti, gramOrMohalla, taluka, district,
            serialNo, propertyNo, ownerName, wifeName, occupantName, totalLength, totalWidth,
            description, constructionLength, constructionWidth, constructionAge,
            east, west, north, south, gharkul
        } = request.body;

        //CHECK NAMUNA 8a PRESENT OR NOT

        const totalAreaSqfeet = Number((totalLength * totalWidth).toFixed(2));
        const totalAreaSqMeter = Number((totalAreaSqfeet / 10.76).toFixed(2));

        let emptySpaceAreaSqfeet = totalAreaSqfeet,
            emptySpaceAreaSqMeter = totalAreaSqMeter,
            constructionAreaSqfeet = null,
            constructionAreaSqMeter = null;

        const readyRecanaRateOfBuilding = readyRecanaRate[description],
            readyRecanaRateOfLand = readyRecanaRate["जमीन"];

        if (description !== "खाली जागा" && constructionLength && constructionWidth) {
            constructionAreaSqfeet = Number((constructionLength * constructionWidth).toFixed(2));
            constructionAreaSqMeter = Number((constructionAreaSqfeet / 10.76).toFixed(2));
            emptySpaceAreaSqfeet = totalAreaSqfeet - constructionAreaSqfeet;
            emptySpaceAreaSqMeter = totalAreaSqMeter - constructionAreaSqMeter;
        }

        const landCapital = readyRecanaRateOfLand * emptySpaceAreaSqMeter;
        const ghasaraRate = getGhasaraRateByYear(constructionAge);

        let constructionCapital = description !== "खाली जागा" ? (readyRecanaRateOfBuilding * constructionAreaSqMeter).toFixed(2) : null;
        const taxRateBuilding = taxRate[description];
        const taxRateLand = taxRate["जमीन"];

        const landTax = ((taxRateLand * landCapital) / 1000).toFixed(2);
        const buildingTax = description !== "खाली जागा" ? ((taxRateBuilding * constructionCapital * ghasaraRate) / 1000).toFixed(2) : null;

        const waterTax = waterTaxes[description];
        const electricityTax = electricityTaxes[description];
        const healthTax = healthTaxes[description];

        const totalTax = landTax + buildingTax + waterTax + electricityTax + healthTax;

        const dataToUpdate = {
            gramPanchayat, panchayatSamiti, gramOrMohalla, taluka, district,
            serialNo, propertyNo, ownerName, wifeName, occupantName,
            totalLength, totalWidth, description,
            constructionLength, constructionWidth, constructionAge,
            east, west, north, south, gharkul,
            totalAreaSqfeet,
            totalAreaSqMeter,
            emptySpaceAreaSqfeet,
            emptySpaceAreaSqMeter,
            constructionAreaSqfeet,
            constructionAreaSqMeter,
            readyRecanaRateOfBuilding,
            readyRecanaRateOfLand,
            ghasaraRate,
            constructionCapital,
            landCapital,
            taxRateBuilding,
            taxRateLand,
            buildingTax,
            landTax,
            electricityTax,
            healthTax,
            waterTax,
            totalTax,
        };

        const result = await namuna8AServices.updateNamuna(_id, dataToUpdate);

        if (result.modifiedCount > 0) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Namuna 8A updated successfully.",
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "Failed to update Namuna 8A. Please try again!",
            });
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = updateNamuna8A;
