import { DateTime } from 'luxon'
import {
  column,
  manyToMany,
  ManyToMany,
  afterFetch,
  afterPaginate,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import BaseModel from 'App/Shared/Models/BaseModel'

import User from 'App/Modules/Accounts/Models/User'
import Tag from 'App/Modules/Tags/Models/Tag'

export default class Schedule extends BaseModel {
  public static table = 'schedules'

  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public place: string

  @column()
  public start_time: DateTime

  @column()
  public end_time: DateTime

  @column({ serializeAs: null })
  public is_deleted: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updated_at: DateTime

  @column.dateTime({ autoUpdate: true, serializeAs: null })
  public deleted_at: DateTime

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */

  @afterFetch()
  @afterPaginate()
  public static async loadRelationsOnPaginate(schedules: Array<Schedule>): Promise<void> {
    for (const schedule of schedules)
      await schedule.load('tags', (builder) => builder.orderBy('title'))
    for (const schedule of schedules)
      await schedule.load('users', (builder) => builder.orderBy('first_name'))
  }

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   * - define User model relationships
   */
  @manyToMany(() => Tag, {
    localKey: 'id',
    pivotForeignKey: 'schedule_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'tag_id',
    pivotTable: 'schedule_tags',
  })
  public tags: ManyToMany<typeof Tag>

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'schedule_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'schedule_users',
  })
  public users: ManyToMany<typeof User>

  /**
   * ------------------------------------------------------
   * Query Scopes
   * ------------------------------------------------------
   */
  public static searchQueryScope = scope((query, search) => {
    const fields = ['title']
    let sql = ''

    fields.forEach(
      (field, i) => (sql = `${sql} ${i !== 0 ? ' or ' : ' '} ${field} like LOWER('%${search}%')`)
    )

    return query.whereRaw(`(${sql})`)
  })
}
