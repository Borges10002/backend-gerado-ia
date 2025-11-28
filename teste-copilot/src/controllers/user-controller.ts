import type { Request, Response } from "express";
import UserRepository from "../repositories/user-repository.js";
import Login from "../use-cases/user/login.js";

export default class UserController {
  static async login(request: Request, response: Response) {
    const { login, password } = request.body;
    const userRepository = new UserRepository();
    const loginUserCase = new Login(userRepository);

    try {
      const user = await loginUserCase.execute(login, password);
      response.json(user);
    } catch (error) {
      response.status(400).json({ message: (error as Error).message });
    }
  }
}
