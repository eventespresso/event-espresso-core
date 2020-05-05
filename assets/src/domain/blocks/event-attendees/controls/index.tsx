import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

import { AttendeesEditProps } from '../types';
import AttendeeLimit from './AttendeeLimit';
import ArchiveSettings from './ArchiveSettings';
import GravatarSettings from './GravatarSettings';
import SelectDatetime from './SelectDatetime';
import SelectEvent from './SelectEvent';
import SelectOrder from './SelectOrder';
import SelectOrderBy from './SelectOrderBy';
import SelectStatus from './SelectStatus';
import SelectTicket from './SelectTicket';

const Controls: React.FC<AttendeesEditProps> = (props) => {
	const { datetime, event } = props.attributes;

	return (
		<InspectorControls>
			<PanelBody title={__('Filter By Settings', 'event_espresso')}>
				<SelectEvent {...props} />

				{event && <SelectDatetime {...props} />}

				{event && datetime && <SelectTicket {...props} />}

				<SelectStatus {...props} />

				<AttendeeLimit {...props} />

				<SelectOrderBy {...props} />

				<SelectOrder {...props} />
			</PanelBody>
			<PanelBody title={__('Gravatar Setttings', 'event_espresso')}>
				<GravatarSettings {...props} />
			</PanelBody>
			<PanelBody title={__('Archive Settings', 'event_espresso')}>
				<ArchiveSettings {...props} />
			</PanelBody>
		</InspectorControls>
	);
};

export default Controls;
