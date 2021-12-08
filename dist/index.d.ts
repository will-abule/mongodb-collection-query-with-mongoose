import { Model, Document } from "mongoose";
import { QueryInterface, Response as Res } from "./utils/interfaces-utils";

export { QueryInterface };

export default function getResReq(
  query: QueryInterface,
  DBModel: Model<Document>,
  select: string
): Promise<Res>;
