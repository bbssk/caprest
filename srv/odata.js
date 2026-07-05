const cds = require('@sap/cds');

module.exports = class ODataService extends cds.ApplicationService {
    async init() {
        this.on('getCategories', async () => {
            return await SELECT.from(this.entities.Categories);
        });
        return super.init();
    }
};
