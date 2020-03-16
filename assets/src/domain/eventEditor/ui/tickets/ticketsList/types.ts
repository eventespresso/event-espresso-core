import { EntityListViewProps } from '@appLayout/entityList';
import { Ticket } from '@edtrServices/apollo';
import { TicketsFilterStateManager } from '@edtrServices/filterState';

export interface TicketsListViewProps extends EntityListViewProps<Ticket, TicketsFilterStateManager> {}
