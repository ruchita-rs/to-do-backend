const puppeteer = require("puppeteer");
const _ = require("lodash");
const path = require("path");
const { namuna8ATemplate } = require("./namuna8a-template");


async function generateNamuna8AHTML(dataSet) {
    try {
        let htmlData = ``;

        const setVarTemplate = async (Content) => {
            _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
            const template = _.template(Content);
            const result = template({ ...dataSet, wifeName: dataSet.wifeName ?? " " });
            return result;
        };
        htmlData = await setVarTemplate(namuna8ATemplate);
        return htmlData;


    } catch (error) {
        throw error
    }
}

module.exports = generateNamuna8AHTML;