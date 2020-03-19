import classNames from 'classnames';

import { EspressoDropdownMenuProps as Props } from './types';

export const mergeProps = (defaultProps: Props, props: Props) => {
	const mergedProps = {
		...defaultProps,
		...props,
	};

	if (props?.className && defaultProps?.className) {
		mergedProps.className = classNames(props?.className, defaultProps?.className);
	}

	return mergedProps;
};
