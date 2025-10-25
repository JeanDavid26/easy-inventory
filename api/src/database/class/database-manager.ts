import { ObjectLiteral, Repository } from 'typeorm'
import { DatabaseManagerOptions } from '../@models/database-manager-options'

export class DatabaseManager<T extends ObjectLiteral> {
  protected _repository: Repository<T>

  constructor (repository: Repository<T>) {
    this._repository = repository
  }

  protected _getRepo (options?: DatabaseManagerOptions): any {

    if (options?.entityTransactionManager) {
      return options.entityTransactionManager.getRepository(this._repository.target)
    }

    return this._repository
  }

}
