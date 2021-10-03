import { normalizeFields } from "../db/helpers";
import { Repository } from "./commonTypes";

const updateOptions = { new: true, runValidators: true };

export const baseRepo = (model: any, makeObj: any): Repository<any> => ({
  async findById(id: string, projection = {}) {
    return makeObj(await model.findById(id, projection).lean());
  },
  async findOne(filter = {}, projection = {}) {
    return makeObj(await model.findOne(filter, projection).lean());
  },
  async find(filter = {}, projection = {}) {
    return (await model.find(filter, normalizeFields(projection))).map(makeObj);
  },
  async updateById(id: string, update = {}) {
    return makeObj(await model.findByIdAndUpdate(id, update, updateOptions).lean());
  },
  async update(filter = {}, update = {}) {
    return makeObj(await model.findOneAndUpdate(filter, update, updateOptions).lean());
  },
  async create(item: any) {
    return makeObj(await model.create(item));
  },
});
