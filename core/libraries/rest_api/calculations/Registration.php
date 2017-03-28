<?php
namespace EventEspresso\core\libraries\rest_api\calculations;

use EventEspresso\core\libraries\rest_api\calculations\Base as Calculations_Base;
use EventEspresso\core\libraries\rest_api\controllers\model\Base;

/**
 * Class Registration
 *
 * @package               Registration Espresso
 * @subpackage
 * @author                Mike Nelson
 * @since                 $VID:$
 */
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



class Registration extends Calculations_Base
{

    /**
     * Calculates the checkin status for each datetime this registration has access to
     *
     * @param array            $wpdb_row
     * @param \WP_REST_Request $request
     * @param Base             $controller
     * @return int
     * @throws \EE_Error
     */
    public static function datetime_checkin_stati($wpdb_row, $request, $controller)
    {
        if (is_array($wpdb_row) && isset($wpdb_row['Registration.REG_ID'])) {
            $reg = \EEM_Registration::instance()->get_one_by_ID($wpdb_row['Registration.REG_ID']);
        } else {
            $reg = null;
        }
        if (! $reg instanceof \EE_Registration
        ) {
            throw new \EE_Error(
                sprintf(
                    __('Cannot calculate datetime_checkin_stati because the registration with ID %1$s (from database row %2$s) was not found',
                        'event_espresso'),
                    $wpdb_row['Registration.REG_ID'],
                    print_r($wpdb_row, true)
                )
            );
        }
        $datetime_ids = \EEM_Datetime::instance()->get_col(
            array(
                array(
                    'Ticket.TKT_ID' => $reg->ticket_ID(),
                ),
            )
        );
        $checkin_stati = array();
        foreach ($datetime_ids as $datetime_id) {
            $status = $reg->check_in_status_for_datetime($datetime_id);
            switch ($status) {
                case \EE_Registration::checkin_status_out:
                    $status_pretty = 'OUT';
                    break;
                case \EE_Registration::checkin_status_in:
                    $status_pretty = 'IN';
                    break;
                case \EE_Registration::checkin_status_never:
                default:
                    $status_pretty = 'NEVER';
                    break;
            }
            $checkin_stati[$datetime_id] = $status_pretty;
        }
        return $checkin_stati;
    }
}
