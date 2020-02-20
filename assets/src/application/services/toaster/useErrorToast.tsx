import React, { useCallback } from 'react';
import { ApolloError } from 'apollo-client';
import { notification } from 'antd';
import Icon, { CloseCircleTwoTone, GlobalOutlined } from '@ant-design/icons';
import { ArgsProps } from 'antd/lib/notification';

import IconGraphQL from './IconGraphQL';
import { ErrorToast, ErrorToastCallback, ToasterMsg } from './types';

const useErrorToast: ErrorToast = (toaster, hash) =>
	useCallback<ErrorToastCallback>(
		({ message = '', placement = 'bottomRight', ...rest }) => {
			let icon = <CloseCircleTwoTone twoToneColor='var(--ee-color-accent)' />;

			let errorMessage: ToasterMsg;

			if (message instanceof ApolloError) {
				errorMessage = message.message;
				if (message.graphQLErrors) {
					icon = <Icon component={IconGraphQL} />;
				} else if (message.networkError) {
					icon = <GlobalOutlined />;
				}
			}

			const args: ArgsProps = {
				...rest,
				message: errorMessage || message,
				placement,
			};

			if (errorMessage) {
				notification.error({ ...args, icon });
			}
		},
		[toaster, hash]
	);

export default useErrorToast;
