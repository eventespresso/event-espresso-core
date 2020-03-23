import { Ticket } from '@edtrServices/apollo/types';

// 'name' is only required for modal title
export const ticketFieldsToUse: Array<keyof Partial<Ticket>> = ['id', 'name', 'price', 'reverseCalculate'];
