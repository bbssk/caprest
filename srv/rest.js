const cds = require('@sap/cds');

module.exports = class RestService extends cds.ApplicationService {

    async init() {
        this.on('getCategories', () => SELECT.from(this.entities.Categories));
        this.on('uploadFile',    this.onUploadFile.bind(this));
        return super.init();
    }

    // ─── Handlers ────────────────────────────────────────────────────────────

    async onUploadFile(req) {
        const file = this.getMultipartFile(req);

        if (!file) req.reject(400, 'No file provided. Send a CSV file in form field "file".');

        const { FileUploads } = this.entities;

        await INSERT.into(FileUploads).entries({
            filename    : file.originalname,
            mimetype    : file.mimetype,
            filecontent : file.buffer,
            filesize    : file.size
        });

        return 'File uploaded successfully';
    }

    // ─── Helpers ─────────────────────────────────────────────────────────────

    // multer (server.js bootstrap) parses multipart before CAP touches the request.
    // CAP 9 exposes the underlying Express request as req._.req
    getMultipartFile(req) {
        const expressReq = req._.req ?? req._;
        return expressReq?.file ?? null;
    }
};
