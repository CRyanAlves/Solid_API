import { CreateUserController } from "./CreateUserController";
import { PostgresUserRepository } from "./../../repositories/implementations/PostgresUserRepository";
import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailtrapMailProvider = new MailtrapMailProvider();
const postgresUserRepository = new PostgresUserRepository();

const createUserUseCase = new CreateUserUseCase(
  postgresUserRepository,
  mailtrapMailProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserController, createUserUseCase };
