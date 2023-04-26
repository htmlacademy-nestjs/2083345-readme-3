import { Entity } from '@project/util/util-types';
import { SubscriberInterface } from '@project/shared/app-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, SubscriberInterface {
  public id: string;
  public email: string;
  public name: string;

  constructor(emailSubscriber: SubscriberInterface) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.email = entity.email;
    this.name = entity.name;
    this.id = entity.id ?? '';
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
