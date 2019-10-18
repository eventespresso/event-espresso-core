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
                'String',
                'name',
                __('Event Name', 'event_espresso')
            ),
            new GraphQLField(
                'desc',
                'String',
                'description',
                __('Event Description', 'event_espresso')
            ),
            new GraphQLField(
                'shortDesc',
                'String',
                'short_description',
                __('Event Short Description', 'event_espresso')
            ),
            new GraphQLField(
                'created',
                'String',
                'created',
                __('Date/Time Event Created', 'event_espresso')
            ),
            new GraphQLField(
                'wpUser',
                'User',
                null,
                __('Event Creator', 'event_espresso')
            ),
            new GraphQLField(
                'order',
                'Int',
                'order',
                __('Event Menu Order', 'event_espresso')
            ),
            new GraphQLField(
                'displayDesc',
                'Boolean',
                'display_description',
                __('Display Description Flag', 'event_espresso')
            ),
            new GraphQLField(
                'displayTicketSelector',
                'Boolean',
                'display_ticket_selector',
                __('Display Ticket Selector Flag', 'event_espresso')
            ),
            new GraphQLField(
                'visibleOn',
                'String',
                'visible_on',
                __('Event Visible Date', 'event_espresso')
            ),
            new GraphQLField(
                'additionalLimit',
                'String',
                'additional_limit',
                __('Limit of Additional Registrations on Same Transaction', 'event_espresso')
            ),
            new GraphQLField(
                'phone',
                'String',
                'phone',
                __('Event Phone Number', 'event_espresso')
            ),
            new GraphQLField(
                'memberOnly',
                'Boolean',
                'member_only',
                __('Member-Only Event Flag', 'event_espresso')
            ),
            new GraphQLField(
                'allowOverflow',
                'Boolean',
                'allow_overflow',
                __('Allow Overflow on Event', 'event_espresso')
            ),
            new GraphQLField(
                'timezoneString',
                'String',
                'timezone_string',
                __('Timezone (name) for Event times', 'event_espresso')
            ),
            new GraphQLField(
                'externalUrl',
                'String',
                'external_url',
                __('URL of Event Page if hosted elsewhere', 'event_espresso')
            ),
            new GraphQLField(
                'donations',
                'Boolean',
                'donations',
                __('Accept Donations?', 'event_espresso')
            ),
            new GraphQLField(
                'isSoldOut',
                'Boolean',
                'is_sold_out',
                __('Flag indicating whether the tickets sold for the event, met or exceed the registration limit',
                    'event_espresso')
            ),
            new GraphQLField(
                'isPostponed',
                'Boolean',
                'is_postponed',
                __('Flag indicating whether the event is marked as postponed', 'event_espresso')
            ),
            new GraphQLField(
                'isCancelled',
                'Boolean',
                'is_cancelled',
                __('Flag indicating whether the event is marked as cancelled', 'event_espresso')
            ),
            new GraphQLField(
                'isUpcoming',
                'Boolean',
                'is_upcoming',
                __('Whether the event is upcoming', 'event_espresso')
            ),
            new GraphQLField(
                'isActive',
                'Boolean',
                'is_active',
                __('Flag indicating event is active', 'event_espresso')
            ),
            new GraphQLField(
                'isInactive',
                'Boolean',
                'is_inactive',
                __('Flag indicating event is inactive', 'event_espresso')
            ),
            new GraphQLField(
                'isExpired',
                'Boolean',
                'is_expired',
                __('Flag indicating event is expired or not', 'event_espresso')
            ),
        ];
    }
}