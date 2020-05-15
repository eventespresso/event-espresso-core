import React from 'react';
import { __, sprintf } from '@wordpress/i18n';

import { ContainerProps } from './types';
import { Container as EditModalContainer } from '@sharedUI/entityEditModal';
import { useEvent, useDatetimeItem } from '@edtrServices/apollo/queries';
import Content from './Content';

const Container: React.FC<ContainerProps> = ({ datetimeId, ...props }) => {
	const datetime = useDatetimeItem({ id: datetimeId });
	const event = useEvent();

	let title = datetime?.dbId ? sprintf(__('Edit datetime %s'), `#${datetime.dbId}`) : __('New Datetime');

	// add event name to the title
	title = event?.name ? `${event.name}: ${title}` : title;

	return <EditModalContainer component={Content} entity={datetime} title={title} {...props} />;
};

export default Container;
