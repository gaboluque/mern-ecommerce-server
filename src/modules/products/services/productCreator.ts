import BusinessValidationError from "../../../complements/errors/BusinessValidationError";
import { Repository } from "../../../lib/commonTypes";
import makeProduct from "../product";
import { IProduct, IProductDTO } from "../products.types";

type ProductCreator = (dto: IProductDTO) => Promise<IProduct>;

export function productCreator(repo: Repository<IProduct>): ProductCreator {
  const validateBusinessRules = async (productDTO: IProductDTO): Promise<IProduct> => {
    const foundProduct = await repo.findOne({ name: productDTO.name });

    if (foundProduct) throw new BusinessValidationError("Duplicate name");

    const newProduct = makeProduct(productDTO);

    return newProduct;
  };

  return async (productDTO: IProductDTO): Promise<IProduct> => {
    const validProduct = await validateBusinessRules(productDTO);
    const newProduct = await repo.create(validProduct);

    return newProduct;
  };
}
