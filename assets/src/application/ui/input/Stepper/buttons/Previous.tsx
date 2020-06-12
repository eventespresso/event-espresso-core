import React, { memo } from 'react';
import { __ } from '@wordpress/i18n';

import { Button, ButtonProps } from '@application/ui/input';
import { ChevronDoubleLeft, ChevronLeft } from '@appDisplay/icons/svgs';

interface Props extends ButtonProps {
	skippable?: boolean;
}

const Previous: React.FC<Props> = ({ isDisabled, onClick, skippable, ...props }) => {
	const buttonText = props.buttonText || __('Previous');
	const leftIcon = memo(() => (skippable ? <ChevronDoubleLeft size='smaller' /> : <ChevronLeft size='smaller' />));

	return <Button buttonText={buttonText} isDisabled={isDisabled} leftIcon={leftIcon} onClick={onClick} />;
};

export default memo(Previous);
