import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Logger from '@ioc:Adonis/Core/Logger'

export default class extends BaseSchema {
  protected tableName = 'schedule_tags'

  public async up() {
    if (!(await this.schema.hasTable(this.tableName)))
      this.schema.createTable(this.tableName, (table) => {
        table.increments('id').unsigned().primary().index('schedule_tags_id_index')

        table
          .integer('schedule_id')
          .references('id')
          .inTable('schedules')
          .notNullable()
          .onDelete('CASCADE')
          .onUpdate('CASCADE')

        table
          .integer('tag_id')
          .references('id')
          .inTable('tags')
          .notNullable()
          .onDelete('CASCADE')
          .onUpdate('CASCADE')

        /**
         * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
         */
        table.timestamp('created_at', { useTz: true }).defaultTo('now()')
        table.timestamp('updated_at', { useTz: true }).defaultTo('now()')
      })
    else Logger.info('ScheduleTags migration already running')
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
