<?php

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_Event;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLInputField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;
use EventEspresso\core\domain\services\graphql\mutators\EventUpdate;

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
                esc_html__('Event Name', 'event_espresso')
            ),
            new GraphQLField(
                'desc',
                'String',
                'description',
                esc_html__('Event Description', 'event_espresso')
            ),
            new GraphQLField(
                'shortDesc',
                'String',
                'short_description',
                esc_html__('Event Short Description', 'event_espresso')
            ),
            new GraphQLField(
                'created',
                'String',
                'created',
                esc_html__('Date/Time Event Created', 'event_espresso')
            ),
            new GraphQLOutputField(
                'wpUser',
                'User',
                null,
                esc_html__('Event Creator', 'event_espresso')
            ),
            new GraphQLInputField(
                'wpUser',
                'Int',
                null,
                esc_html__('Event Creator ID', 'event_espresso')
            ),
            new GraphQLField(
                'order',
                'Int',
                'order',
                esc_html__('Event Menu Order', 'event_espresso')
            ),
            new GraphQLField(
                'displayDesc',
                'Boolean',
                'display_description',
                esc_html__('Display Description Flag', 'event_espresso')
            ),
            new GraphQLField(
                'displayTicketSelector',
                'Boolean',
                'display_ticket_selector',
                esc_html__('Display Ticket Selector Flag', 'event_espresso')
            ),
            new GraphQLField(
                'visibleOn',
                'String',
                'visible_on',
                esc_html__('Event Visible Date', 'event_espresso')
            ),
            new GraphQLField(
                'additionalLimit',
                'String',
                'additional_limit',
                esc_html__('Limit of Additional Registrations on Same Transaction', 'event_espresso')
            ),
            new GraphQLField(
                'phone',
                'String',
                'phone',
                esc_html__('Event Phone Number', 'event_espresso')
            ),
            new GraphQLField(
                'memberOnly',
                'Boolean',
                'member_only',
                esc_html__('Member-Only Event Flag', 'event_espresso')
            ),
            new GraphQLField(
                'allowOverflow',
                'Boolean',
                'allow_overflow',
                esc_html__('Allow Overflow on Event', 'event_espresso')
            ),
            new GraphQLField(
                'timezoneString',
                'String',
                'timezone_string',
                esc_html__('Timezone (name) for Event times', 'event_espresso')
            ),
            new GraphQLField(
                'externalUrl',
                'String',
                'external_url',
                esc_html__('URL of Event Page if hosted elsewhere', 'event_espresso')
            ),
            new GraphQLField(
                'donations',
                'Boolean',
                'donations',
                esc_html__('Accept Donations?', 'event_espresso')
            ),
            new GraphQLField(
                'isSoldOut',
                'Boolean',
                'is_sold_out',
                esc_html__(
                    'Flag indicating whether the tickets sold for the event, met or exceed the registration limit',
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'isPostponed',
                'Boolean',
                'is_postponed',
                esc_html__('Flag indicating whether the event is marked as postponed', 'event_espresso')
            ),
            new GraphQLField(
                'isCancelled',
                'Boolean',
                'is_cancelled',
                esc_html__('Flag indicating whether the event is marked as cancelled', 'event_espresso')
            ),
            new GraphQLField(
                'isUpcoming',
                'Boolean',
                'is_upcoming',
                esc_html__('Whether the event is upcoming', 'event_espresso')
            ),
            new GraphQLField(
                'isActive',
                'Boolean',
                'is_active',
                esc_html__('Flag indicating event is active', 'event_espresso')
            ),
            new GraphQLField(
                'isInactive',
                'Boolean',
                'is_inactive',
                esc_html__('Flag indicating event is inactive', 'event_espresso')
            ),
            new GraphQLField(
                'isExpired',
                'Boolean',
                'is_expired',
                esc_html__('Flag indicating event is expired or not', 'event_espresso')
            ),
        ];
    }


    /**
     * Extends the existing WP GraphQL mutations.
     *
     * @since $VID:$
     */
    public function extendMutations()
    {
        add_action(
            'graphql_post_object_mutation_update_additional_data',
            EventUpdate::mutateFields($this->model, $this),
            10,
            6
        );
    }
}
