import {getRepository, In, Not, Repository} from 'typeorm';
import {Status, Transport} from '../entity/Transport';

export class ServiceTransport {
  private _repository: Repository<Transport>;

  get repository() {
    if(!this._repository)
      this._repository = getRepository(Transport);
    return this._repository;
  }

  delete = async (id: string) => {
    return await this.repository.delete(id);
  };

  deleteAll = async () => {
    return await this.repository.clear();
  };

  createTransport = async (data: any) => {
    const transport = await this.repository.findOne({
      where: {
        number_transport: data.number_transport,
        status: Status.WAY
      }
    });
    if(transport) {
      transport.status = Status.COLLISION;
      data.collisionId = transport.id;
      await this.repository.save(transport);
    }

    const res = await this.repository.createQueryBuilder()
      .insert()
      .into(Transport)
      .values(data)
      .execute();
    return res.identifiers[0].id;
  };

  updateTransport = async (id: string, data: any) => {
    const res = await this.repository.createQueryBuilder()
      .update(Transport)
      .set(data)
      .where('id = :id', {id})
      .execute();
  };

  solveTransport = async (data: Partial<Transport>) => {
    const id = data.collisionId;
    data.collisionId = null;
    await this.repository.update(id, data);

    await this.repository.delete(data.id);
  };


  getTransport = async (id: string) => {
    const res = await this.repository.findOne(id);
    return res;
  };

  getTransportDublicate = async (id: string) => {
    const res = await this.repository.findOne({
      where: {
        collisionId: id
      }
    });
    console.log(res);
    return res;
  };

  getTransports = async (statuses: Status[] = []) => {
    const res = await this.repository.find({
      where: statuses.length > 0 ?{
        status: In(statuses),
        collisionId: null
      } : {
        collisionId:  null
      },
    });
    return res;
  }
}

