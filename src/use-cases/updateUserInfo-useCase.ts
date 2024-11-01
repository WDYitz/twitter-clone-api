import type { UserRepositoryInterface } from "@/repositories/interfaces/user-interface";
import type { Prisma } from "@prisma/client";

export class UpdateUserInfoUseCase {
  constructor(private userRepository: UserRepositoryInterface) { }

  async execute(slug: string, data: Prisma.UserUpdateInput): Promise<void> {
    await this.userRepository.updateUserInfo(slug, data)
  }
}