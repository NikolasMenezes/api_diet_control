import BaseModel from "./baseModel";
import type { User } from "../interfaces/iUser";
import type { ResultSetHeader } from "mysql2/promise";

export default class UserModel extends BaseModel {

  public async selectUsers(): Promise<ResultSetHeader[]> {
    return await this.execute("SELECT id, name, email, isPremium FROM users");
  }

  public async findById(id: string): Promise<ResultSetHeader[]> {
    return await this.execute("SELECT id, name, email, isPremium FROM users where id = ?", id);
  }

  public async findByEmail(email: string): Promise<ResultSetHeader[]> {
    return await this.execute("SELECT id, name, email, isPremium, password FROM users where email = ?", email);
  }

  public async createUser({ name, email, password, isPremium }: User): Promise<ResultSetHeader[]> {
    return await this.execute(
      "INSERT INTO users(name, email, password, isPremium) VALUES (?, ?, ?, ?)",
      name, email, password, isPremium
    );
  }

  public async deleteUser(id: string): Promise<ResultSetHeader[]> {
    return await this.execute("DELETE FROM users WHERE id = ?", id);
  }

  public async updateUser(id: string, { email, name, isPremium }: Partial<User>): Promise<ResultSetHeader[]> {
    return await this.execute(
      "UPDATE users SET name = IFNULL(?, name), email = IFNULL(?, email), isPremium = IFNULL(?, isPremium) WHERE id = ?",
      name ?? null, email ?? null, isPremium ?? null, id
    );
  }

}
