import { equals, filter, isEmpty, pathOr } from 'ramda';
import { parseISO } from 'date-fns';

import { EntityId } from '@dataServices/types';
import { AnyObject } from '@appServices/utilities/types';
import { TAMPossibleRelation, TAMRelationEntity, TAMRelationalData, TAMRelationalEntity } from './types';
import { Datetime } from '@edtrServices/apollo';
import { OptionsType } from '@infraUI/inputs';
import sortDates from '@sharedEntities/datetimes/predicates/sorters';
import activeUpcoming from '@sharedEntities/datetimes/predicates/filters/activeUpcoming';

type EntitiesToUpdate = Array<[EntityId, TAMPossibleRelation]>;

interface EntitiesForUpdateOptions<Entity extends TAMRelationEntity> {
	entity: Entity;
	existingData: TAMRelationalData;
	newData: TAMRelationalData;
	relation: Exclude<TAMRelationEntity, Entity>;
}

export const prepareEntitiesForUpdate = <Entity extends TAMRelationEntity>({
	entity,
	existingData,
	newData,
	relation,
}: EntitiesForUpdateOptions<Entity>): EntitiesToUpdate => {
	const existingEntities = pathOr<TAMRelationalEntity>({}, [entity], existingData);
	const newEntities = pathOr<TAMRelationalEntity>({}, [entity], newData);

	return filter<EntitiesToUpdate[0]>(([entityId, possibleRelation]) => {
		const newRelatedEntities = pathOr<EntityId[]>([], [relation], possibleRelation);
		const oldRelatedEntities = pathOr<EntityId[]>([], [entityId, relation], existingEntities);
		// make sure to sort them before compare
		// to make sure that they are actually different
		return !equals(newRelatedEntities.sort(), oldRelatedEntities.sort());
	}, Object.entries(newEntities));
};

/**
 * e.g
 * {
 *     2019: {
 *         9: 'October',
 *         10: 'November',
 *         11: 'December',
 *     },
 *     2020: {
 *         0: 'Januray',
 *         1: 'February',
 *         2: 'March',
 *         3: 'April',
 *     },
 * }
 */
type YearWiseMonths = AnyObject<AnyObject<string>>;

const getYearWiseMonthsFromDates = (dates: Array<Datetime>): YearWiseMonths => {
	const sortedDates = sortDates({ dates });

	const yearWiseMonths = sortedDates.reduce<YearWiseMonths>((acc, { startDate }) => {
		const parsedDate = parseISO(startDate);
		const year = parsedDate.getFullYear();
		const month = parsedDate.getMonth();

		const monthsInTheYear = acc[year] || {};
		if (!(month in monthsInTheYear)) {
			monthsInTheYear[month] = parsedDate.toLocaleString('default', { month: 'long' });

			acc[year] = monthsInTheYear;
		}
		return acc;
	}, {});

	return yearWiseMonths;
};

export const getMonthsListFromDatetimes = (dates: Array<Datetime>): OptionsType => {
	const yearWiseMonths = getYearWiseMonthsFromDates(dates);

	const list = Object.entries(yearWiseMonths).map(([year, months]) => {
		return {
			key: year,
			label: year,
			options: Object.entries(months).map(([monthNumber, monthName]) => {
				return {
					key: `${year}:${monthNumber}`,
					label: monthName,
					value: `${year}:${monthNumber}`,
				};
			}),
		};
	});

	return list;
};

export const getYearMonthForNextDate = (dates: Array<Datetime>): string => {
	const yearWiseMonths = getYearWiseMonthsFromDates(activeUpcoming(dates));

	if (!isEmpty(yearWiseMonths)) {
		const firstYear = Number(Object.keys(yearWiseMonths)[0]);
		const firstYearMonths = yearWiseMonths[firstYear];
		const firstMonth = Number(Object.keys(firstYearMonths)[0]);

		return `${firstYear}:${firstMonth}`;
	}

	return '';
};
