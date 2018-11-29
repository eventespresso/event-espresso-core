<?php

namespace EventEspresso\core\libraries\rest_api\calculations;

use EventEspresso\core\libraries\rest_api\calculations\Base as AttendeeCalculationsBase;
use EventEspresso\core\libraries\rest_api\controllers\model\Base as AttendeeControllerBase;
use WP_REST_Request;

/**
 * Class Attendee
 * adds calculated fields to the  REST API output for the /attendees/ endpoint
 *
 * @package EventEspresso\core\libraries\rest_api\calculations
 * @author  Brent Christensen
 * @since   4.9.66.p
 */
class Attendee extends AttendeeCalculationsBase
{

    /**
     * @param array                  $wpdb_row
     * @param WP_REST_Request        $request
     * @param AttendeeControllerBase $controller
     * @since 4.9.66.p
     * @return string
     */
    public function userAvatar(array $wpdb_row, WP_REST_Request $request, AttendeeControllerBase $controller)
    {
        if (is_array($wpdb_row) && isset($wpdb_row['Attendee_Meta.ATT_email'])) {
            $email_address = $wpdb_row['Attendee_Meta.ATT_email'];
        }
        if (empty($email_address)) {
            return get_avatar_url('', array('force_default' => true));
        }
        $avatar = get_avatar_url($email_address);
        return $avatar ? $avatar : '';
    }


    /**
     * Provides an array for all the calculations possible that outlines a json schema for those calculations.
     * Array is indexed by calculation (snake case) and value is the schema for that calculation.
     *
     * @since 4.9.68.p
     * @return array
     */
    public function schemaForCalculations()
    {
        return array(
            'user_avatar' => array(
                'description' => esc_html__(
                    'The avatar url for the attendee (if available).',
                    'event_espresso'
                ),
                'type'        => 'string',
            ),
        );
    }
}
