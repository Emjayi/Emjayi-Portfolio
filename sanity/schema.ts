import { title } from 'process'
import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post
  ],
}
