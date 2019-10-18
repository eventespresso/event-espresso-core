<?php
/**
 *     Event Espresso
 *     Manage events, sell tickets, and receive payments from your WordPress website.
 *     Copyright (c) 2008-2019 Event Espresso  All Rights Reserved.
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_Datetime;
use EventEspresso\core\services\graphql\TypeBase;
use EventEspresso\core\domain\services\graphql\fields\GraphQLField;

/**
 * Class EventDate
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\types
 * @author  Brent Christensen
 * @since   $VID:$
 */
class Datetime extends TypeBase
{

    /**
     * EventDate constructor.
     *
     * @param EEM_Datetime $datetime_model
     */
    public function __construct(EEM_Datetime $datetime_model)
    {
        $this->model = $datetime_model;
        $this->setName('Datetime');
        $this->setDescription(__('An event date', 'event_espresso'));
        $this->setIsCustomPostType(false);
        parent::__construct();
    }


    /**
     * @return GraphQLField[]
     * @since $VID:$
     */
    public function getFields()
    {
        return [
            new GraphQLField(
                'id',
                ['non_null' => 'Int'],
                'ID',
                __('The datetime ID.', 'event_espresso')
            ),
            new GraphQLField(
                'name',
                'String',
                'name',
                __('Datetime Name', 'event_espresso')
            ),
            new GraphQLField(
                'description',
                'String',
                'description',
                __('Description for Datetime', 'event_espresso')
            ),
            new GraphQLField(
                'start',
                'String',
                'start',
                __('Start timestamp of Event', 'event_espresso')
            ),
            new GraphQLField(
                'startDate',
                'String',
                'start_date',
                __('Start time/date of Event', 'event_espresso')
            ),
            new GraphQLField(
                'end',
                'String',
                'end',
                __('End timestamp of Event', 'event_espresso')
            ),
            new GraphQLField(
                'endDate',
                'String',
                'end_date',
                __('End time/date of Event', 'event_espresso')
            ),
            new GraphQLField(
                'startTime',
                'String',
                'start_time',
                __('Start time of Event', 'event_espresso')
            ),
            new GraphQLField(
                'endTime',
                'String',
                'end_time',
                __('End time of Event', 'event_espresso')
            ),
            new GraphQLField(
                'capacity',
                'Int',
                'reg_limit',
                __('Registration Limit for this time', 'event_espresso'),
                [$this, 'parseInfiniteValue']
            ),
            new GraphQLField(
                'sold',
                'Int',
                'sold',
                __('How many sales for this Datetime that have occurred', 'event_espresso')
            ),
            new GraphQLField(
                'reserved',
                'Int',
                'reserved',
                __('Quantity of tickets reserved, but not yet fully purchased', 'event_espresso')
            ),
            new GraphQLField(
                'order',
                'Int',
                'order',
                __('The order in which the Datetime is displayed', 'event_espresso')
            ),
            new GraphQLField(
                'length',
                'Int',
                'length',
                __('The length of the event (start to end time) in seconds', 'event_espresso')
            ),
            new GraphQLField(
                'parent',
                'Datetime',
                null,
                __('The parent datetime of the current datetime', 'event_espresso')
            ),
            new GraphQLField(
                'isPrimary',
                'Boolean',
                'is_primary',
                __('Flag indicating datetime is primary one for event', 'event_espresso')
            ),
            new GraphQLField(
                'isSoldOut',
                'Boolean',
                'sold_out',
                __('Flag indicating whether the tickets sold for this datetime, met or exceed the registration limit',
                    'event_espresso')
            ),
            new GraphQLField(
                'isUpcoming',
                'Boolean',
                'is_upcoming',
                __('Whether the date is upcoming', 'event_espresso')
            ),
            new GraphQLField(
                'isActive',
                'Boolean',
                'is_active',
                __('Flag indicating datetime is active', 'event_espresso')
            ),
            new GraphQLField(
                'isExpired',
                'Boolean',
                'is_expired',
                __('Flag indicating datetime is expired or not', 'event_espresso')
            ),
            new GraphQLField(
                'event',
                'Event',
                null,
                __('Event of the datetime.', 'event_espresso')
            ),
        ];
    }
}