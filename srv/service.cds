using db from '../db/schema';
service shop {
    entity Categories as projection on db.Categories;
    entity Products as projection on db.Products;
    entity ProductImages as projection on db.ProductImages;
    entity productimg as select from db.Products as p 
    left join db.ProductImages as i on i.productName = p.name 
    {
        key p.ID as ID,
        p.name as name,
        p.price as price,
        p.supplier as supplier,
        p.description as description,
        p.status as state,
        i.fileName as fileName,
        i.url as url,
        i.mediaType as mediaType,
    }
    entity CarouselImages as projection on db.CarouselImages;
}
