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
        $this->setGraphQLToModelMap([
            'name'                  => 'name',
            'desc'                  => 'description',
            'shortDesc'             => 'short_description',
            'created'               => 'created',
            'order'                 => 'order',
            'displayDesc'           => 'display_description',
            'displayTicketSelector' => 'display_ticket_selector',
            'visibleOn'             => 'visible_on',
            'additionalLimit'       => 'additional_limit',
            'phone'                 => 'phone',
            'memberOnly'            => 'member_only',
            'allowOverflow'         => 'allow_overflow',
            'timezoneString'        => 'timezone_string',
            'externalUrl'           => 'external_url',
            'donations'             => 'donations',
            'isSoldOut'             => 'is_sold_out',
            'isPostponed'           => 'is_postponed',
            'isCancelled'           => 'is_cancelled',
            'isUpcoming'            => 'is_upcoming',
            'isActive'              => 'is_active',
            'isInactive'            => 'is_inactive',
            'isExpired'             => 'is_expired',
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
            'name'                  => [
                'type'        => 'String',
                'description' => __('Event Name', 'event_espresso'),
            ],
            'desc'                  => [
                'type'        => 'String',
                'description' => __('Event Description', 'event_espresso'),
            ],
            'shortDesc'             => [
                'type'        => 'String',
                'description' => __('Event Short Description', 'event_espresso'),
            ],
            'created'               => [
                'type'        => 'String',
                'description' => __('Date/Time Event Created', 'event_espresso'),
            ],
            'wpUser'                => [
                'type'        => 'User',
                'description' => __('Event Creator', 'event_espresso'),
            ],
            'order'                 => [
                'type'        => 'Int',
                'description' => __('Event Menu Order', 'event_espresso'),
            ],
            'displayDesc'           => [
                'type'        => 'Boolean',
                'description' => __('Display Description Flag', 'event_espresso'),
            ],
            'displayTicketSelector' => [
                'type'        => 'Boolean',
                'description' => __('Display Ticket Selector Flag', 'event_espresso'),
            ],
            'visibleOn'             => [
                'type'        => 'String',
                'description' => __('Event Visible Date', 'event_espresso'),
            ],
            'additionalLimit'       => [
                'type'        => 'String',
                'description' => __('Limit of Additional Registrations on Same Transaction', 'event_espresso'),
            ],
            'phone'                 => [
                'type'        => 'String',
                'description' => __('Event Phone Number', 'event_espresso'),
            ],
            'memberOnly'            => [
                'type'        => 'Boolean',
                'description' => __('Member-Only Event Flag', 'event_espresso'),
            ],
            'allowOverflow'         => [
                'type'        => 'Boolean',
                'description' => __('Allow Overflow on Event', 'event_espresso'),
            ],
            'timezoneString'        => [
                'type'        => 'String',
                'description' => __('Timezone (name) for Event times', 'event_espresso'),
            ],
            'externalUrl'           => [
                'type'        => 'String',
                'description' => __('URL of Event Page if hosted elsewhere', 'event_espresso'),
            ],
            'donations'             => [
                'type'        => 'Boolean',
                'description' => __('Accept Donations?', 'event_espresso'),
            ],
            'isSoldOut'             => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating whether the tickets sold for the event, met or exceed the registration limit',
                    'event_espresso'),
            ],
            'isPostponed'           => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating whether the event is marked as postponed', 'event_espresso'),
            ],
            'isCancelled'           => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating whether the event is marked as cancelled', 'event_espresso'),
            ],
            'isUpcoming'            => [
                'type'        => 'Boolean',
                'description' => __('Whether the event is upcoming', 'event_espresso'),
            ],
            'isActive'              => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating event is active', 'event_espresso'),
            ],
            'isInactive'            => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating event is inactive', 'event_espresso'),
            ],
            'isExpired'             => [
                'type'        => 'Boolean',
                'description' => __('Flag indicating event is expired or not', 'event_espresso'),
            ],
        ];
    }
}