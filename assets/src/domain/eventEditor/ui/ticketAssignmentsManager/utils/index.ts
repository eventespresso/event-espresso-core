import { equals, filter, pathOr, assocPath } from 'ramda';
import { parseISO } from 'date-fns';

import type { EntityId } from '@dataServices/types';
import type { AnyObject } from '@appServices/utilities/types';
import type { TAMPossibleRelation, TAMRelationEntity, TAMRelationalData, TAMRelationalEntity } from '../types';
import type { Datetime, Ticket } from '@edtrServices/apollo';
import type { OptionsType } from '@infraUI/inputs';
import sortDates from '@sharedEntities/datetimes/predicates/sorters';
import { parseInfinity, isInfinite } from '@application/services/utilities';

export type EntitiesToUpdate = Array<[EntityId, TAMPossibleRelation]>;

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

type TicketsWithQuantityArgs = {
	ticketsToUpdate: EntitiesToUpdate;
	existingData: TAMRelationalData;
	allDates: Array<Datetime>;
	allTickets: Array<Ticket>;
};

/**
 * Returns the tickets to quantity map of the tickets that need update
 */
export const ticketsWithNewQuantity = ({
	allDates,
	allTickets,
	existingData,
	ticketsToUpdate,
}: TicketsWithQuantityArgs): AnyObject<number> => {
	// create a map of date ids to capacities
	const dateIdToCapacityMap: AnyObject<number> = allDates.reduce(
		(acc, date) => assocPath([date.id], date.capacity, acc),
		{}
	);
	// create a map of ticket ids to quantities
	const ticketIdToQuantityMap: AnyObject<number> = allTickets.reduce(
		(acc, ticket) => assocPath([ticket.id], ticket.quantity, acc),
		{}
	);
	/**
	 * This becomes an object with key as ticket id and value as array of new date ids
	 * {
	 *     [ticket.id]: quantity
	 * }
	 */
	return ticketsToUpdate.reduce<AnyObject<number>>((acc, [ticketId, possibleRelation]) => {
		// These are the related date ids before TAM was launched
		const existingRelatedDateIds = existingData?.tickets?.[ticketId]?.datetimes || [];
		// These are the related date ids that have been assigned in TAM
		// these contain old and newly assigned date ids
		const allNewRelatedDateIds: Array<EntityId> = possibleRelation?.datetimes || [];

		// lets filter out the existing ones
		const newOnlyRelatedDateIds = allNewRelatedDateIds.filter(
			// it's new only if it was not in existing relations
			(dateId) => !existingRelatedDateIds.includes(dateId)
		);

		// lets convert the array of ids to array of corresponding capacities
		const newDateCapacities = newOnlyRelatedDateIds
			// get capacity from the above map and parse it as infinity
			.map((dateId) => parseInfinity(dateIdToCapacityMap?.[dateId], Infinity))
			// we don't need to update ticket quantity if date capacity is infinite
			.filter((capacity) => !isInfinite(capacity));

		// we need to set the ticket quantity to the minimum of all the capacities
		const minimumCapacity = Math.min(...newDateCapacities); // it will be Infinity for empty array

		// Make sure that the non negative ticket quantity value is compared with
		// a non negative datetime capacity value in Math.min()
		const nonNegativeTicketQuantity = parseInfinity(ticketIdToQuantityMap?.[ticketId], Infinity);

		// if capacity is infinite or it's more than ticket quantity
		if (isInfinite(minimumCapacity) || minimumCapacity >= nonNegativeTicketQuantity) {
			// no need to update the ticket quantity
			return acc;
		}

		// set the quantity to minimum capacity
		return assocPath([ticketId], minimumCapacity, acc);
	}, {});
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
