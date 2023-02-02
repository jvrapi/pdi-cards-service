import { FastifyRequest } from "fastify";
import { container } from "tsyringe";
import z from 'zod'
import { GetAllSetsUseCase } from "./get-all-sets-use-case";
export class GetAllSetsHandler {
  async handle(request: FastifyRequest){

    z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number()
      .min(1)
      .max(50)
      .optional()
    )
    const getAllSetsParams = z.object({
      limit: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z.number()
        .min(1)
        .max(50)
        .optional()
      ),
      page:z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z.number()
        .min(1)
        .optional()
      )
    }) 

    const {limit, page} = getAllSetsParams.parse(request.query)
    const getAllSetsUseCase = container.resolve(GetAllSetsUseCase)
    return getAllSetsUseCase.execute({limit,page})
  }
}