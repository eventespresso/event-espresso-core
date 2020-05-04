import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { __, _n, sprintf } from '@wordpress/i18n';
import { PanelBody, RangeControl, ToggleControl, TextControl } from '@wordpress/components';

import { AttendeesEditProps } from '../types';
import SelectDatetime from './SelectDatetime';
import SelectEvent from './SelectEvent';
import SelectOrder from './SelectOrder';
import SelectOrderBy from './SelectOrderBy';
import SelectStatus from './SelectStatus';
import SelectTicket from './SelectTicket';

const Controls: React.FC<AttendeesEditProps> = (props) => {
	const {
		attributes: { avatarSize, datetime, displayOnArchives, event, showGravatar, limit },
		setAttributes,
	} = props;

	// TODO get value
	const attendeesCount = 0;
	return (
		<InspectorControls>
			<PanelBody title={__('Filter By Settings', 'event_espresso')}>
				<SelectEvent {...props} />
				{event && <SelectDatetime {...props} />}
				{event && datetime && <SelectTicket {...props} />}
				<SelectStatus {...props} />
				<TextControl
					type='number'
					value={limit}
					label={__('Number of Attendees to Display:', 'event_espresso')}
					min={1}
					onChange={(limit): void => setAttributes({ limit: parseInt(limit, 10) })}
					help={sprintf(
						_n(
							'Used to adjust the number of attendees displayed (There is %d total attendee for the current filter settings).',
							'Used to adjust the number of attendees displayed (There are %d total attendees for the current filter settings).',
							attendeesCount,
							'event_espresso'
						),
						attendeesCount
					)}
				/>
				<SelectOrderBy {...props} />
				<SelectOrder {...props} />
			</PanelBody>
			<PanelBody title={__('Gravatar Setttings', 'event_espresso')}>
				<ToggleControl
					label={__('Display Gravatar', 'event_espresso')}
					checked={showGravatar}
					onChange={(showGravatar): void => setAttributes({ showGravatar })}
					help={
						showGravatar
							? __('Gravatar images are shown for each attendee.', 'event_espresso')
							: __('No gravatar images are shown for each attendee.', 'event_espresso')
					}
				/>
				{showGravatar && (
					<RangeControl
						label={__('Size of Gravatar', 'event_espresso')}
						value={avatarSize}
						min={10}
						max={128}
						onChange={(avatarSize): void => setAttributes({ avatarSize })}
					/>
				)}
			</PanelBody>
			<PanelBody title={__('Archive Settings', 'event_espresso')}>
				<ToggleControl
					label={__('Display on Archives', 'event_espresso')}
					checked={displayOnArchives}
					onChange={(displayOnArchives): void => setAttributes({ displayOnArchives })}
					help={
						displayOnArchives
							? __(
									'Attendees are shown whenever this post is listed in an archive view.',
									'event_espresso'
							  )
							: __(
									'Attendees are hidden whenever this post is listed in an archive view.',
									'event_espresso'
							  )
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Controls;
