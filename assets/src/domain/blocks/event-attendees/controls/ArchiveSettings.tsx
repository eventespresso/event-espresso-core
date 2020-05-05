import React from 'react';
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

import { AttendeesEditProps } from '../types';

const ArchiveSettings: React.FC<AttendeesEditProps> = ({ attributes: { displayOnArchives }, setAttributes }) => {
	return (
		<ToggleControl
			label={__('Display on Archives', 'event_espresso')}
			checked={displayOnArchives}
			onChange={(displayOnArchives): void => setAttributes({ displayOnArchives })}
			help={
				displayOnArchives
					? __('Attendees are shown whenever this post is listed in an archive view.', 'event_espresso')
					: __('Attendees are hidden whenever this post is listed in an archive view.', 'event_espresso')
			}
		/>
	);
};

export default ArchiveSettings;
