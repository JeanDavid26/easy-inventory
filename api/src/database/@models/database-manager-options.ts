import { EntityManager } from 'typeorm'

export type DatabaseManagerOptions = {
  entityTransactionManager?: EntityManager
}
