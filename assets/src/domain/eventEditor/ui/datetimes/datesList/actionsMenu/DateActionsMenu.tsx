import React from 'react';

import { ActionsMenuComponentProps, EntityActionsMenu } from '@appLayout/entityActionsMenu';
import useDatesActionMenuItems from '../../hooks/useDatesActionMenuItems';
import { Datetime } from '@edtrServices/apollo/types';
import { getPropsAreEqual } from '@appServices/utilities';

const DateActionsMenu: React.FC<ActionsMenuComponentProps<Datetime>> = ({ entity, ...props }) => {
	const menuItems = useDatesActionMenuItems(entity);

	return <EntityActionsMenu {...props} menuItems={menuItems} />;
};

export default React.memo(DateActionsMenu, getPropsAreEqual(['entity', 'cacheId']));
