import { EntityListViewProps } from '@appLayout/entityList';
import { Datetime } from '@edtrServices/apollo';
import { DatetimesFilterStateManager } from '@edtrServices/filterState';

export interface DatesListViewProps extends EntityListViewProps<Datetime, DatetimesFilterStateManager> {}
