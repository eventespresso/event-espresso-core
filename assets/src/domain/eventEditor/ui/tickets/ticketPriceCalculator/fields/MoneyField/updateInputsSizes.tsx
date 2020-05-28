interface updatedPercentSignInputProps {
	beforeWidth: number;
	inputWidth: number;
	signB4: boolean;
}

const updatedPercentSignInput = ({ beforeWidth, inputWidth, signB4 }: updatedPercentSignInputProps): void => {
	document
		.querySelectorAll('.ee-money-field--with-percent-sign .ee-input__price-field')
		.forEach((element: HTMLElement) => {
			if (signB4) {
				element.style.marginLeft = `${beforeWidth}px`;
			}

			element.style.width = `${inputWidth}px`;
		});
};

interface updateInputsSizesProps {
	isPercent: boolean;
	signB4: boolean;
}

const updateInputsSizes = ({ isPercent, signB4 }: updateInputsSizesProps): void => {
	if (isPercent) {
		const currency = document.getElementsByClassName('ee-money-field--with-currency-sign')[0];

		if (currency) {
			const after = currency.getElementsByClassName('ee-money-field__after')[0]?.getBoundingClientRect();
			const before = currency.getElementsByClassName('ee-money-field__before')[0]?.getBoundingClientRect();
			const input = currency.getElementsByClassName('ee-input__price-field')[0]?.getBoundingClientRect();
			const labelWidth = after?.width ?? before?.width;

			updatedPercentSignInput({ beforeWidth: labelWidth, inputWidth: input?.width, signB4 });
		}
	}
};

export default updateInputsSizes;
