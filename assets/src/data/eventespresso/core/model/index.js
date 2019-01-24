import * as entityActions from './entity-actions';
import * as entityResolvers from './entity-resolvers';
import * as entitySelectors from './entity-selectors';
import * as relationActions from './relation-actions';
import * as relationSelectors from './relation-selectors';
import * as baseSelectors from '../selectors';
import * as baseActions from '../actions';
import * as baseResolvers from '../resolvers';

export const selectors = {
	...entitySelectors.createSelectors( baseSelectors ),
	...relationSelectors.createSelectors( baseSelectors ),
};

export const actions = {
	...entityActions.createActions( baseActions ),
	...relationActions.createActions( baseActions ),
};

export const resolvers = {
	...entityResolvers.createResolvers( baseResolvers ),
};
