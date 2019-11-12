/**
 * External imports
 */
import * as dateFormats from '@eventespresso/helpers';
import { isEmpty } from 'lodash';

/**
 * Formats the date fields on provided entities.  Does not mutate original
 * entities.
 *
 * @param { Array } entities  An array of entity objects
 * @param { Array } entityDateFields  An array of field names that are date
 *   fields.
 * @param { string } format  The format to transform the date field values to.
 * @param { boolean } local      Whether or not to convert the date field value
 *   to the local timezone for the host.
 * @return { Array }  Returns a new array of new entities with the date field
 *   values formatted
 */
export const formatDatesOnEntities = (
	entities = [],
	entityDateFields = [],
	format = dateFormats.DATE_TIME_FORMAT_ISO8601,
	local = true,
) => {
	if ( isEmpty( entities ) || isEmpty( entityDateFields ) ) {
		return entities;
	}
	const formattedEntities = [];
	entities.forEach( ( entity ) => {
		formattedEntities.push( formatDatesOnEntity(
			entity,
			entityDateFields,
			format,
			local,
		) );
	} );
	return formattedEntities;
};

/**
 * Formats the date fields on the provided entity.  Does not mutate original
 * entity.
 *
 * @param { Object } entity  An entity
 * @param { Array } entityDateFields  An array of field names that are date
 *   fields.
 * @param { string } format  The format to transform the date field values to.
 * @param { boolean } local      Whether or not to convert the date field value
 *   to the local timezone for the host.
 * @return { Object }  Returns a new entity with the date field values formatted
 */
export const formatDatesOnEntity = (
	entity = {},
	entityDateFields = [],
	format = dateFormats.DATE_TIME_FORMAT_ISO8601,
	local = true,
) => {
	const newEntity = { ...entity };
	entityDateFields.forEach( ( dateField ) => {
		if ( newEntity[ dateField ] ) {
			newEntity[ dateField ] = dateFormats.formatDateString(
				newEntity[ dateField ],
				format,
				local,
			);
		}
	} );
	return newEntity;
};

/**
 * Formats the date fields to mysql format on provided entities.  Does not
 * mutate original entities.
 *
 * @param { Array } entities  An array of entity objects
 * @param { Array } entityDateFields  An array of field names that are date
 *   fields.
 * @param { boolean } local      Whether or not to convert the date field value
 *   to the local timezone for the host.
 * @return { Array }  Returns a new array of new entities with the date field
 *   values formatted
 */
export const formatEntitiesDatesToMysql = (
	entities = [],
	entityDateFields = [],
	local = true,
) => {
	return formatDatesOnEntities(
		entities,
		entityDateFields,
		dateFormats.DATE_TIME_FORMAT_MYSQL,
		local,
	);
};

/**
 * Formats the date fields to mysql format on provided entity.  Does not
 * mutate original entity.
 *
 * @param { Object } entity  An array of entity objects
 * @param { Array } entityDateFields  An array of field names that are date
 *   fields.
 * @param { boolean } local      Whether or not to convert the date field value
 *   to the local timezone for the host.
 * @return { Object }  Returns a new entity with the date field values formatted
 */
export const formatEntityDatesToMysql = (
	entity = {},
	entityDateFields = [],
	local = true,
) => {
	return formatDatesOnEntity(
		entity,
		entityDateFields,
		dateFormats.DATE_TIME_FORMAT_MYSQL,
		local,
	);
};

/**
 * Formats the date fields to the site format on provided entities.  Does not
 * mutate original entities.
 *
 * @param { Array } entities  An array of entity objects
 * @param { Array } entityDateFields  An array of field names that are date
 *   fields.
 * @param { boolean } local      Whether or not to convert the date field value
 *   to the local timezone for the host.
 * @return { Array }  Returns a new array of new entities with the date field
 *   values formatted
 */
export const formatEntitiesDatesToSite = (
	entities = [],
	entityDateFields = [],
	local = true,
) => {
	return formatDatesOnEntities(
		entities,
		entityDateFields,
		dateFormats.DATE_TIME_FORMAT_SITE,
		local,
	);
};

/**
 * Formats the date fields to the site format on provided entity.  Does not
 * mutate original entity.
 *
 * @param { Object } entity  An array of entity objects
 * @param { Array } entityDateFields  An array of field names that are date
 *   fields.
 * @param { boolean } local      Whether or not to convert the date field value
 *   to the local timezone for the host.
 * @return { Object }  Returns a new entity with the date field values formatted
 */
export const formatEntityDatesToSite = (
	entity = {},
	entityDateFields = [],
	local = true,
) => {
	return formatDatesOnEntity(
		entity,
		entityDateFields,
		dateFormats.DATE_TIME_FORMAT_SITE,
		local,
	);
};

/**
 * Converts date field values to moment objects for the provided entities.
 * Does not mutate original entities.
 *
 * @param { Array } entities An array of entity objects
 * @param { Array } entityDateFields An array of field names that are date
 *   fields.
 * @return { Array } Returns a new array of new entities with the date field
 *   values converted to moment objects.
 */
export const convertEntitiesDatesToMoment = (
	entities = [],
	entityDateFields = [],
) => {
	if ( isEmpty( entities ) || isEmpty( entityDateFields ) ) {
		return entities;
	}
	const formattedEntities = [];
	entities.forEach( ( entity ) => {
		formattedEntities.push( convertEntityDatesToMoment(
			entity,
			entityDateFields,
		) );
	} );
	return formattedEntities;
};

/**
 * Converts date field values to moment objects for the provided entity.
 * Does not mutate original entity.
 *
 * @param { Object } entity An entity.
 * @param { Array } entityDateFields An array of field names that are date
 *   fields.
 * @return { Object } Returns a new entity with the date field values converted
 *   to moment objects.
 */
export const convertEntityDatesToMoment = (
	entity = {},
	entityDateFields = [],
) => {
	const newEntity = { ...entity };
	entityDateFields.forEach( ( dateField ) => {
		if ( newEntity[ dateField ] ) {
			newEntity[ dateField ] = dateFormats.stringToMoment(
				newEntity[ dateField ],
			);
		}
	} );
	return newEntity;
};
