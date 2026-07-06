const cds = require('@sap/cds');
const { PassThrough } = require('stream');

module.exports = class RestService extends cds.ApplicationService {

    async init() {
        this.on('getCategories', () => SELECT.from(this.entities.Categories));
        this.on('uploadFile',    this.onUploadFile.bind(this));
        return super.init();
    }

    // ─── Handlers ────────────────────────────────────────────────────────────

    async onUploadFile(req) {
        if (!req.data.file) req.reject(400, 'No file provided. Send a file in form field "file".');

        const fileBuffer = await new Promise((resolve, reject) => {
            const stream = new PassThrough();
            const chunks = [];
            stream.on('data',  chunk => chunks.push(chunk));
            stream.on('end',   ()    => resolve(Buffer.concat(chunks)));
            stream.on('error', reject);
            req.data.file.pipe(stream);
        });

        await INSERT.into(this.entities.FileUploads).entries({
            filename    : req.data.file.originalname,
            mimetype    : req.data.file.mimetype,
            filecontent : fileBuffer,
            filesize    : req.data.file.size
        });

        return 'File uploaded successfully';
    }
};
