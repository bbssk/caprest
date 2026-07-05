
using { cap.rest.db as db } from '../db/db';

@protocol: 'rest'
service rest {
    entity Categories  as projection on db.Categories;
    entity FileUploads as projection on db.FileUploads;

    action getCategories() returns array of Categories;

    @Core.Description    : 'Upload a CSV file and store it'
    @openapi.path        : '/uploadFile'
    action uploadFile(
                          @description     : 'CSV file to upload'
                          @openapi.in      : 'formData'
                          @openapi.required: true
                          file : LargeBinary
                        ) returns String;
}
