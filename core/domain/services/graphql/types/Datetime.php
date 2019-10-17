<?php
/**
 *     Event Espresso
 *     Manage events, sell tickets, and receive payments from your WordPress website.
 *     Copyright (c) 2008-2019 Event Espresso  All Rights Reserved.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
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
     * @return array
     * @since $VID:$
     */
    public function getFields()
    {
        return [
            new GraphQLField(
                'id',
                [
                    'key'         => 'ID',
                    'type'        => [
                        'non_null' => 'Int',
                    ],
                    'description' => __('The datetime ID.', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'name',
                [
                    'key'         => 'name',
                    'type'        => 'String',
                    'description' => __('Datetime Name', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'description',
                [
                    'key'         => 'description',
                    'type'        => 'String',
                    'description' => __('Description for Datetime', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'start',
                [
                    'key'         => 'start',
                    'type'        => 'String',
                    'description' => __('Start timestamp of Event', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'startDate',
                [
                    'key'         => 'start_date',
                    'type'        => 'String',
                    'description' => __('Start time/date of Event', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'end',
                [
                    'key'         => 'end',
                    'type'        => 'String',
                    'description' => __('End timestamp of Event', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'endDate',
                [
                    'key'         => 'end_date',
                    'type'        => 'String',
                    'description' => __('End time/date of Event', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'startTime',
                [
                    'key'         => 'start_time',
                    'type'        => 'String',
                    'description' => __('Start time of Event', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'endTime',
                [
                    'key'         => 'end_time',
                    'type'        => 'String',
                    'description' => __('End time of Event', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'capacity',
                [
                    'key'            => 'reg_limit',
                    'type'           => 'Int',
                    'description'    => __('Registration Limit for this time', 'event_espresso'),
                    'formatCallback' => [$this, 'parseInfiniteValue'],
                ]
            ),
            new GraphQLField(
                'sold',
                [
                    'key'         => 'sold',
                    'type'        => 'Int',
                    'description' => __('How many sales for this Datetime that have occurred', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'reserved',
                [
                    'key'         => 'reserved',
                    'type'        => 'Int',
                    'description' => __('Quantity of tickets reserved, but not yet fully purchased', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'order',
                [
                    'key'         => 'order',
                    'type'        => 'Int',
                    'description' => __('The order in which the Datetime is displayed', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'length',
                [
                    'key'         => 'length',
                    'type'        => 'Int',
                    'description' => __('The length of the event (start to end time) in seconds', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'parent',
                [
                    'type'        => 'Datetime',
                    'description' => __('The parent datetime of the current datetime', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'isPrimary',
                [
                    'key'         => 'is_primary',
                    'type'        => 'Boolean',
                    'description' => __('Flag indicating datetime is primary one for event', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'isSoldOut',
                [
                    'key'         => 'sold_out',
                    'type'        => 'Boolean',
                    'description' => __('Flag indicating whether the tickets sold for this datetime, met or exceed the registration limit', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'isUpcoming',
                [
                    'key'         => 'is_upcoming',
                    'type'        => 'Boolean',
                    'description' => __('Whether the date is upcoming', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'isActive',
                [
                    'key'         => 'is_active',
                    'type'        => 'Boolean',
                    'description' => __('Flag indicating datetime is active', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'isExpired',
                [
                    'key'         => 'is_expired',
                    'type'        => 'Boolean',
                    'description' => __('Flag indicating datetime is expired or not', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'event',
                [
                    'type'        => 'Event',
                    'description' => __('Event of the datetime.', 'event_espresso'),
                ]
            ),
        ];
    }
}