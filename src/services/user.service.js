const { ObjectId } = require("mongodb");
const User = require("../models/user.model");
const countPages = require("../utils/helper/count-pages");
const limit = Number(process.env.LIMIT) ?? 20; //number of documents have to show per page

const userServices = {
    createUser: async (dataToInsert) => {
        try {
            return await User.create(dataToInsert);
        } catch (error) {
            throw error;
        }
    },
    getLatestCreatedRecord: async () => {
        try {
            return await User.find({}).sort({ createdAt: -1 }).limit(1);
        } catch (error) {
            throw error;
        }
    },
    getUserByMobile: async (mobile) => {
        try {
            return await User.findOne({ mobile: String(mobile), isDeleted: false });
        } catch (error) {
            throw error;
        }
    },
    getExistingUserByMobileNo: async (userId, mobile) => {
        console.log(userId, mobile);

        try {
            return await User.findOne({
                _id: { $ne: new ObjectId(userId) },
                mobile: String(mobile)
            });
        } catch (error) {
            throw error;
        }
    },
    getUserByUserId: async (userId) => {
        try {
            return await User.findOne({ userId: userId, isDeleted: false, isActive: true });
        } catch (error) {
            throw error;
        }
    },
    getUserByObjId: async (userId) => {
        console.log(userId);

        try {
            return await User.findOne({ _id: new ObjectId(userId), isDeleted: false });
        } catch (error) {
            throw error;
        }
    },
    updateUserByUserId: async (userId, updateData) => {
        try {
            return await User.updateOne({ _id: new ObjectId(userId), isDeleted: false, }, { $set: updateData });
        } catch (error) {
            throw error;
        }
    },
    deleteSelectedUsers: async (userIds) => {
        try {
            const objectIdArray = userIds.map((id) => new ObjectId(id));
            return await User.deleteMany({ _id: { $in: objectIdArray } });
        } catch (error) {
            throw error;
        }
    },
    getUserList: async (id, page = 1, searchString) => {
        try {
            let filter = {
                isAdmin: false,
                _id: { $ne: id, },
                isDeleted: false,
            };
            if (searchString) {
                const searchRegex = new RegExp(searchString, "i");

                filter["$or"] = [
                    { name: { $regex: searchRegex } },
                    { email: { $regex: searchRegex } },
                    { mobile: { $regex: searchRegex } },
                    { userId: { $regex: searchRegex } },
                ];
            }

            const totalRecords = await User.countDocuments(filter);
            const user = await User.find(filter).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit)

            return {
                totalPages: await countPages(totalRecords),
                user,
            };
        } catch (error) {
            throw error;
        }
    },

}

module.exports = userServices;