const cds = require('@sap/cds');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (_req, file, cb) => {
        if (file.mimetype !== 'text/csv' && !file.originalname.endsWith('.csv')) {
            return cb(new Error('Only CSV files are accepted'));
        }
        cb(null, true);
    }
});

// Runs before CAP registers its own middleware.
// Multer parses the multipart body; we then rewrite Content-Type to application/json
// so CAP's REST adapter does not reject with 415.
// body-parser skips req.body when it is already set, so setting req.body = {}
// prevents it from trying to read the already-consumed stream.
cds.on('bootstrap', (app) => {
    app.use('/rest/rest/uploadFile', upload.single('file'), (req, _res, next) => {
        req.headers['content-type'] = 'application/json';
        req.body = {};
        next();
    });
});

module.exports = cds.server;
