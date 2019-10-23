<?php

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_Event;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLInputField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;

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
     * @return GraphQLFieldInterface[]
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
            new GraphQLOutputField(
                'wpUser',
                'User',
                null,
                __('Event Creator', 'event_espresso')
            ),
            new GraphQLInputField(
                'wpUser',
                'Int',
                null,
                __('Event Creator ID', 'event_espresso')
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