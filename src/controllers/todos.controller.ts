import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Todos} from '../models';
import {TodosRepository} from '../repositories';

export class TodosController {
  constructor(
    @repository(TodosRepository)
    public todosRepository : TodosRepository,
  ) {}

  @post('/todos')
  @response(200, {
    description: 'Todos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Todos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todos, {
            title: 'NewTodos',
            
          }),
        },
      },
    })
    todos: Todos,
  ): Promise<Todos> {
    return this.todosRepository.create(todos);
  }

  @get('/todos/count')
  @response(200, {
    description: 'Todos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Todos) where?: Where<Todos>,
  ): Promise<Count> {
    return this.todosRepository.count(where);
  }

  @get('/todos')
  @response(200, {
    description: 'Array of Todos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Todos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Todos) filter?: Filter<Todos>,
  ): Promise<Todos[]> {
    return this.todosRepository.find(filter);
  }

  @patch('/todos')
  @response(200, {
    description: 'Todos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todos, {partial: true}),
        },
      },
    })
    todos: Todos,
    @param.where(Todos) where?: Where<Todos>,
  ): Promise<Count> {
    return this.todosRepository.updateAll(todos, where);
  }

  @get('/todos/{id}')
  @response(200, {
    description: 'Todos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Todos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Todos, {exclude: 'where'}) filter?: FilterExcludingWhere<Todos>
  ): Promise<Todos> {
    return this.todosRepository.findById(id, filter);
  }

  @patch('/todos/{id}')
  @response(204, {
    description: 'Todos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todos, {partial: true}),
        },
      },
    })
    todos: Todos,
  ): Promise<void> {
    await this.todosRepository.updateById(id, todos);
  }

  @put('/todos/{id}')
  @response(204, {
    description: 'Todos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() todos: Todos,
  ): Promise<void> {
    await this.todosRepository.replaceById(id, todos);
  }

  @del('/todos/{id}')
  @response(204, {
    description: 'Todos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todosRepository.deleteById(id);
  }
}
