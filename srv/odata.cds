

using { cap.rest.db as db } from '../db/db';


@protocol: 'odata'
service odata {
    entity Categories  as projection on db.Categories;
    entity FileUploads as projection on db.FileUploads;
    action getCategories() returns array of Categories;
}