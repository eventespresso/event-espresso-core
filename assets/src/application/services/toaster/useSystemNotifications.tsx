import { useContext } from 'react';
import { SystemNotificationsToaster } from './types';

import { ToasterContext } from '../context/ToasterProvider';
import { Toasters } from './types';

const useSystemNotifications = (): SystemNotificationsToaster => {
	const { systemNotifications } = useContext<Toasters>(ToasterContext);
	return { ...systemNotifications };
};

export default useSystemNotifications;
