const cds = require('@sap/cds');

module.exports = class RestService extends cds.ApplicationService {
    async init() {
        this.on('getCategories', async () => {
            return await SELECT.from(this.entities.Categories);
        });

        this.on('uploadFile', async (req) => {
            const { FileUploads } = this.entities;
            const file = req._.file;

            if (!file) req.reject(400, 'No file provided. Send a CSV file in form field "file".');

            await INSERT.into(FileUploads).entries({
                filename    : file.originalname,
                mimetype    : file.mimetype,
                filecontent : file.buffer,
                filesize    : file.size
            });

            return 'File uploaded successfully';
        });

        return super.init();
    }
};
