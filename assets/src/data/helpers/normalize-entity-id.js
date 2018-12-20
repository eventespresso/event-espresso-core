/**
 * External imports
 */
import { toInteger } from 'lodash';
import cuid from 'cuid';

export const normalizeEntityId = id => cuid.isCuid( id ) ? id : toInteger( id );
