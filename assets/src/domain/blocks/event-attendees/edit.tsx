import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelBody, Placeholder, RangeControl, ToggleControl } from '@wordpress/components';
import { BlockEditProps } from '@wordpress/blocks';

import withApollo from '@dataServices/apollo/withApollo';
import { EventAttendeesAttributes } from './types';
import { SelectEvent, SelectDatetime, SelectOrder, SelectOrderBy, SelectStatus, SelectTicket } from './controls';

const AttendeesDisplay: React.FC = () => (
	<Placeholder>
		<h4>Hello, this is the cool new EE Block, if you feel lost, find a way :)</h4>
	</Placeholder>
);
const EventAttendeesEdit: React.FC<BlockEditProps<EventAttendeesAttributes>> = ({ attributes, setAttributes }) => {
	const Controls: React.FC = () => {
		return (
			<InspectorControls>
				<PanelBody title={__('Filter By Settings', 'event_espresso')}>
					<SelectEvent event={attributes.event} setEvent={(event): void => setAttributes({ event })} />
					{attributes.event && (
						<SelectDatetime
							event={attributes.event}
							datetime={attributes.datetime}
							setDatetime={(datetime): void => setAttributes({ datetime })}
						/>
					)}
					{attributes.datetime && (
						<SelectTicket
							datetime={attributes.datetime}
							setTicket={(ticket): void => setAttributes({ ticket })}
							ticket={attributes.ticket}
						/>
					)}
					<SelectStatus status={attributes.status} setStatus={(status): void => setAttributes({ status })} />
					<SelectOrderBy
						orderBy={attributes.orderBy}
						setOrderBy={(orderBy): void => setAttributes({ orderBy })}
					/>
					<SelectOrder order={attributes.order} setOrder={(order): void => setAttributes({ order })} />
				</PanelBody>
				<PanelBody title={__('Gravatar Setttings', 'event_espresso')}>
					<ToggleControl
						label={__('Display Gravatar', 'event_espresso')}
						checked={attributes.showGravatar}
						onChange={(showGravatar): void => setAttributes({ showGravatar })}
						help={
							attributes.showGravatar
								? __('Gravatar images are shown for each attendee.', 'event_espresso')
								: __('No gravatar images are shown for each attendee.', 'event_espresso')
						}
					/>
					{attributes.showGravatar && (
						<RangeControl
							label={__('Size of Gravatar', 'event_espresso')}
							value={attributes.avatarSize}
							min={10}
							max={128}
							onChange={console.log}
						/>
					)}
				</PanelBody>
			</InspectorControls>
		);
	};
	return (
		<>
			<AttendeesDisplay />
			<Controls />
		</>
	);
};

export default withApollo(EventAttendeesEdit);
