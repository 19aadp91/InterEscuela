import { ErrorModel } from "./ErrorModel";

export interface ResposeModel<T> {
    body?:T,
    errors?:ErrorModel[];
}