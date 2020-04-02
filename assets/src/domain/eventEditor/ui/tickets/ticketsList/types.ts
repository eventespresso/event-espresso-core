import type { EntityListViewProps, EntityListItemProps } from '@appLayout/entityList';
import type { Ticket } from '@edtrServices/apollo';
import type { TicketsFilterStateManager } from '@edtrServices/filterState';

export interface TicketsListViewProps extends EntityListViewProps<Ticket, TicketsFilterStateManager> {}

export interface TicketItemProps extends Required<Pick<EntityListItemProps<Ticket>, 'entity'>> {}
