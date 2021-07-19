<?php

namespace EventEspresso\core\domain\services\graphql\types;

use EE_Event;
use EE_Venue;
use EEM_Event;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLInputField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;
use EventEspresso\core\domain\services\graphql\mutators\EventUpdate;
use GraphQLRelay\Relay;

/**
 * Class Event
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\types
 * @author  Manzoor Wani
 * @since   $VID:$
 * @property EEM_Event $model
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
        $this->setName($this->namespace . 'Event');
        $this->setIsCustomPostType(true);
        parent::__construct($event_model);
    }


    /**
     * @return GraphQLFieldInterface[]
     */
    public function getFields(): array
    {
        $fields = [
            new GraphQLField(
                'allowDonations',
                'Boolean',
                'donations',
                esc_html__('Accept Donations?', 'event_espresso')
            ),
            new GraphQLField(
                'allowOverflow',
                'Boolean',
                'allow_overflow',
                esc_html__('Enable Wait List for Event', 'event_espresso')
            ),
            new GraphQLField(
                'altRegPage',
                'String',
                'external_url',
                esc_html__('URL of Event Page if hosted elsewhere', 'event_espresso')
            ),
            new GraphQLOutputField(
                'cacheId',
                ['non_null' => 'String'],
                null,
                esc_html__('The cache ID of the object.', 'event_espresso')
            ),
            new GraphQLField(
                'created',
                'String',
                'created',
                esc_html__('Date/Time Event Created', 'event_espresso')
            ),
            new GraphQLOutputField(
                'dbId',
                ['non_null' => 'Int'],
                'ID',
                esc_html__('The event ID.', 'event_espresso')
            ),
            new GraphQLField(
                'defaultRegStatus',
                $this->namespace . 'RegistrationStatusEnum',
                'default_registration_status',
                esc_html__('Default Event Registration Status', 'event_espresso')
            ),
            new GraphQLField(
                'description',
                'String',
                'description',
                esc_html__('Event Description', 'event_espresso')
            ),
            new GraphQLField(
                'displayDescription',
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
            new GraphQLOutputField(
                'isActive',
                'Boolean',
                'is_active',
                esc_html__('Flag indicating event is active', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isCancelled',
                'Boolean',
                'is_cancelled',
                esc_html__('Flag indicating whether the event is marked as cancelled', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isExpired',
                'Boolean',
                'is_expired',
                esc_html__('Flag indicating event is expired or not', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isInactive',
                'Boolean',
                'is_inactive',
                esc_html__('Flag indicating event is inactive', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isPostponed',
                'Boolean',
                'is_postponed',
                esc_html__('Flag indicating whether the event is marked as postponed', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isSoldOut',
                'Boolean',
                'is_sold_out',
                esc_html__(
                    'Flag indicating whether the tickets sold for the event, met or exceed the registration limit',
                    'event_espresso'
                )
            ),
            new GraphQLOutputField(
                'isUpcoming',
                'Boolean',
                'is_upcoming',
                esc_html__('Whether the event is upcoming', 'event_espresso')
            ),
            new GraphQLInputField(
                'manager',
                'String',
                null,
                esc_html__('Globally unique event ID for the event manager', 'event_espresso')
            ),
            new GraphQLOutputField(
                'manager',
                'User',
                null,
                esc_html__('Event Manager', 'event_espresso')
            ),
            new GraphQLField(
                'maxRegistrations',
                'Int',
                'additional_limit',
                esc_html__('Limit of Additional Registrations on Same Transaction', 'event_espresso')
            ),
            new GraphQLField(
                'memberOnly',
                'Boolean',
                'member_only',
                esc_html__('Member-Only Event Flag', 'event_espresso')
            ),
            new GraphQLField(
                'name',
                'String',
                'name',
                esc_html__('Event Name', 'event_espresso')
            ),
            new GraphQLField(
                'order',
                'Int',
                'order',
                esc_html__('Event Menu Order', 'event_espresso')
            ),
            new GraphQLField(
                'phoneNumber',
                'String',
                'phone',
                esc_html__('Event Phone Number', 'event_espresso')
            ),
            new GraphQLField(
                'shortDescription',
                'String',
                'short_description',
                esc_html__('Event Short Description', 'event_espresso')
            ),
            new GraphQLField(
                'timezoneString',
                'String',
                'timezone_string',
                esc_html__('Timezone (name) for Event times', 'event_espresso')
            ),
            new GraphQLField(
                'visibleOn',
                'String',
                'visible_on',
                esc_html__('Event Visible Date', 'event_espresso')
            ),
            new GraphQLField(
                'venue',
                'String',
                null,
                esc_html__('Event venue ID', 'event_espresso'),
                null,
                function (EE_Event $source) {
                    $venues = $source->venues();
                    /** @var EE_Venue $venue */
                    $venue = reset($venues);
                    
                    return $venue instanceof EE_Venue
                    // Since venue is a CPT, $type will be 'post'
                    ? Relay::toGlobalId('post', $venue->ID())
                    : null;
                }
            ),
        ];

        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_types__event_fields',
            $fields,
            $this->name,
            $this->model
        );
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
