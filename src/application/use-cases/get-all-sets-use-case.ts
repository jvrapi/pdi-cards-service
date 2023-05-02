import { inject, injectable } from 'tsyringe'

import { MessagingRepository } from '../repositories/messaging-repository'

@injectable()
export class GetAllSetsUseCase {
  constructor(
    @inject('MessagingRepository')
    private messagingRepository: MessagingRepository,
  ) {}

  async execute() {
    return await this.messagingRepository.getAllSetsCode()
  }
}
