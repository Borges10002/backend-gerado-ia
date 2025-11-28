import type { User } from "../../entities/User.js";
import type UserRepository from "../../repositories/user-repository.js";

export default class Login {
  constructor(private userRepository: UserRepository) {}
  async execute(login: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmailAndPassword({
      login,
      password,
    });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.password !== password) {
      throw new Error("Invalid password");
    }
    return user;
  }
}
