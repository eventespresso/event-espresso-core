import React from 'react';
import classNames from 'classnames';
import { Alert as ChakraAlert, AlertIcon, AlertTitle, AlertDescription, AlertProps, IconProps } from '@chakra-ui/core';

interface Props extends AlertProps {
	description: string;
	iconProps?: IconProps;
	title: string;
}

const Banner: React.FC<Props> = ({ children, className, description, iconProps, status, title, ...props }) => {
	const bannerClass = classNames(className, 'ee-banner', status && `ee-banner--${status}`);
	return (
		<ChakraAlert className={bannerClass} {...props}>
			<AlertIcon className={'ee-banner__icon'} {...iconProps} />
			{title && <AlertTitle className={'ee-banner__title'}>{title}</AlertTitle>}
			{description && <AlertDescription className={'ee-banner__desc'}>{description}</AlertDescription>}
			{children && children}
		</ChakraAlert>
	);
};

export default Banner;
