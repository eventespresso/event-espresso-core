<?php

namespace EventEspresso\core\libraries\rest_api\calculations;

use EE_Checkin;
use EE_Error;
use EEM_Base;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\libraries\rest_api\calculations\Base as RegistrationCalculationBase;
use EventEspresso\core\libraries\rest_api\controllers\model\Base as RegistrationControllerBase;
use EEM_Registration;
use EE_Registration;
use EEM_Datetime;
use InvalidArgumentException;
use WP_REST_Request;

/**
 * Class Registration
 *
 * @package               Registration Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class Registration extends RegistrationCalculationBase
{
    /**
     * @var EEM_Registration
     */
    protected $registration_model;

    /**
     * Registration constructor.
     * @param EEM_Registration $registration_model
     */
    public function __construct(EEM_Registration $registration_model)
    {
        $this->registration_model = $registration_model;
    }

    /**
     * Calculates the checkin status for each datetime this registration has access to
     *
     * @param array            $wpdb_row
     * @param WP_REST_Request $request
     * @param RegistrationControllerBase $controller
     * @return array
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public function datetimeCheckinStati($wpdb_row, $request, $controller)
    {
        if (is_array($wpdb_row) && isset($wpdb_row['Registration.REG_ID'])) {
            $reg = $this->registration_model->get_one_by_ID($wpdb_row['Registration.REG_ID']);
        } else {
            $reg = null;
        }
        if (! $reg instanceof EE_Registration
        ) {
            throw new EE_Error(
                sprintf(
                    __(
                    // @codingStandardsIgnoreStart
                        'Cannot calculate datetime_checkin_stati because the registration with ID %1$s (from database row %2$s) was not found',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    ),
                    $wpdb_row['Registration.REG_ID'],
                    print_r($wpdb_row, true)
                )
            );
        }
        $datetime_ids = EEM_Datetime::instance()->get_col(
            [
                [
                    'Ticket.TKT_ID' => $reg->ticket_ID(),
                ],
                'default_where_conditions' => EEM_Base::default_where_conditions_minimum_all,
            ]
        );
        $checkin_stati = array();
        foreach ($datetime_ids as $datetime_id) {
            $status = $reg->check_in_status_for_datetime($datetime_id);
            switch ($status) {
                case EE_Checkin::status_checked_out:
                    $status_pretty = 'OUT';
                    break;
                case EE_Checkin::status_checked_in:
                    $status_pretty = 'IN';
                    break;
                case EE_Checkin::status_checked_never:
                default:
                    $status_pretty = 'NEVER';
                    break;
            }
            $checkin_stati[ $datetime_id ] = $status_pretty;
        }
        return $checkin_stati;
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
            'datetime_checkin_stati' => array(
                'description' => esc_html__(
                    'Returns the checkin status for each datetime this registration has access to.',
                    'event_espresso'
                ),
                'type' => 'object',
                'properties' => array(),
                'additionalProperties' => array(
                    'description' => esc_html(
                        'Keys are date-time ids and values are the check-in status',
                        'event_espresso'
                    ),
                    'type' => 'string'
                ),
            ),
        );
    }
}
