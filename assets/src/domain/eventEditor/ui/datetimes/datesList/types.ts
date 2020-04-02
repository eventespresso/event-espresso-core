import type { EntityListViewProps, EntityListItemProps } from '@appLayout/entityList';
import type { Datetime } from '@edtrServices/apollo';
import type { DatetimesFilterStateManager } from '@edtrServices/filterState';

export interface DatesListViewProps extends EntityListViewProps<Datetime, DatetimesFilterStateManager> {}

export interface DateItemProps extends Required<Pick<EntityListItemProps<Datetime>, 'entity'>> {}
