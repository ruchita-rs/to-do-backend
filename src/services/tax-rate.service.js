const { ObjectId } = require("mongodb");
const TaxRate = require("../models/taxRate.model");
const countPages = require("../utils/helper/count-pages");


const limit = Number(process.env.LIMIT) || 20;

const taxRateServices = {
    createTaxRate: async (dataToInsert) => {
        try {
            return await TaxRate.create(dataToInsert);
        } catch (error) {
            throw error;
        }
    },

    getTaxRateDescription: async (description) => {
        try {
            return await TaxRate.findOne({ description });
        } catch (error) {
            throw error;
        }
    },

    getTaxRateId: async (id) => {
        try {
            return await TaxRate.findOne({ _id: new ObjectId(id) });
        } catch (error) {
            throw error;
        }
    },

    deleteTaxRateById: async (id) => {
        try {
            return await TaxRate.deleteOne({ _id: new ObjectId(id) });
        } catch (error) {
            throw error;
        }
    },

    updateTaxRateDetails: async (id, dataToUpdate) => {
        try {
            console.log("id", id, dataToUpdate);

            return await TaxRate.updateOne(
                { _id: new ObjectId(id) },
                { $set: dataToUpdate }
            );
        } catch (error) {
            throw error;
        }
    },


    getTaxRateList: async (page = 1, searchString) => {
        try {
            let filter = {};

            if (searchString) {
                const searchRegex = new RegExp(searchString, "i");
                filter["$or"] = [{ description: { $regex: searchRegex } }];
            }

            const totalRecords = await TaxRate.countDocuments(filter);
            const taxRates = await TaxRate.find(filter)
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip((page - 1) * limit);

            return {
                totalPages: await countPages(totalRecords),
                taxRates,
            };
        } catch (error) {
            throw error;
        }
    },

    getAllTaxRates: async () => {
        try {
            return await TaxRate.find({});
        } catch (error) {
            throw error;
        }
    }
};

module.exports = taxRateServices;
