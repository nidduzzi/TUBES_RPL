import { NewTicketTypeAttributeValue } from './newTicketTypeAttributeValue.interface';

export interface NewTicketTypeAttribute {
  name: string;
  values: NewTicketTypeAttributeValue[];
}
