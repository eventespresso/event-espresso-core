<?php

namespace EventEspresso\core\domain\services\graphql\data\mutations;

use DateTime;
use EE_Error;
use EE_Event;
use Exception;
use GraphQLRelay\Relay;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class EventMutation
 *
 * @package       Event Espresso
 * @author        Manzoor Wani
 */
class EventMutation
{

    /**
     * Maps the GraphQL input to a format that the model functions can use
     *
     * @param array  $input         Data coming from the GraphQL mutation query input
     * @return array
     * @throws Exception
     */
    public static function prepareFields(array $input): array
    {
        $args = [];

        if (array_key_exists('allowDonations', $input)) {
            $args['EVT_donations'] = filter_var($input['allowDonations'], FILTER_VALIDATE_BOOLEAN);
        }

        if (array_key_exists('allowOverflow', $input)) {
            $args['EVT_allow_overflow'] = filter_var($input['allowOverflow'], FILTER_VALIDATE_BOOLEAN);
        }

        if (array_key_exists('altRegPage', $input)) {
            $args['EVT_external_URL'] = sanitize_text_field($input['altRegPage']);
        }

        if (! empty($input['defaultRegStatus'])) {
            $args['EVT_default_registration_status'] = sanitize_text_field($input['defaultRegStatus']);
        }

        if (! empty($input['description'])) {
            $args['EVT_desc'] = sanitize_post_field('post_content', $input['description'], null, 'db');
        }

        if (array_key_exists('displayDescription', $input)) {
            $args['EVT_display_desc'] = filter_var($input['displayDescription'], FILTER_VALIDATE_BOOLEAN);
        }

        if (array_key_exists('displayTicketSelector', $input)) {
            $args['EVT_display_ticket_selector'] = filter_var($input['displayTicketSelector'], FILTER_VALIDATE_BOOLEAN);
        }

        if (! empty($input['maxRegistrations'])) {
            $args['EVT_additional_limit'] = absint($input['maxRegistrations']);
        }

        if (array_key_exists('memberOnly', $input)) {
            $args['EVT_member_only'] = filter_var($input['memberOnly'], FILTER_VALIDATE_BOOLEAN);
        }

        if (! empty($input['name'])) {
            $args['EVT_name'] = sanitize_text_field($input['name']);
        }

        if (array_key_exists('order', $input)) {
            $args['EVT_order'] = absint($input['order']);
        }

        if (array_key_exists('phoneNumber', $input)) {
            $args['EVT_phone'] = sanitize_text_field($input['phoneNumber']);
        }

        if (array_key_exists('shortDescription', $input)) {
            $args['EVT_short_desc'] = sanitize_post_field('post_excerpt', $input['shortDescription'], null, 'db');
        }

        if (array_key_exists('timezoneString', $input)) {
            $args['EVT_timezone_string'] = sanitize_text_field($input['timezoneString']);
        }

        if (! empty($input['visibleOn'])) {
            $args['EVT_visible_on'] = new DateTime(sanitize_text_field($input['visibleOn']));
        }

        if (! empty($input['manager'])) {
            $parts = Relay::fromGlobalId(sanitize_text_field($input['manager']));
            $args['EVT_wp_user'] = ! empty($parts['id']) ? $parts['id'] : null;
        }

        if (array_key_exists('venue', $input)) {
            $venue_id = sanitize_text_field($input['venue']);
            $parts = Relay::fromGlobalId($venue_id);
            $args['venue'] = ! empty($parts['id']) ? $parts['id'] : $venue_id;
        }

        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_data_mutations__event_args',
            $args,
            $input
        );
    }


    /**
     * Sets the venue for the event.
     *
     * @param EE_Event $entity The event instance.
     * @param int      $venue  The venue ID
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public static function setEventVenue(EE_Event $entity, int $venue)
    {
        if (empty($venue)) {
            $entity->remove_venue($venue);
        } else {
            $entity->add_venue($venue);
        }
    }
}
