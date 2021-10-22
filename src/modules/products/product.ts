import { pick } from "lodash";
import validator from "validator";
import InvalidPropertyError from "../../complements/errors/InvalidPropertyError";
import { IProduct, IProductDTO } from "./products.types";

const productNormalizer = (product: IProduct): IProduct => {
  return {
    ...product,
    price: parseInt(Number(product.price).toFixed(2), 10),
  };
};

const productValidator = (productDTO: IProductDTO): IProduct => {
  const newProduct: IProductDTO = pick(productDTO, [
    "id",
    "name",
    "description",
    "price",
    "images",
  ]);

  if (
    !newProduct.name ||
    !validator.isAlpha(newProduct.name) ||
    !validator.isLength(newProduct.name, { min: 2 })
  )
    throw new InvalidPropertyError("name");

  if (!newProduct.description || !validator.isLength(newProduct.name, { min: 10 }))
    throw new InvalidPropertyError("description");

  if (!newProduct.price || typeof newProduct.price !== "number")
    throw new InvalidPropertyError("price");

  if (!newProduct.images || !Array.isArray(newProduct.images) || !newProduct.images.length)
    throw new InvalidPropertyError("images");

  return newProduct as IProduct;
};

export default function makeProduct(productData: IProductDTO): IProduct {
  const validProduct = productValidator(productData);
  const normalProduct = productNormalizer(validProduct);
  return Object.freeze(normalProduct);
}
