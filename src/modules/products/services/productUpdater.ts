import NotFoundError from "../../../complements/errors/NotFoundError";
import { Repository } from "../../../lib/commonTypes";
import makeProduct from "../product";
import { IProduct, IProductDTO } from "../products.types";

type ProductUpdater = (id: string, dto: IProductDTO) => Promise<IProduct>;

export function productUpdater(repo: Repository<IProduct>): ProductUpdater {
  const validateBusinessRules = async (productDTO: IProductDTO): Promise<IProduct> => {
    const foundProduct = await repo.findOne({ id: productDTO.id });

    if (!foundProduct) throw new NotFoundError("Product not found");

    const newProduct = makeProduct({ ...foundProduct, ...productDTO });

    return newProduct;
  };

  return async (productId: string, productDTO: IProductDTO): Promise<IProduct> => {
    const validProduct = await validateBusinessRules(productDTO);
    const updatedProduct = await repo.updateById(productId, validProduct);

    return updatedProduct;
  };
}
