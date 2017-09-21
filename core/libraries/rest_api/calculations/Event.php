<?php
namespace EventEspresso\core\libraries\rest_api\calculations;

use EventEspresso\core\libraries\rest_api\calculations\Base as Calculations_Base;
use EventEspresso\core\libraries\rest_api\controllers\model\Base;
use EventEspresso\core\libraries\rest_api\RestException;
use EEM_Event;
use EE_Event;
use EE_Error;
use EEM_Registration;

/**
 * Class Event_Calculations
 * Description here
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @since                 $VID:$
 */
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



class Event extends Calculations_Base
{

    /**
     * Calculates the total spaces on the event (not subtracting sales, but taking
     * sales into account; so this is the optimum sales that CAN still be achieved)
     * See EE_Event::total_available_spaces( true );
     *
     * @param array            $wpdb_row
     * @param \WP_REST_Request $request
     * @param Base             $controller
     * @return int
     * @throws EE_Error
     */
    public static function optimumSalesAtStart($wpdb_row, $request, $controller)
    {
        $event_obj = null;
        if (Event::wpdbRowHasEventId($wpdb_row)) {
            $event_obj = EEM_Event::instance()->get_one_by_ID($wpdb_row['Event_CPT.ID']);
        }
        if ($event_obj instanceof EE_Event) {
            return $event_obj->total_available_spaces();
        }
        throw new EE_Error(
            sprintf(
                __(
                    // @codingStandardsIgnoreStart
                    'Cannot calculate optimum_sales_at_start because the event with ID %1$s (from database row %2$s) was not found',
                    // @codingStandardsIgnoreEnd
                    'event_espresso'
                ),
                $wpdb_row['Event_CPT.ID'],
                print_r($wpdb_row, true)
            )
        );
    }



    /**
     * Calculates the total spaces on the event (ignoring all sales; so this is the optimum
     * sales that COULD have been achieved)
     * See EE_Event::total_available_spaces( true );
     *
     * @param array            $wpdb_row
     * @param \WP_REST_Request $request
     * @param Base             $controller
     * @return int
     * @throws EE_Error
     */
    public static function optimumSalesNow($wpdb_row, $request, $controller)
    {
        $event_obj = null;
        if (Event::wpdbRowHasEventId($wpdb_row)) {
            $event_obj = EEM_Event::instance()->get_one_by_ID($wpdb_row['Event_CPT.ID']);
        }
        if ($event_obj instanceof EE_Event) {
            return $event_obj->total_available_spaces(true);
        }
        throw new EE_Error(
            sprintf(
                __(
                    // @codingStandardsIgnoreStart
                    'Cannot calculate optimum_sales_now because the event with ID %1$s (from database row %2$s) was not found',
                    // @codingStandardsIgnoreEnd
                    'event_espresso'
                ),
                $wpdb_row['Event_CPT.ID'],
                print_r($wpdb_row, true)
            )
        );
    }



    /**
     * Like optimum_sales_now, but minus total sales so far.
     * See EE_Event::spaces_remaining_for_sale( true );
     *
     * @param array            $wpdb_row
     * @param \WP_REST_Request $request
     * @param Base             $controller
     * @return int
     * @throws EE_Error
     */
    public static function spacesRemaining($wpdb_row, $request, $controller)
    {
        $event_obj = null;
        if (Event::wpdbRowHasEventId($wpdb_row)) {
            $event_obj = EEM_Event::instance()->get_one_by_ID($wpdb_row['Event_CPT.ID']);
        }
        if ($event_obj instanceof EE_Event) {
            return $event_obj->spaces_remaining_for_sale();
        }
        throw new EE_Error(
            sprintf(
                __(
                    // @codingStandardsIgnoreStart
                    'Cannot calculate spaces_remaining because the event with ID %1$s (from database row %2$s) was not found',
                    // @codingStandardsIgnoreEnd
                    'event_espresso'
                ),
                $wpdb_row['Event_CPT.ID'],
                print_r($wpdb_row, true)
            )
        );
    }



    /**
     * Counts the number of approved registrations for this event (regardless
     * of how many datetimes each registrations' ticket purchase is for)
     *
     * @param array            $wpdb_row
     * @param \WP_REST_Request $request
     * @param Base             $controller
     * @return int
     * @throws EE_Error
     */
    public static function spotsTaken($wpdb_row, $request, $controller)
    {
        if (! Event::wpdbRowHasEventId($wpdb_row)) {
            throw new EE_Error(
                sprintf(
                    __(
                        // @codingStandardsIgnoreStart
                        'Cannot calculate spots_taken because the database row %1$s does not have a valid entry for "Event_CPT.ID"',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    ),
                    print_r($wpdb_row, true)
                )
            );
        }
        return EEM_Registration::instance()->count(
            array(
                array(
                    'EVT_ID' => $wpdb_row['Event_CPT.ID'],
                    'STS_ID' => EEM_Registration::status_id_approved,
                ),
            ),
            'REG_ID',
            true
        );
    }



    /**
     * Counts the number of pending-payment registrations for this event (regardless
     * of how many datetimes each registrations' ticket purchase is for)
     *
     * @param array            $wpdb_row
     * @param \WP_REST_Request $request
     * @param Base             $controller
     * @return int
     * @throws EE_Error
     * @throws RestException
     */
    public static function spotsTakenPendingPayment($wpdb_row, $request, $controller)
    {
        if (! Event::wpdbRowHasEventId($wpdb_row)) {
            throw new EE_Error(
                sprintf(
                    __(
                        // @codingStandardsIgnoreStart
                        'Cannot calculate spots_taken_pending_payment because the database row %1$s does not have an entry for "Event_CPT.ID"',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    ),
                    print_r($wpdb_row, true)
                )
            );
        }
        self::verifyCurrentUserCan('ee_read_registrations', 'spots_taken_pending_payment');
        return EEM_Registration::instance()->count(
            array(
                array(
                    'EVT_ID' => $wpdb_row['Event_CPT.ID'],
                    'STS_ID' => EEM_Registration::status_id_pending_payment,
                ),
            ),
            'REG_ID',
            true
        );
    }



    /**
     * Counts all the registrations who have checked into one of this events' datetimes
     * See EE_Event::total_available_spaces( false );
     *
     * @param array            $wpdb_row
     * @param \WP_REST_Request $request
     * @param Base             $controller
     * @return int|null if permission denied
     * @throws EE_Error
     * @throws RestException
     */
    public static function registrationsCheckedInCount($wpdb_row, $request, $controller)
    {
        if (! Event::wpdbRowHasEventId($wpdb_row)) {
            throw new EE_Error(
                sprintf(
                    __(
                        // @codingStandardsIgnoreStart
                        'Cannot calculate registrations_checked_in_count because the database row %1$s does not have an entry for "Event_CPT.ID"',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    ),
                    print_r($wpdb_row, true)
                )
            );
        }
        self::verifyCurrentUserCan('ee_read_checkins', 'registrations_checked_in_count');
        return EEM_Registration::instance()->count_registrations_checked_into_event($wpdb_row['Event_CPT.ID'], true);
    }



    /**
     * Counts all the registrations who have checked out of one of this events' datetimes
     * See EE_Event::total_available_spaces( false );
     *
     * @param array            $wpdb_row
     * @param \WP_REST_Request $request
     * @param Base             $controller
     * @return int
     * @throws EE_Error
     * @throws RestException
     */
    public static function registrationsCheckedOutCount($wpdb_row, $request, $controller)
    {
        if (! Event::wpdbRowHasEventId($wpdb_row)) {
            throw new EE_Error(
                sprintf(
                    __(
                        // @codingStandardsIgnoreStart
                        'Cannot calculate registrations_checked_out_count because the database row %1$s does not have an entry for "Event_CPT.ID"',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    ),
                    print_r($wpdb_row, true)
                )
            );
        }
        self::verifyCurrentUserCan('ee_read_checkins', 'registrations_checked_out_count');
        return EEM_Registration::instance()->count_registrations_checked_into_event($wpdb_row['Event_CPT.ID'], false);
    }



    /**
     * Gets the thumbnail image
     *
     * @param array            $wpdb_row
     * @param \WP_REST_Request $request
     * @param Base             $controller
     * @return array
     * @throws EE_Error
     */
    public static function imageThumbnail($wpdb_row, $request, $controller)
    {
        return self::calculateImageData($wpdb_row, 'thumbnail');
    }



    /**
     * Gets the medium image
     *
     * @param array            $wpdb_row
     * @param \WP_REST_Request $request
     * @param Base             $controller
     * @return array
     * @throws EE_Error
     */
    public static function imageMedium($wpdb_row, $request, $controller)
    {
        return self::calculateImageData($wpdb_row, 'medium');
    }



    /**
     * Gets the medium-large image
     *
     * @param array            $wpdb_row
     * @param \WP_REST_Request $request
     * @param Base             $controller
     * @return array
     * @throws EE_Error
     */
    public static function imageMediumLarge($wpdb_row, $request, $controller)
    {
        return self::calculateImageData($wpdb_row, 'medium_large');
    }



    /**
     * Gets the large image
     *
     * @param array            $wpdb_row
     * @param \WP_REST_Request $request
     * @param Base             $controller
     * @return array
     * @throws EE_Error
     */
    public static function imageLarge($wpdb_row, $request, $controller)
    {
        return self::calculateImageData($wpdb_row, 'large');
    }



    /**
     * Gets the post-thumbnail image
     *
     * @param array            $wpdb_row
     * @param \WP_REST_Request $request
     * @param Base             $controller
     * @return array
     * @throws EE_Error
     */
    public static function imagePostThumbnail($wpdb_row, $request, $controller)
    {
        return self::calculateImageData($wpdb_row, 'post-thumbnail');
    }



    /**
     * Gets the full size image
     *
     * @param array            $wpdb_row
     * @param \WP_REST_Request $request
     * @param Base             $controller
     * @return array
     * @throws EE_Error
     */
    public static function imageFull($wpdb_row, $request, $controller)
    {
        return self::calculateImageData($wpdb_row, 'full');
    }



    /**
     * Gets image specs and formats them for the display in the API,
     * according to the image size requested
     *
     * @param array    $wpdb_row
     * @param string $image_size one of these: thumbnail, medium, medium_large, large, post-thumbnail, full
     * @return array|false if no such image exists. If array it will have keys 'url', 'width', 'height' and 'original'
     * @throws EE_Error
     */
    protected static function calculateImageData($wpdb_row, $image_size)
    {
        if (! Event::wpdbRowHasEventId($wpdb_row)) {
            throw new EE_Error(
                sprintf(
                    __(
                    // @codingStandardsIgnoreStart
                        'Cannot calculate image because the database row %1$s does not have an entry for "Event_CPT.ID"',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    ),
                    print_r($wpdb_row, true)
                )
            );
        }
        $EVT_ID = $wpdb_row['Event_CPT.ID'];
        $attachment_id = get_post_thumbnail_id($EVT_ID);
        $data = wp_get_attachment_image_src($attachment_id, $image_size);
        if (! $data) {
            return null;
        }
        $generated = true;
        if (isset($data[3])) {
            $generated = $data[3];
        }
        return array(
            'url'       => $data[0],
            'width'     => $data[1],
            'height'    => $data[2],
            'generated' => $generated,
        );
    }



    /**
     * Returns true if the array of data contains 'Event_CPT.ID'. False otherwise
     * @param array $wpdb_row
     * @return bool
     */
    protected static function wpdbRowHasEventId($wpdb_row)
    {
        return (is_array($wpdb_row) && isset($wpdb_row['Event_CPT.ID']) && absint($wpdb_row['Event_CPT.ID']));
    }
}
