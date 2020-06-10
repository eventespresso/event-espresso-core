import React, { useMemo } from 'react';
import { __ } from '@wordpress/i18n';

import { Button, ButtonProps, ButtonType } from '@application/ui/input';
import { ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight } from '@appDisplay/icons/svgs';

interface Props extends ButtonProps {
	skippable?: boolean;
}

const Previous: React.FC<Props> = ({ isDisabled, onClick, skippable, ...props }) => {
	const buttonText = props.buttonText || __('Previous');
	const leftIcon = useMemo(
		() => (skippable ? () => <ChevronDoubleLeft size='small' /> : () => <ChevronLeft size='small' />),
		[skippable]
	);

	return <Button buttonText={buttonText} isDisabled={isDisabled} leftIcon={leftIcon} onClick={onClick} />;
};

export default Previous;
