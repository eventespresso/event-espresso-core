import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/core';
import { v4 as uuidv4 } from 'uuid';

// import { useToaster, UseToasterProps } from '@infraServices/toaster';
import useSystemNotifications from './useSystemNotifications';

// const options: UseToasterProps = {
// 	duration: 5000,
// 	position: 'bottom-right',
// };

const ManualToaster = (): JSX.Element => {
	const { error, info, loading, success, warning } = useSystemNotifications();

	const loadingNotice = (event: React.MouseEvent): void => {
		event.preventDefault();
		loading({ message: 'loading...', key: uuidv4(), loading: true });
	};

	const errorNotice = (event: React.MouseEvent): void => {
		event.preventDefault();
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

	return (
		<>
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
