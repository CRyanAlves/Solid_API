import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUseCase {
  constructor(
    private usersRepository: IUserRepository
  ) {}
  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExist = await this.usersRepository.findByEmail(data.email);

    if(userAlreadyExist) {
      throw new Error('User already exists');
    }

    const user = new User(data);

    await this.usersRepository.save(user);
  }
}