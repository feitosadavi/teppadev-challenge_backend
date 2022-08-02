import {
  IDeleteAccount,
  IDeleteAccountRepository
} from '@/application/protocols'

export class DeleteAccount implements IDeleteAccount {
  constructor(
    private readonly deleteAccountRepository: IDeleteAccountRepository,
  ) { }

  async execute (input: IDeleteAccount.Input): Promise<IDeleteAccount.Output> {
    await this.deleteAccountRepository.delete(input)
  }
}