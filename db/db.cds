using { cuid } from '@sap/cds/common';


namespace cap.rest.db;

entity Categories : cuid {
    name : String;
    age  : Integer;
}

entity FileUploads : cuid {
    filename    : String(255);
    @Core.MediaType  : mimetype
    filecontent : LargeBinary;
    @Core.IsMediaType: true
    mimetype    : String(100);
    filesize    : Integer;
    uploadedAt  : Timestamp @cds.on.insert : $now;
}