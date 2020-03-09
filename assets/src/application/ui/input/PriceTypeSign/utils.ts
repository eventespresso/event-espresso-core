export const getCurrencySignCharacterCountClassName = (sign: string): string | boolean => {
	return sign.length > 1 && 'ee-curSign-' + sign.length;
};

export const getCurrencySignPositionClassName = (signB4: boolean): string => {
	return signB4 ? ' ee-sign-before' : ' ee-sign-after';
};
