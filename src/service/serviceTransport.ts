import {getRepository, In, IsNull, Repository} from 'typeorm';
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
        status: Status.WAY,
      }
    });


    if(transport && data.status === Status.WAY) {
      data.collisionId = transport.collisionId;
      return await this.updateTransport(transport.id, data);
    }

    if(transport && transport.collisionId !== null) {
      this.updateTransport(transport.collisionId, data);
      return ;
    }


    const res = await this.repository.createQueryBuilder()
      .insert()
      .into(Transport)
      .values(data)
      .execute();



    if(transport) {
      transport.collisionId = res.identifiers[0].id;
      await this.repository.save(transport);
    }

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
    await this.repository.update(data.id, data);

    await this.repository.delete(id);
  };


  getTransport = async (id: string) => {
    const res = await this.repository.findOne(id);
    return res;
  };

  getTransportByNumber = async (number: string) => {
    try {
      const res = await this.repository.findOne({
        where: {
          number_transport: number,
          status: Status.WAY
        }
      });
      return res;
    }
    catch (e) {
      return '';
    }
  };

  getTransports = async (collision: boolean = false, status: Status[] = [Status.WAY, Status.ARRIVED]) => {
    let where = {};

    if(collision) {
      where = {
        collisionId: IsNull()
      }
    }
    const res = await this.repository.find({
      where: {
        status: In(status),
        ...where
      },
    });
    return res;
  }
}

