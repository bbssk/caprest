const cds    = require('@sap/cds');
const multer  = require('multer');
const { Readable } = require('stream');

const upload = multer({ storage: multer.memoryStorage() });

cds.on('bootstrap', (app) => {
    app.use('/api/document/upload/uploadFile', upload.single('file'), (req, _res, next) => {
        if (!req.file) return next();

        // Wrap buffer as a Readable and carry multer metadata as properties on the stream.
        // body-parser skips when req.body is already set, so CAP uses this object as req.data.
        const readable        = Readable.from(req.file.buffer);
        readable.originalname = req.file.originalname;
        readable.mimetype     = req.file.mimetype;
        readable.size         = req.file.size;

        req.body = { file: readable };
        req.headers['content-type'] = 'application/json';
        next();
    });
});

module.exports = cds.server;
