import { CurrencyProps } from '@application/valueObjects/config/types';

export interface MoneyFieldProps {
	children: React.ReactNode;
	currency?: CurrencyProps;
	isPercent?: boolean;
}
