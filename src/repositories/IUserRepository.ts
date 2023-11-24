import { User } from "../entities/User";

export interface IUserRepository {
  findByEmail(email: string): Promise<any>;
  save(user: User): Promise<void>;
}