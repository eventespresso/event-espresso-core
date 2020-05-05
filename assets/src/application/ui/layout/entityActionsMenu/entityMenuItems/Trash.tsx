import React, { useCallback, useRef } from 'react';
import { useDisclosure } from '@chakra-ui/core';
import { __ } from '@wordpress/i18n';

import { AlertDialog } from '@infraUI/display';
import { Button, ButtonType } from '@application/ui/input';
import { MenuItem } from '@infraUI/layout/menu';
import { MenuItemProps } from './types';
import { Trash as TrashIcon } from '@appDisplay/icons';

const Trash: React.FC<MenuItemProps> = ({ onClick, ...props }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();
	const onClickHandler = useCallback((onClick) => {
		if (typeof onClick === 'function') {
			onClick();
		}
		onClick();
		onClose();
	}, []);
	const title = props.title || __('trash');

	return (
		<MenuItem {...props} onClick={onOpen} role='menuitem'>
			<TrashIcon />
			<span>{title}</span>
			<AlertDialog
				cancelButton={<Button buttonText={__('No')} ref={cancelRef} onClick={onClose} />}
				header={__('Are you sure you want to delete this?')}
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				okButton={
					<Button buttonText={__('Yes')} buttonType={ButtonType.ACCENT} onClick={onClickHandler} ml={3} />
				}
				onClose={onClose}
			/>
		</MenuItem>
	);
};

export default Trash;
