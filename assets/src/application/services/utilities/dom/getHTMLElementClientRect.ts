const getHTMLElementClientRect = (element: HTMLElement): ClientRect => {
	if (!element) {
		return {
			bottom: 0,
			height: 0,
			left: 0,
			right: 0,
			top: 0,
			width: 0,
		};
	}
	return element.getBoundingClientRect();
};

export default getHTMLElementClientRect;
