import { normalizeFields } from "../db/helpers";
import { Repository } from "./commonTypes";

const updateOptions = { new: true, runValidators: true };

export const baseRepo = (model: any, makeObj: any): Repository<any> => ({
  async findById(id: string, projection = {}) {
    const record = await model.findById(id, projection).lean();
    if (!record) return null;

    return makeObj(record);
  },
  async findOne(filter = {}, projection = {}) {
    const record = await model.findOne(filter, projection).lean();
    if (!record) return null;
    return makeObj(record);
  },
  async find(filter = {}, projection = {}) {
    return (await model.find(filter, normalizeFields(projection))).map(makeObj);
  },
  async updateById(id: string, update = {}) {
    const record = await model.findByIdAndUpdate(id, update, updateOptions).lean();
    if (!record) return null;

    return makeObj(record);
  },
  async update(filter = {}, update = {}) {
    const record = await model.findOneAndUpdate(filter, update, updateOptions).lean();
    if (!record) return null;

    return makeObj(record);
  },
  async create(item: any) {
    const record = await model.create(item);
    if (!record) return null;

    return makeObj(record);
  },
});
