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

use EEM_Event;
use EventEspresso\core\services\graphql\TypeBase;
use EventEspresso\core\domain\services\graphql\fields\GraphQLField;

/**
 * Class Event
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\types
 * @author  Brent Christensen
 * @since   $VID:$
 */
class Event extends TypeBase
{

    /**
     * Event constructor.
     *
     * @param EEM_Event $event_model
     */
    public function __construct(EEM_Event $event_model)
    {
        $this->model = $event_model;
        $this->setName('Event');
        $this->setIsCustomPostType(true);

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
                'name',
                [
                    'key'         => 'name',
                    'type'        => 'String',
                    'description' => __('Event Name', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'desc',
                [
                    'key'         => 'description',
                    'type'        => 'String',
                    'description' => __('Event Description', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'shortDesc',
                [
                    'key'         => 'short_description',
                    'type'        => 'String',
                    'description' => __('Event Short Description', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'created',
                [
                    'key'         => 'created',
                    'type'        => 'String',
                    'description' => __('Date/Time Event Created', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'wpUser',
                [
                    'type'        => 'User',
                    'description' => __('Event Creator', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'order',
                [
                    'key'         => 'order',
                    'type'        => 'Int',
                    'description' => __('Event Menu Order', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'displayDesc',
                [
                    'key'         => 'display_description',
                    'type'        => 'Boolean',
                    'description' => __('Display Description Flag', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'displayTicketSelector',
                [
                    'key'         => 'display_ticket_selector',
                    'type'        => 'Boolean',
                    'description' => __('Display Ticket Selector Flag', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'visibleOn',
                [
                    'key'         => 'visible_on',
                    'type'        => 'String',
                    'description' => __('Event Visible Date', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'additionalLimit',
                [
                    'key'         => 'additional_limit',
                    'type'        => 'String',
                    'description' => __('Limit of Additional Registrations on Same Transaction', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'phone',
                [
                    'key'         => 'phone',
                    'type'        => 'String',
                    'description' => __('Event Phone Number', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'memberOnly',
                [
                    'key'         => 'member_only',
                    'type'        => 'Boolean',
                    'description' => __('Member-Only Event Flag', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'allowOverflow',
                [
                    'key'         => 'allow_overflow',
                    'type'        => 'Boolean',
                    'description' => __('Allow Overflow on Event', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'timezoneString',
                [
                    'key'         => 'timezone_string',
                    'type'        => 'String',
                    'description' => __('Timezone (name) for Event times', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'externalUrl',
                [
                    'key'         => 'external_url',
                    'type'        => 'String',
                    'description' => __('URL of Event Page if hosted elsewhere', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'donations',
                [
                    'key'         => 'donations',
                    'type'        => 'Boolean',
                    'description' => __('Accept Donations?', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'isSoldOut',
                [
                    'key'         => 'is_sold_out',
                    'type'        => 'Boolean',
                    'description' => __('Flag indicating whether the tickets sold for the event, met or exceed the registration limit', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'isPostponed',
                [
                    'key'         => 'is_postponed',
                    'type'        => 'Boolean',
                    'description' => __('Flag indicating whether the event is marked as postponed', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'isCancelled',
                [
                    'key'         => 'is_cancelled',
                    'type'        => 'Boolean',
                    'description' => __('Flag indicating whether the event is marked as cancelled', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'isUpcoming',
                [
                    'key'         => 'is_upcoming',
                    'type'        => 'Boolean',
                    'description' => __('Whether the event is upcoming', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'isActive',
                [
                    'key'         => 'is_active',
                    'type'        => 'Boolean',
                    'description' => __('Flag indicating event is active', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'isInactive',
                [
                    'key'         => 'is_inactive',
                    'type'        => 'Boolean',
                    'description' => __('Flag indicating event is inactive', 'event_espresso'),
                ]
            ),
            new GraphQLField(
                'isExpired',
                [
                    'key'         => 'is_expired',
                    'type'        => 'Boolean',
                    'description' => __('Flag indicating event is expired or not', 'event_espresso'),
                ]
            ),
        ];
    }
}