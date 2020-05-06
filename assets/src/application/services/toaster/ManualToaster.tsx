import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/core';
import { v4 as uuidv4 } from 'uuid';

import { toast } from 'react-toastify';

import useSystemNotifications from './useSystemNotifications';

const ManualToaster = (): JSX.Element => {
	const { error, info, loading, success, warning } = useSystemNotifications();

	const loadingNotice = (): void => {
		loading({ message: 'loading...', key: uuidv4(), loading: true });
	};

	const errorNotice = (): void => {
		error({ message: 'error!!!' });
	};

	const infoNotice = (event: React.MouseEvent): void => {
		event.preventDefault();
		const message = 'info: ' + uuidv4() + '\n' + uuidv4() + uuidv4();
		info({ message });
	};

	const successNotice = (event: React.MouseEvent): void => {
		event.preventDefault();
		success({ message: 'success' });
	};

	const warningNotice = (event: React.MouseEvent): void => {
		event.preventDefault();
		warning({ message: 'warning!!!' });
	};

	const toastId = React.useRef(null);

	const notify = () => (toastId.current = toast('Lorem ipsum dolor'));

	const dismiss = () => toast.dismiss(toastId.current);

	const dismissAll = () => toast.dismiss();

	return (
		<>
			<div>
				<button onClick={notify}>Notify</button>
				<button onClick={dismiss}>Dismiss</button>
				<button onClick={dismissAll}>Dismiss All</button>
			</div>
			<ButtonGroup spacing={4}>
				<Button variantColor='cyan' onClick={loadingNotice}>
					loading
				</Button>
				<Button variantColor='blue' onClick={infoNotice}>
					info
				</Button>
				<Button variantColor='green' onClick={successNotice}>
					success
				</Button>
				<Button variantColor='yellow' onClick={warningNotice}>
					warning
				</Button>
				<Button variantColor='red' onClick={errorNotice}>
					error
				</Button>
			</ButtonGroup>
			<br />
			<br />
		</>
	);
};

export default ManualToaster;
