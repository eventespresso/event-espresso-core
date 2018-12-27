<?php

namespace EventEspresso\core\libraries\rest_api\calculations;

use EE_Error;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\libraries\rest_api\calculations\Base as DatetimeCalculationBase;
use EventEspresso\core\libraries\rest_api\controllers\model\Base as DatetimeControllerBase;
use EEM_Datetime;
use EEM_Registration;
use EE_Datetime;
use EventEspresso\core\libraries\rest_api\RestException;
use InvalidArgumentException;
use ReflectionException;
use WP_REST_Request;

class Datetime extends DatetimeCalculationBase
{
    /**
     * @var EEM_Datetime
     */
    protected $datetime_model;

    /**
     * @var EEM_Registration
     */
    protected $registration_model;
    public function __construct(EEM_Datetime $datetime_model, EEM_Registration $registration_model)
    {
        $this->datetime_model = $datetime_model;
        $this->registration_model = $registration_model;
    }

    /**
     * Calculates the total spaces available on the datetime, taking into account
     * ticket limits too.
     *
     * @see EE_Datetime::spaces_remaining( true )
     * @param array            $wpdb_row
     * @param WP_REST_Request $request
     * @param DatetimeControllerBase  $controller
     * @return int
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function spacesRemainingConsideringTickets($wpdb_row, $request, $controller)
    {
        if (is_array($wpdb_row) && isset($wpdb_row['Datetime.DTT_ID'])) {
            $dtt_obj = $this->datetime_model->get_one_by_ID($wpdb_row['Datetime.DTT_ID']);
        } else {
            $dtt_obj = null;
        }
        if ($dtt_obj instanceof EE_Datetime) {
            return $dtt_obj->spaces_remaining(true);
        }
        throw new EE_Error(
            sprintf(
                __(
                // @codingStandardsIgnoreStart
                    'Cannot calculate spaces_remaining_considering_tickets because the datetime with ID %1$s (from database row %2$s) was not found',
                    // @codingStandardsIgnoreEnd
                    'event_espresso'
                ),
                $wpdb_row['Datetime.DTT_ID'],
                print_r($wpdb_row, true)
            )
        );
    }


    /**
     * Counts registrations who have checked into this datetime
     *
     * @param array           $wpdb_row
     * @param WP_REST_Request $request
     * @param DatetimeControllerBase $controller
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws RestException
     */
    public function registrationsCheckedInCount($wpdb_row, $request, $controller)
    {
        if (! is_array($wpdb_row) || ! isset($wpdb_row['Datetime.DTT_ID'])) {
            throw new EE_Error(
                sprintf(
                    __(
                    // @codingStandardsIgnoreStart
                        'Cannot calculate registrations_checked_in_count because the database row %1$s does not have an entry for "Datetime.DTT_ID"',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    ),
                    print_r($wpdb_row, true)
                )
            );
        }
        $this->verifyCurrentUserCan('ee_read_checkins', 'registrations_checked_in_count');
        return $this->registration_model
                               ->count_registrations_checked_into_datetime($wpdb_row['Datetime.DTT_ID'], true);
    }


    /**
     * Counts registrations who have checked out of this datetime
     *
     * @param array           $wpdb_row
     * @param WP_REST_Request $request
     * @param DatetimeControllerBase $controller
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws RestException
     */
    public function registrationsCheckedOutCount($wpdb_row, $request, $controller)
    {
        if (! is_array($wpdb_row) || ! isset($wpdb_row['Datetime.DTT_ID'])) {
            throw new EE_Error(
                sprintf(
                    __(
                    // @codingStandardsIgnoreStart
                        'Cannot calculate registrations_checked_out_count because the database row %1$s does not have an entry for "Datetime.DTT_ID"',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    ),
                    print_r($wpdb_row, true)
                )
            );
        }
        $this->verifyCurrentUserCan('ee_read_checkins', 'registrations_checked_out_count');
        return $this->registration_model
                               ->count_registrations_checked_into_datetime($wpdb_row['Datetime.DTT_ID'], false);
    }


    /**
     * Counts the number of pending-payment registrations for this event (regardless
     * of how many datetimes each registrations' ticket purchase is for)
     *
     * @param array           $wpdb_row
     * @param WP_REST_Request $request
     * @param DatetimeControllerBase $controller
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws RestException
     */
    public function spotsTakenPendingPayment($wpdb_row, $request, $controller)
    {
        if (! is_array($wpdb_row) || ! isset($wpdb_row['Datetime.DTT_ID'])) {
            throw new EE_Error(
                sprintf(
                    __(
                    // @codingStandardsIgnoreStart
                        'Cannot calculate spots_taken_pending_payment because the database row %1$s does not have an entry for "Datetime.DTT_ID"',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    ),
                    print_r($wpdb_row, true)
                )
            );
        }
        $this->verifyCurrentUserCan('ee_read_registrations', 'spots_taken_pending_payment');
        return $this->registration_model->count(
            array(
                array(
                    'Ticket.Datetime.DTT_ID' => $wpdb_row['Datetime.DTT_ID'],
                    'STS_ID'                 => EEM_Registration::status_id_pending_payment,
                ),
            ),
            'REG_ID',
            true
        );
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
            'spaces_remaining_considering_tickets' => array(
                'description' => esc_html__(
                    'Calculates the total spaces available on the datetime, taking into account ticket limits too.',
                    'event_espresso'
                ),
                'type' => 'number',
                'protected' => true,
            ),
            'registrations_checked_in_count' => array(
                'description' => esc_html__(
                    'Counts registrations who have checked into this datetime.',
                    'event_espresso'
                ),
                'type' => 'number',
                'protected' => true,
            ),
            'registrations_checked_out_count' => array(
                'description' => esc_html__(
                    'Counts registrations who have checked out of this datetime.',
                    'event_espresso'
                ),
                'type' => 'number',
                'protected' => true,
            ),
            'spots_taken_pending_payment' => array(
                'description' => esc_html__(
                    'The count of pending-payment registrations for this event (regardless of how many datetimes each registration\'s ticket purchase is for',
                    'event_espresso'
                ),
                'type' => 'number',
                'protected' => true,
            ),
        );
    }
}
