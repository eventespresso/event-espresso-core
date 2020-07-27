import { Entity } from '@dataServices/types';

export interface EntityCardProps {
	actionsMenu: JSX.Element;
	cacheId?: string;
	details: JSX.Element;
	entity: Entity;
	reverse?: boolean;
	sidebar: JSX.Element;
	sidebarClassName?: string;
}
