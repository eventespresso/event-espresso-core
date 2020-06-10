import React, { useMemo } from 'react';
import { __ } from '@wordpress/i18n';

import { Button, ButtonProps, ButtonType } from '@application/ui/input';
import { ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight } from '@appDisplay/icons/svgs';

interface Props extends ButtonProps {
	skippable?: boolean;
}

const Next: React.FC<Props> = ({ isDisabled, onClick, skippable, ...props }) => {
	const buttonText = props.buttonText || __('Next');
	const buttonType = props.buttonType || ButtonType.PRIMARY;
	const rightIcon = useMemo(
		() => (skippable ? () => <ChevronDoubleRight size='small' /> : () => <ChevronRight size='small' />),
		[skippable]
	);

	return (
		<Button
			buttonText={buttonText}
			buttonType={buttonType}
			isDisabled={isDisabled}
			onClick={onClick}
			rightIcon={rightIcon}
		/>
	);
};

export default Next;
