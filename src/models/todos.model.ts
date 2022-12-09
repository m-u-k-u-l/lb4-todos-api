import {Entity, model, property} from '@loopback/repository';

@model()
export class Todos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'string',
  })
  category_id?: string;

  @property({
    type: 'string',
  })
  attachment?: string;

  @property({
    type: 'boolean',
  })
  status: boolean;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;


  constructor(data?: Partial<Todos>) {
    super(data);
  }
}

export interface TodosRelations {
  // describe navigational properties here
}

export type TodosWithRelations = Todos & TodosRelations;
