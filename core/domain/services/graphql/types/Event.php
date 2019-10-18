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
     * @return GraphQLField[]
     * @since $VID:$
     */
    public function getFields()
    {
        return [
            new GraphQLField(
                'name',
                'name',
                'String',
                __('Event Name', 'event_espresso')
            ),
            new GraphQLField(
                'description',
                'desc',
                'String',
                __('Event Description', 'event_espresso')
            ),
            new GraphQLField(
                'short_description',
                'shortDesc',
                'String',
                __('Event Short Description', 'event_espresso')
            ),
            new GraphQLField(
                'created',
                'created',
                'String',
                __('Date/Time Event Created', 'event_espresso')
            ),
            new GraphQLField(
                'wpUser',
                'wpUser',
                'User',
                __('Event Creator', 'event_espresso')
            ),
            new GraphQLField(
                'order',
                'order',
                'Int',
                __('Event Menu Order', 'event_espresso')
            ),
            new GraphQLField(
                'display_description',
                'displayDesc',
                'Boolean',
                __('Display Description Flag', 'event_espresso')
            ),
            new GraphQLField(
                'display_ticket_selector',
                'displayTicketSelector',
                'Boolean',
                __('Display Ticket Selector Flag', 'event_espresso')
            ),
            new GraphQLField(
                'visible_on',
                'visibleOn',
                'String',
                __('Event Visible Date', 'event_espresso')
            ),
            new GraphQLField(
                'additional_limit',
                'additionalLimit',
                'String',
                __('Limit of Additional Registrations on Same Transaction', 'event_espresso')
            ),
            new GraphQLField(
                'phone',
                'phone',
                'String',
                __('Event Phone Number', 'event_espresso')
            ),
            new GraphQLField(
                'member_only',
                'memberOnly',
                'Boolean',
                __('Member-Only Event Flag', 'event_espresso')
            ),
            new GraphQLField(
                'allow_overflow',
                'allowOverflow',
                'Boolean',
                __('Allow Overflow on Event', 'event_espresso')
            ),
            new GraphQLField(
                'timezone_string',
                'timezoneString',
                'String',
                __('Timezone (name) for Event times', 'event_espresso')
            ),
            new GraphQLField(
                'external_url',
                'externalUrl',
                'String',
                __('URL of Event Page if hosted elsewhere', 'event_espresso')
            ),
            new GraphQLField(
                'donations',
                'donations',
                'Boolean',
                __('Accept Donations?', 'event_espresso')
            ),
            new GraphQLField(
                'is_sold_out',
                'isSoldOut',
                'Boolean',
                __('Flag indicating whether the tickets sold for the event, met or exceed the registration limit',
                    'event_espresso')
            ),
            new GraphQLField(
                'is_postponed',
                'isPostponed',
                'Boolean',
                __('Flag indicating whether the event is marked as postponed', 'event_espresso')
            ),
            new GraphQLField(
                'is_cancelled',
                'isCancelled',
                'Boolean',
                __('Flag indicating whether the event is marked as cancelled', 'event_espresso')
            ),
            new GraphQLField(
                'is_upcoming',
                'isUpcoming',
                'Boolean',
                __('Whether the event is upcoming', 'event_espresso')
            ),
            new GraphQLField(
                'is_active',
                'isActive',
                'Boolean',
                __('Flag indicating event is active', 'event_espresso')
            ),
            new GraphQLField(
                'is_inactive',
                'isInactive',
                'Boolean',
                __('Flag indicating event is inactive', 'event_espresso')
            ),
            new GraphQLField(
                'is_expired',
                'isExpired',
                'Boolean',
                __('Flag indicating event is expired or not', 'event_espresso')
            ),
        ];
    }
}