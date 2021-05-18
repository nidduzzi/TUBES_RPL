import { NewTicketTypeAttribute } from './newTicketTypeAttribute.interface';

export interface NewTicketType {
  name: string;
  description?: string;
  attributes: NewTicketTypeAttribute[];
  price: number;
  currency: string;
}
