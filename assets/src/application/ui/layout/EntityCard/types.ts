import { Entity } from '@edtrServices/apollo/types';

export interface EntityCardProps {
	actionsMenu: JSX.Element;
	details: JSX.Element;
	entity: Entity;
	sidebar: JSX.Element;
	reverse?: boolean;
}
