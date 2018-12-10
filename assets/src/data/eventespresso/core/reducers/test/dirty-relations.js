/**
 * External imports
 */
import deepFreeze from 'deep-freeze';
import { set } from 'lodash';

/**
 * Internal dependencies
 */
import {
	replaceOldRelationWithNewRelationId,
	removeRelatedEntitiesForEntity,
	dirtyRelations,
} from '../dirty-relations';
import { mockStateForTests } from '../../test/fixtures';
import { ACTION_TYPES } from '../../actions/action-types';

const { relations: types } = ACTION_TYPES;
