import { CurrencyProps } from '@application/valueObjects/config/types';

export interface MoneyFieldProps {
	children: React.ReactNode;
	className?: string;
	currency?: CurrencyProps;
	isPercent?: boolean;
}
