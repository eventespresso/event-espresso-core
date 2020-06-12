import React, { useRef } from 'react';
import { FormSpy } from 'react-final-form';

import { Datetime, Ticket } from '@edtrServices/apollo';
import { BaseProps } from '@edtrUI/ticketAssignmentsManager';
import { useMemoStringify, useTimeZoneTime, useMemoLazy } from '@application/services/hooks';
import { processDateAndTime } from '@sharedServices/utils/dateAndTime';
/**
 * This HOC provides the current entity detail to the underlying component
 * in multi-step form by subscribing to RFF.
 */
const withEntityFormDetails = <T extends Datetime | Ticket>(
	Component: React.ComponentType<Partial<BaseProps<T>>>,
	newEntityId: string
): JSX.Element => {
	const { siteTimeToUtc } = useTimeZoneTime();

    const lazyMemo = useMemoLazy<T>(null);
    // We only need value here.
	const subscription = useMemoStringify({ values: true });
	return (
		<FormSpy subscription={subscription}>
			{({ values: { dateTime, ...values } }) => {
				const entity = lazyMemo({
					...values,
                    id: values.id ?? newEntityId,
                    dbId: values.dbId ?? 0,
					...processDateAndTime(dateTime, siteTimeToUtc),
				} as T);

				return <Component entity={entity} />;
			}}
		</FormSpy>
	);
};

export default withEntityFormDetails;
