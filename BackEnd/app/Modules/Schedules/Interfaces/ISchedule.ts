import BaseInterface from 'App/Shared/Interfaces/BaseInterface'
import Schedule from '../Models/Schedule'
import { DateTime } from 'luxon'

export namespace ISchedule {
  export interface Repository extends BaseInterface<typeof Schedule>, Helpers { }

  export interface Helpers { }

  export namespace DTOs {
    export type List = {
      page: number
      perPage: number
      search: string
    }

    export type Store = {
      title: string
      place: string
      start_time: DateTime
      end_time: DateTime
    }
  }
}
