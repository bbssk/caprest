

using { cap.rest.db as db } from '../db/db';


@protocol:'odata'
service odata {
    entity Categories as projection on db.Categories;
    action getCategories() returns array of Categories;
}