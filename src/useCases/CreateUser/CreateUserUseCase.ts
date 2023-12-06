import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvieder";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUserRepository,
    private mailProvider: IMailProvider
  ) {}
  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExist = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExist) {
      throw new Error("User already exists");
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Equipe Solid",
        email: "equipsolid@gmail.com",
      },
      subject: "Seja bem-vindo ao Solid",
      body: "<p>Você ja pode fazer login em nossa aplicação</p>",
    });
  }
}
