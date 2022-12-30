import { Addresses } from "./Addresses";
import { User } from "./User";

export interface UserAddress {
    user:User,
    addresses: Addresses
}