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
        $this->setGraphQLToModelMap([
            'id'          => 'ID',
            'name'        => 'name',
            'description' => 'description',
            'start'       => 'start',
            'startDate'   => 'start_date',
            'end'         => 'end',
            'endDate'     => 'end_date',
            'startTime'   => 'start_time',
            'endTime'     => 'end_time',
            'sold'        => 'sold',
            'reserved'    => 'reserved',
            'order'       => 'order',
            'length'      => 'length',
            'isPrimary'   => 'is_primary',
            'isSoldOut'   => 'sold_out',
            'isUpcoming'  => 'is_upcoming',
            'isActive'    => 'is_active',
            'isExpired'   => 'is_expired',
        ]);
        $this->setFields($this->getFields());
    }


    /**
     * @return array
     * @since $VID:$
     */
    public static function getFieldDefinitions()
    {
        return [
            'id'          => [
                'type'        => [
                    'non_null' => 'Int',
                ],
                'description' => __('The datetime ID.', 'event_espresso'),
            ],
            'name'        => [
                'type'        => 'String',
                'description' => __('Datetime Name', 'event_espresso'),
            ],
            'description' => [
                'type'        => 'String',
                'description' => __('Description for Datetime', 'event_espresso'),
            ],
            'start'       => [
                'type'        => 'String',
                'description' => __('Start timestamp of Event', 'event_espresso'),
            ],
            'startDate'   => [
                'type'        => 'String',
                'description' => __('Start time/date of Event', 'event_espresso'),
            ],
            'end'         => [
                'type'        => 'String',
                'description' => __('End timestamp of Event', 'event_espresso'),
            ],
            'endDate'     => [
                'type'        => 'String',
                'description' => __('End time/date of Event', 'event_espresso'),
            ],
            'startTime'   => [
                'type'        => 'String',
                'description' => __('Start time of Event', 'event_espresso'),
            ],
            'endTime'     => [
                'type'        => 'String',
                'description' => __('End time of Event', 'event_espresso'),
            ],
            'capacity'    => [
                'type'        => 'Int',
                'description' => __('Registration Limit for this time', 'event_espresso'),
            ],
            'sold'        => [
                'type'        => 'Int',
                'description' => __('How many sales for this Datetime that have occurred', 'event_espresso'),
            ],
            'reserved'    => [
                'type'        => 'Int',
                'description' => __('Quantity of tickets reserved, but not yet fully purchased', 'event_espresso'),
            ],
            'order'       => [
                'type'        => 'Int',
                'description' => __('The order in which the Datetime is displayed', 'event_espresso'),
            ],
            'length'      => [
                'type'        => 'Int',
                'description' => __('The length of the event (start to end time) in seconds', 'event_espresso'),
            ],
            'parent'      => [
                'type'        => 'Datetime',
                'description' => __('The parent datetime of the current datetime', 'event_espresso'),
            ],
            'isPrimary'   => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating datetime is primary one for event', 'event_espresso'),
            ],
            'isSoldOut'   => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating whether the tickets sold for this datetime, met or exceed the registration limit',
                    'event_espresso'),
            ],
            'isUpcoming'  => [
                'type'        => 'Boolean',
                'description' => __('Whether the date is upcoming', 'event_espresso'),
            ],
            'isActive'    => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating datetime is active', 'event_espresso'),
            ],
            'isExpired'   => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating datetime is expired or not', 'event_espresso'),
            ],
            'event'       => [
                'type'        => 'Event',
                'description' => __('Event of the datetime.', 'event_espresso'),
            ],
        ];
    }
}