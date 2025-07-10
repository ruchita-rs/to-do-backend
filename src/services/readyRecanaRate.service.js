const { ObjectId } = require("mongodb");
const readyRecanaRate = require("../models/readyRecanaRate.model");
const countPages = require("../utils/helper/count-pages");
const limit = Number(process.env.LIMIT) ?? 20; //number of documents have to show per page

const readyRecanaRateServices = {
    createReadyRecanaRate: async (dataToInsert) => {
        try {
            return await readyRecanaRate.create(dataToInsert);
        } catch (error) {
            throw error;
        }
    },
    getReadyRecanaRateId: async (id) => {
        try {
            if (!ObjectId.isValid(id)) return null;
            return await readyRecanaRate.findById(new ObjectId(id));
        } catch (error) {
            throw error;
        }
    },
    getReadyRecanaRateDescription: async (description) => {
        try {
            return await readyRecanaRate.findOne({ description: (description) });
        } catch (error) {
            throw error;
        }
    },
    updateReadyRecanaRate: async (id, dataToUpdate) => {
        try {
            return await readyRecanaRate.updateOne({ _id: new ObjectId(id) }, { $set: dataToUpdate });
        } catch (error) {
            throw error;
        }
    },
    deleteReadyRecanaRate: async (id) => {
        try {
            return await readyRecanaRate.deleteOne({ _id: new ObjectId(id) });
        } catch (error) {
            throw error;
        }
    },
    getReadyRecanaRateList: async (page = 1, searchString) => {
        try {
            let filter = {};

            if (searchString) {
                const searchRegex = new RegExp(searchString, "i");

                filter["$or"] = [
                    { description: { $regex: searchRegex } }
                ];
            }

            const totalRecords = await readyRecanaRate.countDocuments(filter);
            const user = await readyRecanaRate.find(filter).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit)

            return {
                totalPages: await countPages(totalRecords),
                user,
            };
        } catch (error) {
            throw error;
        }
    },

}

module.exports = readyRecanaRateServices;