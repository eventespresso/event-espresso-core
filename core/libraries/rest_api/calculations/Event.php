<?php

namespace EventEspresso\core\libraries\rest_api\calculations;

use DomainException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\libraries\rest_api\calculations\Base as EventCalculationBase;
use EventEspresso\core\libraries\rest_api\controllers\model\Base as EventControllerBase;
use EventEspresso\core\libraries\rest_api\RestException;
use EEM_Event;
use EE_Event;
use EE_Error;
use EEM_Registration;
use InvalidArgumentException;
use WP_REST_Request;

/**
 * Class Event_Calculations
 * Description here
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class Event extends EventCalculationBase
{
    /**
     * @var EEM_Event
     */
    protected $event_model;

    /**
     * @var EEM_Registration
     */
    protected $registration_model;
    public function __construct(EEM_Event $event_model, EEM_Registration $registration_model)
    {
        $this->event_model = $event_model;
        $this->registration_model = $registration_model;
    }

    /**
     * Calculates the total spaces on the event (not subtracting sales, but taking
     * sales into account; so this is the optimum sales that CAN still be achieved)
     * See EE_Event::total_available_spaces( true );
     *
     * @param array               $wpdb_row
     * @param WP_REST_Request     $request
     * @param EventControllerBase $controller
     * @return int
     * @throws EE_Error
     * @throws DomainException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UnexpectedEntityException
     * @throws InvalidArgumentException
     */
    public function optimumSalesAtStart($wpdb_row, $request, $controller)
    {
        $event_obj = null;
        if (Event::wpdbRowHasEventId($wpdb_row)) {
            $event_obj = $this->event_model->get_one_by_ID($wpdb_row['Event_CPT.ID']);
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
     * @param array               $wpdb_row
     * @param WP_REST_Request     $request
     * @param EventControllerBase $controller
     * @return int
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UnexpectedEntityException
     */
    public function optimumSalesNow($wpdb_row, $request, $controller)
    {
        $event_obj = null;
        if (Event::wpdbRowHasEventId($wpdb_row)) {
            $event_obj = $this->event_model->get_one_by_ID($wpdb_row['Event_CPT.ID']);
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
     * @param array               $wpdb_row
     * @param WP_REST_Request     $request
     * @param EventControllerBase $controller
     * @return int
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UnexpectedEntityException
     */
    public function spacesRemaining($wpdb_row, $request, $controller)
    {
        $event_obj = null;
        if (Event::wpdbRowHasEventId($wpdb_row)) {
            $event_obj = $this->event_model->get_one_by_ID($wpdb_row['Event_CPT.ID']);
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
     * @param array               $wpdb_row
     * @param WP_REST_Request     $request
     * @param EventControllerBase $controller
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function spotsTaken($wpdb_row, $request, $controller)
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
        return $this->registration_model->count(
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
     * @param array               $wpdb_row
     * @param WP_REST_Request     $request
     * @param EventControllerBase $controller
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws RestException
     */
    public function spotsTakenPendingPayment($wpdb_row, $request, $controller)
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
        $this->verifyCurrentUserCan('ee_read_registrations', 'spots_taken_pending_payment');
        return $this->registration_model->count(
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
     * @param array               $wpdb_row
     * @param WP_REST_Request     $request
     * @param EventControllerBase $controller
     * @return int|null if permission denied
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws RestException
     */
    public function registrationsCheckedInCount($wpdb_row, $request, $controller)
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
        $this->verifyCurrentUserCan('ee_read_checkins', 'registrations_checked_in_count');
        return $this->registration_model->count_registrations_checked_into_event($wpdb_row['Event_CPT.ID'], true);
    }


    /**
     * Counts all the registrations who have checked out of one of this events' datetimes
     * See EE_Event::total_available_spaces( false );
     *
     * @param array               $wpdb_row
     * @param WP_REST_Request     $request
     * @param EventControllerBase $controller
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws RestException
     */
    public function registrationsCheckedOutCount($wpdb_row, $request, $controller)
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
        $this->verifyCurrentUserCan('ee_read_checkins', 'registrations_checked_out_count');
        return $this->registration_model->count_registrations_checked_into_event($wpdb_row['Event_CPT.ID'], false);
    }


    /**
     * Gets the thumbnail image
     *
     * @param array               $wpdb_row
     * @param WP_REST_Request     $request
     * @param EventControllerBase $controller
     * @return array
     * @throws EE_Error
     */
    public function imageThumbnail($wpdb_row, $request, $controller)
    {
        return self::calculateImageData($wpdb_row, 'thumbnail');
    }


    /**
     * Gets the medium image
     *
     * @param array               $wpdb_row
     * @param WP_REST_Request     $request
     * @param EventControllerBase $controller
     * @return array
     * @throws EE_Error
     */
    public function imageMedium($wpdb_row, $request, $controller)
    {
        return self::calculateImageData($wpdb_row, 'medium');
    }


    /**
     * Gets the medium-large image
     *
     * @param array               $wpdb_row
     * @param WP_REST_Request     $request
     * @param EventControllerBase $controller
     * @return array
     * @throws EE_Error
     */
    public function imageMediumLarge($wpdb_row, $request, $controller)
    {
        return self::calculateImageData($wpdb_row, 'medium_large');
    }


    /**
     * Gets the large image
     *
     * @param array               $wpdb_row
     * @param WP_REST_Request     $request
     * @param EventControllerBase $controller
     * @return array
     * @throws EE_Error
     */
    public function imageLarge($wpdb_row, $request, $controller)
    {
        return self::calculateImageData($wpdb_row, 'large');
    }


    /**
     * Gets the post-thumbnail image
     *
     * @param array               $wpdb_row
     * @param WP_REST_Request     $request
     * @param EventControllerBase $controller
     * @return array
     * @throws EE_Error
     */
    public function imagePostThumbnail($wpdb_row, $request, $controller)
    {
        return self::calculateImageData($wpdb_row, 'post-thumbnail');
    }


    /**
     * Gets the full size image
     *
     * @param array               $wpdb_row
     * @param WP_REST_Request     $request
     * @param EventControllerBase $controller
     * @return array
     * @throws EE_Error
     */
    public function imageFull($wpdb_row, $request, $controller)
    {
        return self::calculateImageData($wpdb_row, 'full');
    }


    /**
     * Gets image specs and formats them for the display in the API,
     * according to the image size requested
     *
     * @param array  $wpdb_row
     * @param string $image_size one of these: thumbnail, medium, medium_large, large, post-thumbnail, full
     * @return array|false if no such image exists. If array it will have keys 'url', 'width', 'height' and 'original'
     * @throws EE_Error
     */
    protected function calculateImageData($wpdb_row, $image_size)
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
     *
     * @param array $wpdb_row
     * @return bool
     */
    protected function wpdbRowHasEventId($wpdb_row)
    {
        return (is_array($wpdb_row) && isset($wpdb_row['Event_CPT.ID']) && absint($wpdb_row['Event_CPT.ID']));
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
        $image_object_properties = array(
            'url'       => array(
                'type' => 'string',
            ),
            'width'     => array(
                'type' => 'number',
            ),
            'height'    => array(
                'type' => 'number',
            ),
            'generated' => array(
                'type' => 'boolean',
            ),
        );
        return array(
            'optimum_sales_at_start'          => array(
                'description' => esc_html__(
                    'The total spaces on the event (not subtracting sales, but taking sales into account; so this is the optimum sales that CAN still be achieved.',
                    'event_espresso'
                ),
                'type'        => 'number',
                'protected' => true,
            ),
            'optimum_sales_now'               => array(
                'description' => esc_html__(
                    'The total spaces on the event (ignoring all sales; so this is the optimum sales that could have been achieved.',
                    'event_espresso'
                ),
                'type'        => 'number',
                'protected' => true,
            ),
            'spaces_remaining'                => array(
                'description' => esc_html__(
                    'The optimum_sales_number result, minus total sales so far.',
                    'event_espresso'
                ),
                'type'        => 'number',
                'protected' => true,
            ),
            'spots_taken'                     => array(
                'description' => esc_html__(
                    'The number of approved registrations for this event (regardless of how many datetimes each registration\'s ticket purchase is for)',
                    'event_espresso'
                ),
                'type'        => 'number',
                'protected' => true,
            ),
            'spots_taken_pending_payment'     => array(
                'description' => esc_html__(
                    'The number of pending-payment registrations for this event (regardless of how many datetimes each registration\'s ticket purchase is for)',
                    'event_espresso'
                ),
                'type'        => 'number',
                'protected' => true,
            ),
            'registrations_checked_in_count'  => array(
                'description' => esc_html__(
                    'The count of all the registrations who have checked into one of this event\'s datetimes.',
                    'event_espresso'
                ),
                'type'        => 'number',
                'protected' => true,
            ),
            'registrations_checked_out_count' => array(
                'description' => esc_html__(
                    'The count of all registrations who have checked out of one of this event\'s datetimes.',
                    'event_espresso'
                ),
                'type'        => 'number',
                'protected' => true,
            ),
            'image_thumbnail'                 => array(
                'description'          => esc_html__(
                    'The thumbnail image data.',
                    'event_espresso'
                ),
                'type'                 => 'object',
                'properties'           => $image_object_properties,
                'additionalProperties' => false,
            ),
            'image_medium'                    => array(
                'description'          => esc_html__(
                    'The medium image data.',
                    'event_espresso'
                ),
                'type'                 => 'object',
                'properties'           => $image_object_properties,
                'additionalProperties' => false,
            ),
            'image_medium_large'              => array(
                'description'          => esc_html__(
                    'The medium-large image data.',
                    'event_espresso'
                ),
                'type'                 => 'object',
                'properties'           => $image_object_properties,
                'additionalProperties' => false,
            ),
            'image_large'                     => array(
                'description'          => esc_html__(
                    'The large image data.',
                    'event_espresso'
                ),
                'type'                 => 'object',
                'properties'           => $image_object_properties,
                'additionalProperties' => false,
            ),
            'image_post_thumbnail'            => array(
                'description'          => esc_html__(
                    'The post-thumbnail image data.',
                    'event_espresso'
                ),
                'type'                 => 'object',
                'properties'           => $image_object_properties,
                'additionalProperties' => false,
            ),
            'image_full'                      => array(
                'description'          => esc_html__(
                    'The full size image data',
                    'event_espresso'
                ),
                'type'                 => 'object',
                'properties'           => $image_object_properties,
                'additionalProperties' => false,
            ),
        );
    }
}
