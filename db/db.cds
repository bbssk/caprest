using { cuid } from '@sap/cds/common';


namespace cap.rest.db;

entity Categories : cuid {
    name : String;
    age  : Integer;
}

entity FileUploads : cuid {
    filename    : String(255);
    mimetype    : String(100);
    filecontent : LargeBinary;
    filesize    : Integer;
    uploadedAt  : Timestamp @cds.on.insert : $now;
}