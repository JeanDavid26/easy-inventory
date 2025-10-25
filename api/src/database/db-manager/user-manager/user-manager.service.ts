import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { User } from 'src/database/entities/User.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserManagerService extends DatabaseManager<User> {
  constructor (@InjectRepository(User) private _repo: Repository<User>) {
    super(_repo)
  }

  public async get ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<User> {
    const repo = this._getRepo(options)
    const user = await repo.findOne({
      where: {
        id
      }
    })

    if (!user) {
      throw new BadRequestException('User not found')
    }
    return user
  }

  public async getByEmail ({ email, options = {} }: { email: string, options?: DatabaseManagerOptions }): Promise<User> {
    const repo = this._getRepo(options)
    const user = await repo.findOne({
      where: {
        email
      }
    })

    if (!user) {
      throw new BadRequestException('User not found')
    }
    return user
  }

  public async list ({ options = {} }: { options?: DatabaseManagerOptions }): Promise<User[]> {
    const repo = this._getRepo(options)
    return repo.find({})
  }

  public async insert ({ data, options = {} }: { data: Partial<User>, options?: DatabaseManagerOptions }): Promise<User> {
    const repo = this._getRepo(options)
    const reference = repo.create(data)
    return repo.save(reference)
  }

  public async update ({ id, data, options = {} }: { id: number, data: Partial<User>, options?: DatabaseManagerOptions }): Promise<User> {
    const repo = this._getRepo(options)
    delete data.id
    data.id = id
    return repo.save(data)
  }

  public async softDelete ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<User> {
    const repo = this._getRepo(options)
    await this.get({ id, options })
    return repo.save({
      id,
      deleteDate: new Date()
    })
  }
}
