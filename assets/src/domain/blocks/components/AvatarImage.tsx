import React, { CSSProperties } from 'react';

import { __ } from '@wordpress/i18n';

interface AvatarImageProps {
	altText?: string;
	className?: string;
	height?: number;
	url: string;
	width?: number;
}

const AvatarImage: React.FC<AvatarImageProps> = ({ className = 'contact', url, altText, height = 32, width = 32 }) => {
	const style: CSSProperties = {
		height,
		width,
	};
	return url ? (
		<div className={className + '-image-wrap-div'}>
			<img
				className={className + '-avatar-img avatar'}
				src={url}
				style={style}
				alt={altText || __('contact avatar', 'event_espresso')}
			/>
		</div>
	) : null;
};

export default AvatarImage;
