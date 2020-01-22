<?php

namespace EventEspresso\core\domain\services\graphql\data\mutations;

use DateTime;
use Exception;

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
     * @param string $mutation_name Name of the mutation being performed
     * @return array
     * @throws Exception
     */
    public static function prepareFields(array $input, $mutation_name)
    {

        $args = [];

        if (! empty($input['additionalLimit'])) {
            $args['EVT_additional_limit'] = absint($input['additionalLimit']);
        }

        if (array_key_exists('allowOverflow', $input)) {
            $args['EVT_allow_overflow'] = (bool) ($input['allowOverflow']);
        }

        if (! empty($input['desc'])) {
            $args['EVT_desc'] = sanitize_post_field('post_content', $input['desc'], null, $context = 'db');
        }

        if (array_key_exists('displayDesc', $input)) {
            $args['EVT_display_desc'] = (bool) ($input['displayDesc']);
        }

        if (array_key_exists('displayTicketSelector', $input)) {
            $args['EVT_display_ticket_selector'] = (bool) ($input['displayTicketSelector']);
        }

        if (array_key_exists('donations', $input)) {
            $args['EVT_donations'] = (bool) ($input['donations']);
        }

        if (! empty($input['externalUrl'])) {
            $args['EVT_external_URL'] = sanitize_text_field($input['externalUrl']);
        }

        if (array_key_exists('memberOnly', $input)) {
            $args['EVT_member_only'] = (bool) ($input['memberOnly']);
        }

        if (! empty($input['name'])) {
            $args['EVT_name'] = sanitize_text_field($input['name']);
        }

        if (! empty($input['order'])) {
            $args['EVT_order'] = absint($input['order']);
        }

        if (! empty($input['phone'])) {
            $args['EVT_phone'] = sanitize_text_field($input['phone']);
        }

        if (! empty($input['shortDesc'])) {
            $args['EVT_short_desc'] = sanitize_post_field('post_excerpt', $input['shortDesc'], null, $context = 'db');
        }

        if (! empty($input['timezoneString'])) {
            $args['EVT_timezone_string'] = sanitize_text_field($input['timezoneString']);
        }

        if (! empty($input['visibleOn'])) {
            $args['EVT_visible_on'] = new DateTime(sanitize_text_field($input['visibleOn']));
        }

        if (! empty($input['wpUser'])) {
            $args['EVT_wp_user'] = absint($input['wpUser']);
        }

        return $args;
    }
}
