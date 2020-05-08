import React, { createContext } from 'react';

import useSystemNotificationsManager from '../toaster/useSystemNotificationsManager';
import { SystemNotificationsToaster } from '../toaster/types';
import { useRenderToaster } from '@appServices/toaster';

const ToasterContext = createContext(null);

export type Toasters = {
	systemNotifications: SystemNotificationsToaster;
};

const ToasterProvider: React.FC = (props) => {
	const systemNotifications = useSystemNotificationsManager();
	const toasters: Toasters = { systemNotifications };
	useRenderToaster(systemNotifications.getToasts);
	return <ToasterContext.Provider value={toasters}>{props.children}</ToasterContext.Provider>;
};

export { ToasterContext, ToasterProvider };
