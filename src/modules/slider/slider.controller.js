// error handling
const createError = require("http-errors");
// fs
const fs = require('fs');
// path
const path = require('path');
const Controller = require('../../common/controllers/controller');




class SliderController extends Controller {

    constructor() {
        super()
    }

    async addSlider(req, res, next) {
        try {
            let avalibleData;
            const jsonPath = path.join(__dirname, "../../../list.json");


            // Read the file
            fs.readFile(jsonPath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                } else {
                    // Parse the JSON string back into a JavaScript array
                    const list = JSON.parse(data);
                    const fileName = req.fileName
                    const newData = { src: fileName, isActive: true }
                    const updatedList = [...list, newData]

                    fs.writeFileSync("list.js", `const list = ${JSON.stringify(updatedList)}`);


                    fs.writeFile(jsonPath, JSON.stringify(updatedList), (err) => {
                        if (err) {
                            console.error('Error writing file:', err);
                        } else {
                            console.log('File written successfully');
                        }
                    });
                }
            });

            res.status(200).json({
                statusCode: res.statusCode,
                message: "فایل اضافه شد"
            })
        } catch (error) {
            // res.json({ error })
            next(error)
        }
    }

    async getAllSlider(req, res, next) {
        try {
            const jsonPath = path.join(__dirname, "../../../list.json");

            const uploadsPath = path.join(__dirname, "../../../../sliders");
            const files = fs.readFile(jsonPath, 'utf8', (err, data) => {
                console.log(err)
                res.status(200).json({
                    message: "لیست فایل ها با موفقیت دریافت شد",
                    data: JSON.parse(data),
                    statusCode: res.statusCode
                })
            });
        } catch (error) {
            next(error)
        }
    }

    async deleteSlider(req, res, next) {
        try {
            const query = req.query;
            const willDeletedFile = path.join(__dirname, `../../../../sliders/${query?.fileName}`);
            try {

                const jsonPath = path.join(__dirname, "../../../list.json");


                fs.readFile(jsonPath, 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading file:', err);
                    } else {
                        // Parse the JSON string back into a JavaScript array
                        const list = JSON.parse(data);

                        const newList = list.filter(item => item.src !== query?.fileName)

                        fs.writeFileSync("list.js", `const list = ${JSON.stringify(newList)}`);


                        fs.writeFile(jsonPath, JSON.stringify(newList), (err) => {
                            if (err) {
                                console.error('Error writing file:', err);
                            } else {
                                console.log('File written successfully');
                            }
                        });
                    }
                });

                await fs.unlinkSync(willDeletedFile);
                res.status(200).json({
                    message: " فایل  با موفقیت حذف شد",
                    statusCode: res.statusCode
                })
            } catch (e) {
                return res.status(400).json({
                    message: "فایل وجود ندارد",
                    statusCode: res.statusCode
                })
            }


        } catch (error) {
            next(error)
        }
    }

    async toggleSliderStatus(req, res, next) {
        try {
            const query = req.query;
            try {

                const jsonPath = path.join(__dirname, "../../../list.json");



                fs.readFile(jsonPath, 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading file:', err);
                    } else {
                        // Parse the JSON string back into a JavaScript array
                        const list = JSON.parse(data);

                        const newList = list.find(item => item.src == query?.fileName)

                        newList.isActive = !newList.isActive

                        fs.writeFileSync("list.js", `const list = ${JSON.stringify(list)}`);


                        fs.writeFile(jsonPath, JSON.stringify(list), (err) => {
                            if (err) {
                                console.error('Error writing file:', err);
                            } else {
                                console.log('File written successfully');
                            }
                        });
                    }
                });

                res.status(200).json({
                    message: " فایل  با موفقیت تغییر وضعیت داده شد",
                    statusCode: res.statusCode
                })
            } catch (e) {
                return res.status(400).json({
                    message: "فایل وجود ندارد",
                    statusCode: res.statusCode
                })
            }


        } catch (error) {
            next(error)
        }
    }
}


module.exports = { SliderController: new SliderController() }