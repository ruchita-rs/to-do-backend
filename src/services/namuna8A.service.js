const generateNamuna8AHTML = require('../controllers/namuna8A/generate-namuna8a-html');
const Namuna8A = require('../models/namuna8A.model');
const countPages = require("../utils/helper/count-pages");
const limit = Number(process.env.LIMIT) ?? 20; //number of documents have to show per page
const puppeteer = require("puppeteer");
const _ = require("lodash");
const { ObjectId } = require("mongodb");

const namuna8AServices = {
    saveNamuna: async (dataToInsert) => {
        try {
            return await Namuna8A.create(dataToInsert);
        } catch (error) {
            throw error;
        }
    },
    getNamunaList: async (isAdmin, id, page = 1, searchString) => {
        try {
            let filter = {};

            if (isAdmin === false) {
                filter = {
                    createdBy: id,
                }
            }
            if (searchString) {
                const searchRegex = new RegExp(searchString, "i");

                filter["$or"] = [
                    { ownerName: { $regex: searchRegex } },
                    { wifeName: { $regex: searchRegex } },
                    { taluka: { $regex: searchRegex } },
                    { distric: { $regex: searchRegex } },
                ];
            }

            const totalRecords = await Namuna8A.countDocuments(filter);
            const namuna = await Namuna8A.find(filter).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit)

            return {
                totalPages: await countPages(totalRecords),
                namuna,
            };
        } catch (error) {
            throw error;
        }
    },
    getNamunaById: async (id) => {
        try {
            return await Namuna8A.findById(id).lean();
        } catch (error) {
            throw error;
        }
    },
    generateNamuna8AHTML: async (namunaId) => {
        try {
            const data = await Namuna8A.findById(namunaId);
            return await generateNamuna8AHTML(data);
        } catch (error) {
            throw error;
        }
    },
    generateNamuna8APdf: async (namunaId) => {
        try {
            const data = await Namuna8A.findById(namunaId).lean();
            console.log("---data---", data);

            const htmlData = await generateNamuna8AHTML(data);
            try {
                console.log('=======================Launching browser...');
                const browser = await puppeteer.launch({
                    headless: true,
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--font-render-hinting=none',
                    ],
                });

                console.log('==================Opening new page...');
                const page = await browser.newPage();

                console.log('====================Setting page content...');
                await page.setContent(htmlData);

                console.log('=======================Emulating media type...');
                await page.emulateMediaType('screen');

                console.log('===============Generating PDF...');
                await page.pdf({
                    path: 'watkheda.pdf',
                    format: 'A3',
                    landscape: true,
                    printBackground: true,
                    margin: {
                        top: 100,
                        bottom: 100,
                        left: 100,
                        right: 100,
                    }
                });

                console.log('=====================PDF generated successfully!');
                await browser.close();
                console.log('=====================Browser closed.');
                return true;
            } catch (err) {
                console.log("============================puppeter catch error", err)
                return err;
            }
        } catch (error) {
            throw error;
        }
    },

    updateNamuna: async (id, dataToUpdate) => {
        console.log(id, dataToUpdate);
        try {
            return await Namuna8A.updateOne({ _id: new ObjectId(id) }, { $set: dataToUpdate });

        } catch (error) {
            throw error;
        }
    },
    getUserByObjId: async (id) => {

        try {
            return await Namuna8A.findById(id);
        } catch (error) {
            throw error;
        }
    },
    deleteSelectedUsers: async (ids) => {
        try {
            const objectIdArray = ids.map(id => new ObjectId(id));
            return await Namuna8A.deleteMany({ _id: { $in: objectIdArray } });
        } catch (error) {
            throw error;
        }
    },
}

module.exports = namuna8AServices