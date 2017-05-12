<?php
namespace EventEspresso\core\libraries\rest_api\calculations;

use EventEspresso\core\libraries\rest_api\calculations\Base as Calculations_Base;
use EventEspresso\core\libraries\rest_api\controllers\model\Base as Controller_Base;

/**
 * Class Datetime
 * Calculations relating to datetimes
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @since                 $VID:$
 */
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



class Datetime extends Calculations_Base
{

    /**
     * Calculates the total spaces available on the datetime, taking into account
     * ticket limits too.
     *
     * @see EE_Datetime::spaces_remaining( true )
     * @param array            $wpdb_row
     * @param \WP_REST_Request $request
     * @param Controller_Base  $controller
     * @return int
     * @throws \EE_Error
     */
    public static function spaces_remaining_considering_tickets($wpdb_row, $request, $controller)
    {
        if (is_array($wpdb_row) && isset($wpdb_row['Datetime.DTT_ID'])) {
            $dtt_obj = \EEM_Datetime::instance()->get_one_by_ID($wpdb_row['Datetime.DTT_ID']);
        } else {
            $dtt_obj = null;
        }
        if ($dtt_obj instanceof \EE_Datetime) {
            return $dtt_obj->spaces_remaining(true);
        } else {
            throw new \EE_Error(
                sprintf(
                    __('Cannot calculate spaces_remaining_considering_tickets because the datetime with ID %1$s (from database row %2$s) was not found',
                        'event_espresso'),
                    $wpdb_row['Datetime.DTT_ID'],
                    print_r($wpdb_row, true)
                )
            );
        }
    }



    /**
     * Counts registrations who have checked into this datetime
     *
     * @param array            $wpdb_row
     * @param \WP_REST_Request $request
     * @param Controller_Base  $controller
     * @return int
     * @throws \EE_Error
     * @throws \EventEspresso\core\libraries\rest_api\Rest_Exception
     */
    public static function registrations_checked_in_count($wpdb_row, $request, $controller)
    {
        if (! is_array($wpdb_row) || ! isset($wpdb_row['Datetime.DTT_ID'])) {
            throw new \EE_Error(
                sprintf(
                    __('Cannot calculate registrations_checked_in_count because the database row %1$s does not have an entry for "Datetime.DTT_ID"',
                        'event_espresso'),
                    print_r($wpdb_row, true)
                )
            );
        }
        self::_verify_current_user_can('ee_read_checkins', 'registrations_checked_in_count');
        return \EEM_Registration::instance()
                                ->count_registrations_checked_into_datetime($wpdb_row['Datetime.DTT_ID'], true);
    }



    /**
     * Counts registrations who have checked out of this datetime
     *
     * @param array            $wpdb_row
     * @param \WP_REST_Request $request
     * @param Controller_Base  $controller
     * @return int
     * @throws \EE_Error
     * @throws \EventEspresso\core\libraries\rest_api\Rest_Exception
     */
    public static function registrations_checked_out_count($wpdb_row, $request, $controller)
    {
        if (! is_array($wpdb_row) || ! isset($wpdb_row['Datetime.DTT_ID'])) {
            throw new \EE_Error(
                sprintf(
                    __('Cannot calculate registrations_checked_out_count because the database row %1$s does not have an entry for "Datetime.DTT_ID"',
                        'event_espresso'),
                    print_r($wpdb_row, true)
                )
            );
        }
        self::_verify_current_user_can('ee_read_checkins', 'registrations_checked_out_count');
        return \EEM_Registration::instance()
                                ->count_registrations_checked_into_datetime($wpdb_row['Datetime.DTT_ID'], false);
    }



    /**
     * Counts the number of pending-payment registrations for this event (regardless
     * of how many datetimes each registrations' ticket purchase is for)
     *
     * @param array            $wpdb_row
     * @param \WP_REST_Request $request
     * @param Controller_Base  $controller
     * @return int
     * @throws \EE_Error
     * @throws \EventEspresso\core\libraries\rest_api\Rest_Exception
     */
    public static function spots_taken_pending_payment($wpdb_row, $request, $controller)
    {
        if (! is_array($wpdb_row) || ! isset($wpdb_row['Datetime.DTT_ID'])) {
            throw new \EE_Error(
                sprintf(
                    __('Cannot calculate spots_taken_pending_payment because the database row %1$s does not have an entry for "Datetime.DTT_ID"',
                        'event_espresso'),
                    print_r($wpdb_row, true)
                )
            );
        }
        self::_verify_current_user_can('ee_read_registrations', 'spots_taken_pending_payment');
        return \EEM_Registration::instance()->count(
            array(
                array(
                    'Ticket.Datetime.DTT_ID' => $wpdb_row['Datetime.DTT_ID'],
                    'STS_ID'                 => \EEM_Registration::status_id_pending_payment,
                ),
            ),
            'REG_ID',
            true
        );
    }
}
