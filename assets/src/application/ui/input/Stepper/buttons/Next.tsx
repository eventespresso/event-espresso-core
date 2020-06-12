import React, { memo } from 'react';
import { __ } from '@wordpress/i18n';

import { Button, ButtonProps, ButtonType } from '@application/ui/input';
import { ChevronDoubleRight, ChevronRight } from '@appDisplay/icons/svgs';

interface Props extends ButtonProps {
	skippable?: boolean;
}

const Next: React.FC<Props> = ({ isDisabled, onClick, skippable, ...props }) => {
	const buttonText = props.buttonText || __('Next');
	const buttonType = props.buttonType || ButtonType.PRIMARY;
	const rightIcon = memo(() => (skippable ? <ChevronDoubleRight size='smaller' /> : <ChevronRight size='smaller' />));

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

export default memo(Next);
