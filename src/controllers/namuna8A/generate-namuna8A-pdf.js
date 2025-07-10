const puppeteer = require("puppeteer");
const _ = require("lodash");
const fs = require('fs');
const path = require('path');
const namuna8AServices = require("../../services/namuna8A.service");
const generateNamuna8AHTML = require("./generate-namuna8a-html");



const generateNamuna8APdf = async (request, response) => {
    try {
        //extract data from request body
        const { namunaId } = request.query;
        //check namuna 8A record exist or not
        const result = await namuna8AServices.getNamunaById(namunaId);
        if (!result) {
            response.status(200).json({
                status: "FAILED",
                message: "Namuna record not found",
            });
            return;
        }

        //generate pdf
        const timestamp = Date.now();
        const fileName = `namuna8a_${timestamp}.pdf`;

        const samplePath = path.join(__dirname, "../../../watkheda.pdf"); // Path to existing sample
        const newPdfPath = path.join(__dirname, '../../../public', fileName); // Destination path

        // Copy the file
        fs.copyFileSync(samplePath, newPdfPath);
        const htmlData = await generateNamuna8AHTML(result);

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
        const pdf = await page.pdf({
            path: newPdfPath,
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

        await browser.close();
        if (pdf) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "PDF generated successfully",
                fileName: fileName,
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "PDF not generated",
            });
        }

    } catch (error) {
        response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
        return;
    }
};

module.exports = generateNamuna8APdf;