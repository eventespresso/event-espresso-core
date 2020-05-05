import React from 'react';
import { __ } from '@wordpress/i18n';
import { RangeControl, ToggleControl } from '@wordpress/components';

import { AttendeesEditProps } from '../types';

const GravatarSettings: React.FC<AttendeesEditProps> = ({
	attributes: { avatarSize, showGravatar },
	setAttributes,
}) => {
	return (
		<>
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
		</>
	);
};

export default GravatarSettings;
