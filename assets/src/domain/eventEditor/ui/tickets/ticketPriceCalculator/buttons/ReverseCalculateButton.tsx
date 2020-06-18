import React from 'react';
import { __ } from '@wordpress/i18n';

import { IconButton } from '@application/ui/input';
import { DownCircleFilled, UpCircleFilled } from '@appDisplay/icons/svgs';

interface ReverseCalculateButtonProps {
	reverseCalculate: boolean;
	toggleCalcDir: VoidFunction;
}

const ReverseCalculateButton: React.FC<ReverseCalculateButtonProps> = ({ reverseCalculate, toggleCalcDir }) => {
	const calcDirIcon = reverseCalculate ? UpCircleFilled : DownCircleFilled;
	const calcDirTooltip = reverseCalculate
		? __(
				'Ticket base price is being reverse calculated from bottom to top starting with the ticket total. Entering a new ticket total will reverse calculate the ticket base price after applying all price modifiers in reverse. Click to turn off reverse calculations'
		  )
		: __(
				'Ticket total is being calculated normally from top to bottom starting from the base price. Entering a new ticket base price will recalculate the ticket total after applying all price modifiers. Click to turn on reverse calculations'
		  );

	return <IconButton icon={calcDirIcon} onClick={toggleCalcDir} tooltip={calcDirTooltip} />;
};

export default ReverseCalculateButton;
