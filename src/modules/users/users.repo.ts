import { Repository } from "../../lib/commonTypes";
import makeUser from "./user";
import { IUser, IUserDTO } from "./users.types";

export const makeUserRepo = ({ model }: any): Repository<IUser> => {
  function docToUser({ _id, ...doc }: IUserDTO): IUser {
    return makeUser({ id: _id, ...doc });
  }

  async function find({ max } = { max: 100 }) {
    const query = {};

    return (await model.find(query).limit(Number(max)).toArray()).map(docToUser);
  }

  async function add(user: IUser) {
    const { ops } = await model.insertOne(user).catch((mongoError: Error) => {
      throw mongoError;
    });

    return docToUser(ops[0]);
  }

  async function findById({ id }: IUser) {
    const found = await model.findById(id);
    if (found) return docToUser(found);
    return null;
  }

  async function findByEmail({ email }: IUser) {
    const results = await model.find({ email }).toArray();
    return results.map(docToUser)[0];
  }

  async function updateOne(query = {}, update = {}) {
    const results = await model.findOneAndUpdate(query, update).toArray();
    return results.map(docToUser)[0];
  }

  return Object.freeze({
    add,
    findByEmail,
    findById,
    find,
    updateOne,
  });
};
