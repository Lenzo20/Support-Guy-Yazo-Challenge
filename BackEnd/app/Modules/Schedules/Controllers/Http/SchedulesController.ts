import { container } from 'tsyringe'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { ScheduleServices } from '../../Services'

export default class SchedulesController {
  public async list({ request, response }: HttpContextContract): Promise<void> {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)
    const search = request.input('search', '')
    const scheduleServices = container.resolve(ScheduleServices)

    const schedules = await scheduleServices.list({ page, perPage, search })
    return response.json(schedules)
  }
}
