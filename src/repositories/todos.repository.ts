import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TodosdbDataSource} from '../datasources';
import {Todos, TodosRelations} from '../models';

export class TodosRepository extends DefaultCrudRepository<
  Todos,
  typeof Todos.prototype.id,
  TodosRelations
> {
  constructor(
    @inject('datasources.todosdb') dataSource: TodosdbDataSource,
  ) {
    super(Todos, dataSource);
  }
}
