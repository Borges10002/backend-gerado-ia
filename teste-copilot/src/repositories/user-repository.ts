import { Repository } from "typeorm";
import { User } from "../entities/User.js";
import databaseService from "../services/database-service.js";

class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = databaseService.getRepository(User);
  }

  async findByEmailAndPassword({
    login,
    password,
  }: {
    login: string;
    password: string;
  }): Promise<User | null> {
    const user = this.repository.findOne({ where: { email: login, password } });

    if (!user) {
      throw new Error("Ivalid login or password ");
    }

    return user;
  }
}

export default UserRepository;
