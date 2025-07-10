const readyRecanaRate = require("../../utils/helper/readyrecanarate");
const getGhasaraRateByYear = require("../../utils/helper/ghasaraRateByYear");
const taxRate = require("../../utils/helper/taxRate");
const { waterTaxes, electricityTaxes, healthTaxes } = require("../../utils/helper/taxesAccordingToPropertyDescription");
const namuna8AServices = require("../../services/namuna8A.service");

const createNamuna8A = async (request, response) => {
    try {
        //get data from request i.e. token
        const { id } = request;

        //extract data from request body
        const { gramPanchayat, panchayatSamiti, gramOrMohalla, taluka, district,
            serialNo, propertyNo, ownerName, wifeName, occupantName, totalLength, totalWidth, description, constructionLength, constructionWidth, constructionAge, east, west, north, south, gharkul } = request.body;




        const totalAreaSqfeet = Number((totalLength * totalWidth).toFixed(2));
        const totalAreaSqMeter = Number((totalAreaSqfeet / 10.76).toFixed(2));
        let emptySpaceAreaSqfeet = totalAreaSqfeet, emptySpaceAreaSqMeter = totalAreaSqMeter, constructionAreaSqfeet = null, constructionAreaSqMeter = null;
        const readyRecanaRateOfBuilding = readyRecanaRate[description], readyRecanaRateOfLand = readyRecanaRate["जमीन"];


        if (description !== "खाली जागा" && constructionLength && constructionWidth) {
            constructionAreaSqfeet = Number((constructionLength * constructionWidth).toFixed(2));
            constructionAreaSqMeter = Number((constructionAreaSqfeet / 10.76).toFixed(2));
            emptySpaceAreaSqfeet = totalAreaSqfeet - constructionAreaSqfeet;
            emptySpaceAreaSqMeter = totalAreaSqMeter - constructionAreaSqMeter;
        }
        const landCapital = Number((readyRecanaRateOfLand * emptySpaceAreaSqMeter).toFixed(2)), ghasaraRate = getGhasaraRateByYear(constructionAge);
        let constructionCapital = description !== "खाली जागा" ? Number((readyRecanaRateOfBuilding * constructionAreaSqMeter).toFixed(2)) : null, taxRateBuilding = taxRate[description], taxRateLand = taxRate["जमीन"];
        const landTax = ((taxRateLand * landCapital) / 1000).toFixed(2);
        const buildingTax = description !== "खाली जागा" ? ((taxRateBuilding * constructionCapital * ghasaraRate) / 1000).toFixed(2) : null;
        let waterTax = waterTaxes[description], electricityTax = electricityTaxes[description], healthTax = healthTaxes[description];
        const totalTax = (Number(landTax) + Number(buildingTax) + Number(waterTax) + Number(electricityTax) + Number(healthTax)).toFixed(2);
        const dataToInsert = {
            gramPanchayat, panchayatSamiti, gramOrMohalla, taluka, district,
            serialNo, propertyNo, ownerName, wifeName, occupantName, totalLength,
            totalWidth, description, constructionLength, constructionWidth, constructionAge,
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
            createdBy: id,
        }

        //insert data into db & send response to client
        const result = await namuna8AServices.saveNamuna(dataToInsert);
        if (result._id) {
            response.status(200).json({
                status: "SUCCESS",
                message: "Namuna 8A created successfully, You can now download the report",
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "Failed to create Namuna 8A, Please try again!",
            });
            return;
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = createNamuna8A;