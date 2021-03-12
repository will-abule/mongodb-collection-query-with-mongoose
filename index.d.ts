import { Model, Document } from "mongoose";
import { QueryInterface, Response } from "./utils/interfaces-utils";
export default function getResReq(query: QueryInterface, DBModel: Model<Document>, select: string): Promise<Response>;
