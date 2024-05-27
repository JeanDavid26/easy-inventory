import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaiementMethod } from 'src/database/entities/PaiementMethod.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PaiementMethodManagerService {

  constructor (
    @InjectRepository(PaiementMethod)
    private _repo: Repository<PaiementMethod>,
  ) {}

  public async list (): Promise<PaiementMethod[]> {
    return this._repo.find()
  }

  public async get (id: number): Promise<PaiementMethod> {
    return this._repo.findOne({
      where: {
        id
      }
    })
  }

  public async insert (data: Partial<PaiementMethod>): Promise<PaiementMethod> {
    return this._repo.save(data)
  }

  public async update (
    id: number,
    data: Partial<PaiementMethod>,
  ): Promise<PaiementMethod> {
    delete data.id
    data.id = id
    return this._repo.save(data)
  }

  public async delete (id: number): Promise<void> {
    await this.get(id)

    await this._repo.delete(id)
  }
}
