import React, { useCallback, useRef } from 'react';
import { useDisclosure } from '@chakra-ui/core';
import { __ } from '@wordpress/i18n';

import { AlertDialog } from '@infraUI/display';
import { Button, ButtonType } from '@application/ui/input';
import { DropdownMenu, DropdownToggleProps } from '@application/ui/layout';
import { isTrashed } from '@sharedServices/predicates';
import { useDatetimeItem } from '@edtrServices/apollo';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';

import CopyDate from './CopyDate';
import EditDate from './EditDate';
import TrashDate from './TrashDate';

import { DateMainMenuProps } from './types';

const DateMainMenu: React.FC<DateMainMenuProps> = ({ datetime: entity }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();
	// Make sure to subscribe to Apollo cache
	// to avoid stale data
	const datetime = useDatetimeItem({ id: entity.id });
	const { id } = datetime;
	const trashed = isTrashed(datetime);
	const { deleteEntity } = useDatetimeMutator(datetime.id);
	const onClickHandler = useCallback((onClick) => {
		if (typeof onClick === 'function') {
			onClick();
		}
		deleteEntity({ id, deletePermanently: trashed });
		onClose();
	}, []);

	const toggleProps: DropdownToggleProps = {
		tooltip: __('event date main menu'),
	};

	return (
		<>
			<DropdownMenu toggleProps={toggleProps}>
				<EditDate datetime={datetime} />
				<CopyDate datetime={datetime} />
				<TrashDate datetime={datetime} onClickHandler={onClickHandler} onOpen={onOpen} />
			</DropdownMenu>
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
		</>
	);
};

export default DateMainMenu;
