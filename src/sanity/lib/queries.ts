import { defineQuery } from "next-sanity";

export const allproducts = defineQuery (`
    *[_type == "product"] {
    _id,
    name,
    description,
    price,
    discountPercentage,
    priceWithoutDiscount,
    rating,
    ratingCount,
    tags,
    "imageUrl" : image.assets -> url
    }
`)

export const fourPro = defineQuery (`
    *[_type == "product"] [0..3] {
    _id,
    name,
    description,
    price,
    discountPercentage,
    priceWithoutDiscount,
    rating,
    ratingCount,
    tags,
    "imageUrl" : image.assets -> url
    }
`)