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
                'ID',
                'id',
                ['non_null' => 'Int'],
                __('The datetime ID.', 'event_espresso')
            ),
            new GraphQLField(
                'name',
                'name',
                'String',
                __('Datetime Name', 'event_espresso')
            ),
            new GraphQLField(
                'description',
                'description',
                'String',
                __('Description for Datetime', 'event_espresso')
            ),
            new GraphQLField(
                'start',
                'start',
                'String',
                __('Start timestamp of Event', 'event_espresso')
            ),
            new GraphQLField(
                'start_date',
                'startDate',
                'String',
                __('Start time/date of Event', 'event_espresso')
            ),
            new GraphQLField(
                'end',
                'end',
                'String',
                __('End timestamp of Event', 'event_espresso')
            ),
            new GraphQLField(
                'end_date',
                'endDate',
                'String',
                __('End time/date of Event', 'event_espresso')
            ),
            new GraphQLField(
                'start_time',
                'startTime',
                'String',
                __('Start time of Event', 'event_espresso')
            ),
            new GraphQLField(
                'end_time',
                'endTime',
                'String',
                __('End time of Event', 'event_espresso')
            ),
            new GraphQLField(
                'reg_limit',
                'capacity',
                'Int',
                __('Registration Limit for this time', 'event_espresso'),
                [$this, 'parseInfiniteValue']
            ),
            new GraphQLField(
                'sold',
                'sold',
                'Int',
                __('How many sales for this Datetime that have occurred', 'event_espresso')
            ),
            new GraphQLField(
                'reserved',
                'reserved',
                'Int',
                __('Quantity of tickets reserved, but not yet fully purchased', 'event_espresso')
            ),
            new GraphQLField(
                'order',
                'order',
                'Int',
                __('The order in which the Datetime is displayed', 'event_espresso')
            ),
            new GraphQLField(
                'length',
                'length',
                'Int',
                __('The length of the event (start to end time) in seconds', 'event_espresso')
            ),
            new GraphQLField(
                'parent',
                'Datetime',
                'String',
                __('The parent datetime of the current datetime', 'event_espresso')
            ),
            new GraphQLField(
                'is_primary',
                'isPrimary',
                'Boolean',
                __('Flag indicating datetime is primary one for event', 'event_espresso')
            ),
            new GraphQLField(
                'sold_out',
                'isSoldOut',
                'Boolean',
                __('Flag indicating whether the tickets sold for this datetime, met or exceed the registration limit',
                    'event_espresso')
            ),
            new GraphQLField(
                'is_upcoming',
                'isUpcoming',
                'Boolean',
                __('Whether the date is upcoming', 'event_espresso')
            ),
            new GraphQLField(
                'is_active',
                'isActive',
                'Boolean',
                __('Flag indicating datetime is active', 'event_espresso')
            ),
            new GraphQLField(
                'is_expired',
                'isExpired',
                'Boolean',
                __('Flag indicating datetime is expired or not', 'event_espresso')
            ),
            new GraphQLField(
                'event',
                'event',
                'Event',
                __('Event of the datetime.', 'event_espresso')
            ),
        ];
    }
}