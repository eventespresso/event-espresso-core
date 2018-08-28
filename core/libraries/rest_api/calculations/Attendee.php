<?php

namespace EventEspresso\core\libraries\rest_api\calculations;

use EE_Attendee;
use EE_Error;
use EEM_Attendee;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\libraries\rest_api\calculations\Base as Calculations_Base;
use EventEspresso\core\libraries\rest_api\controllers\model\Base;
use InvalidArgumentException;
use WP_REST_Request;

/**
 * Class Attendee
 * adds calculated fields to the  REST API output for the /attendees/ endpoint
 *
 * @package EventEspresso\core\libraries\rest_api\calculations
 * @author  Brent Christensen
 * @since   4.9.66.p
 */
class Attendee extends Calculations_Base
{

    /**
     * @param array           $wpdb_row
     * @param WP_REST_Request $request
     * @param Base            $controller
     * @since 4.9.66.p
     * @return string
     */
    public static function userAvatar(array $wpdb_row, WP_REST_Request $request, Base $controller)
    {
        if (is_array($wpdb_row) && isset($wpdb_row['Attendee_Meta.ATT_email'])) {
            $email_address = $wpdb_row['Attendee_Meta.ATT_email'];
        }
        if (empty($email_address)) {
            return '';
        }
        $avatar = get_avatar_url($email_address);
        return $avatar ? $avatar : '';
    }
}
