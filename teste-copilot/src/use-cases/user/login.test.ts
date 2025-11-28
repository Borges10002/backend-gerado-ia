// Testes do caso de uso de login ajustados para Vitest

import { describe, it, expect, beforeEach, vi } from "vitest";
import Login from "./login.js";
import type UserRepository from "../../repositories/user-repository.js";

describe("Login", () => {
  let loginUseCase: Login;
  let userRepository: {
    findByEmailAndPassword: ReturnType<typeof vi.fn>;
  } & Partial<UserRepository>;

  beforeEach(() => {
    userRepository = {
      findByEmailAndPassword: vi.fn(),
    } as unknown as any;

    loginUseCase = new Login(userRepository as any);
  });

  it("should login successfully with valid credentials", async () => {
    const mockUser = {
      id: "1",
      email: "user@example.com",
      password: "password",
    };
    (userRepository.findByEmailAndPassword as any).mockResolvedValue(mockUser);

    const result = await loginUseCase.execute("user@example.com", "password");
    expect(result).toEqual(mockUser);
    expect(userRepository.findByEmailAndPassword).toHaveBeenCalledWith({
      login: "user@example.com",
      password: "password",
    });
  });

  it("should throw an error if user is not found", async () => {
    (userRepository.findByEmailAndPassword as any).mockResolvedValue(null);

    await expect(
      loginUseCase.execute("user@example.com", "password")
    ).rejects.toThrow("User not found");
  });

  it("should throw an error if password is incorrect", async () => {
    const mockUser = {
      id: "1",
      email: "user@example.com",
      password: "correctpassword",
    };

    // Simula repositório que retorna o usuário mesmo quando a senha passada é diferente
    (userRepository.findByEmailAndPassword as any).mockResolvedValue(mockUser);

    await expect(
      loginUseCase.execute("user@example.com", "wrongpassword")
    ).rejects.toThrow("Invalid password");
  });
});
