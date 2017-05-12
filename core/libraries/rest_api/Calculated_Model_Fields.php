<?php
namespace EventEspresso\core\libraries\rest_api;

use EventEspresso\core\libraries\rest_api\controllers\Base;
use EventEspresso\core\libraries\rest_api\Rest_Exception;

/**
 * Class Calculationshelpers
 * Class for defining which model fields can be calculated, and performing those calculations
 * as requested
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @since                 4.8.35.rc.001
 */
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



class Calculated_Model_Fields
{

    /**
     * @var array
     */
    protected $_mapping;



    /**
     * @param bool $refresh
     * @return array top-level-keys are model names (eg "Event")
     * next-level are the calculated field names AND method names on classes
     * which perform calculations, values are the fully qualified classnames which do the calculationss
     * These callbacks should accept as arguments:
     * the wpdb row results,
     * the WP_Request object,
     * the controller object
     */
    public function mapping($refresh = false)
    {
        if (! $this->_mapping || $refresh) {
            $this->_mapping = $this->_generate_new_mapping();
        }
        return $this->_mapping;
    }



    /**
     * Generates  anew mapping between model calculated fields and their callbacks
     *
     * @return array
     */
    protected function _generate_new_mapping()
    {
        $rest_api_calculations_namespace = 'EventEspresso\core\libraries\rest_api\calculations\\';
        $event_calculations_class = $rest_api_calculations_namespace . 'Event';
        $datetime_calculations_class = $rest_api_calculations_namespace . 'Datetime';
        $registration_class = $rest_api_calculations_namespace . 'Registration';
        return apply_filters(
            'FHEE__EventEspresso\core\libraries\rest_api\Calculated_Model_Fields__mapping',
            array(
                'Event'        => array(
                    'optimum_sales_at_start'          => $event_calculations_class,
                    'optimum_sales_now'               => $event_calculations_class,
                    'spots_taken'                     => $event_calculations_class,
                    'spots_taken_pending_payment'     => $event_calculations_class,
                    'spaces_remaining'                => $event_calculations_class,
                    'registrations_checked_in_count'  => $event_calculations_class,
                    'registrations_checked_out_count' => $event_calculations_class,
                    'image_thumbnail'                 => $event_calculations_class,
                    'image_medium'                    => $event_calculations_class,
                    'image_medium_large'              => $event_calculations_class,
                    'image_large'                     => $event_calculations_class,
                    'image_post_thumbnail'            => $event_calculations_class,
                    'image_full'                      => $event_calculations_class,
                ),
                'Datetime'     => array(
                    'spaces_remaining_considering_tickets' => $datetime_calculations_class,
                    'registrations_checked_in_count'       => $datetime_calculations_class,
                    'registrations_checked_out_count'      => $datetime_calculations_class,
                    'spots_taken_pending_payment'          => $datetime_calculations_class,
                ),
                'Registration' => array(
                    'datetime_checkin_stati' => $registration_class,
                ),
            )
        );
    }



    /**
     * Gets the known calculated fields for model
     *
     * @param \EEM_Base $model
     * @return array allowable values for this field
     */
    public function retrieve_calculated_fields_for_model(\EEM_Base $model)
    {
        $mapping = $this->mapping();
        if (isset($mapping[$model->get_this_model_name()])) {
            return array_keys($mapping[$model->get_this_model_name()]);
        } else {
            return array();
        }
    }



    /**
     * Retrieves the value for this calculation
     *
     * @param \EEM_Base                                               type $model
     * @param string                                                  $field_name
     * @param array                                                   $wpdb_row
     * @param \WP_REST_Request
     * @param \EventEspresso\core\libraries\rest_api\controllers\Base $controller
     * @return mixed|null
     * @throws \EE_Error
     */
    public function retrieve_calculated_field_value(
        \EEM_Base $model,
        $field_name,
        $wpdb_row,
        $rest_request,
        Base $controller
    ) {
        $mapping = $this->mapping();
        if (isset($mapping[$model->get_this_model_name()])
            && isset($mapping[$model->get_this_model_name()][$field_name])
        ) {
            $classname = $mapping[$model->get_this_model_name()][$field_name];
            return call_user_func(array($classname, $field_name), $wpdb_row, $rest_request, $controller);
        }
        throw new Rest_Exception(
            'calculated_field_does_not_exist',
            sprintf(
                __('There is no calculated field %1$s on resource %2$s', 'event_espresso'),
                $field_name,
                $model->get_this_model_name()
            )
        );
    }
}
