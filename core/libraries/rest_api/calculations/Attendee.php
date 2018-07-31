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
 * @since   $VID:$
 */
class Attendee extends Calculations_Base
{

    /**
     * @since $VID:$
     * @param $wpdb_row
     * @return EE_Attendee|\EE_Base_Class
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private static function getAttendeeObject($wpdb_row)
    {
        $attendee = null;
        if (is_array($wpdb_row) && isset($wpdb_row['Attendee_CPT.ID']) && absint($wpdb_row['Attendee_CPT.ID'])) {
            $attendee = EEM_Attendee::instance()->get_one_by_ID($wpdb_row['Attendee_CPT.ID']);
        }
        return $attendee;
    }


    /**
     * @param array           $wpdb_row
     * @param WP_REST_Request $request
     * @param Base            $controller
     * @since $VID:$
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
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
