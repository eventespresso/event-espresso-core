import { Datetime } from '@edtrServices/apollo/types';

const statusBgColorClassName = (date: Datetime): string => {
	if (date.isTrashed) {
		return 'ee-status-background-color-DTT';
	}
	if (date.isExpired) {
		return 'ee-status-background-color-DTE';
	}
	if (date.isSoldOut) {
		return 'ee-status-background-color-DTS';
	}
	if (date.isActive) {
		return 'ee-status-background-color-DTA';
	}
	return 'ee-status-background-color-DTU';
};

export default statusBgColorClassName;
