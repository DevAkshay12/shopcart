  namespace db;

  using { cuid, managed } from '@sap/cds/common';

  entity Categories {
    key ID   : UUID;
        name : String;

    products : Composition of many Products on products.category = $self;
  }

  entity Products {
    key ID          : UUID;
        name        : String;
        price       : String;
        supplier    : String;
        description : String;
         status      : String;
    category : Association to Categories;

    images : Composition of many ProductImages on images.product = $self;
  }

  entity ProductImages : cuid, managed {
    @Core.MediaType: mediaType
    content     : LargeBinary;

    @Core.IsMediaType: true
    mediaType   : String;

    fileName    : String;
    size        : Integer;
    url         : String;
    productName : String;
    product     : Association to Products;
  }

  entity CarouselImages : cuid, managed {
    @Core.MediaType: mediaType
    content     : LargeBinary;

    @Core.IsMediaType: true
    mediaType   : String;

    fileName    : String;
    size        : Integer;
    url         : String;

    // Optional: Add title, caption, link, etc.
    title       : String;
    description : String;
    sortOrder   : Integer;
  }
