const cds = require('@sap/cds');

module.exports = class ODataService extends cds.ApplicationService {
    async init() {
        this.on('getCategories', async () => {
            return await SELECT.from(this.entities.Categories);
        });

        // Streams filecontent as raw binary for $value requests
        this.on('READ', 'FileUploads', async (req, next) => {
            if (!req._.req.path.endsWith('/$value')) return next();

            const [id] = req.params;
            const row = await SELECT.one
                .from(this.entities.FileUploads)
                .columns('filename', 'mimetype', 'filecontent')
                .where({ ID: typeof id === 'object' ? id.ID : id });

            if (!row) req.reject(404, 'File not found');

            const res = req._.res;
            res.setHeader('Content-Type', row.mimetype || 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename="${row.filename}"`);
            res.end(row.filecontent);
        });

        return super.init();
    }
};
