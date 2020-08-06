import { Entity } from '@dataServices/types';

export interface EntityCardProps {
	actionsMenu: JSX.Element;
	details: JSX.Element;
	entity: Entity;
	sidebar: JSX.Element;
	reverse?: boolean;
	cacheId?: string;
}
