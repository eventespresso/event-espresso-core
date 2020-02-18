import React from 'react';
import { Icon, notification } from 'antd';
import { ApolloError } from 'apollo-client';

import IconGraphQL from './IconGraphQL';
import { ToasterMsg } from '../types';

const error = ({ message, ...args }): void => {
	let icon = <Icon type='close-circle' theme='twoTone' twoToneColor='#eb2f96' />;

	let errorMessage: ToasterMsg;

	if (message instanceof ApolloError) {
		errorMessage = message.message;
		if (message.graphQLErrors) {
			icon = IconGraphQL;
		} else if (message.networkError) {
			icon = 'globe-network';
		} else {
			icon = 'layout-auto';
		}
	} else {
		errorMessage = message;
	}

	if (errorMessage) {
		notification.open({ ...args, icon, message: errorMessage });
	}
};

export default error;
