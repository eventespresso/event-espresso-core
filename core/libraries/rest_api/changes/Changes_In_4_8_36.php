<?php namespace EventEspresso\core\libraries\rest_api\changes;

use EventEspresso\core\libraries\rest_api\controllers\model\Read;
use EventEspresso\core\libraries\rest_api\controllers\model\Base;
use EventEspresso\core\libraries\rest_api\controllers\Base as Controller_Base;

/*
 * The checkin and checkout endpoints were added in 4.8.36,
 * where we just added a response headers
 */



class Changes_In_4_8_36 extends Changes_In_Base
{

    /**
     * Adds hooks so requests to 4.8.29 don't have the checkin endpoints
     */
    public function set_hooks()
    {
        //set a hook to remove the "calculate" query param
        add_filter(
            'FHEE__EED_Core_Rest_Api___get_response_selection_query_params',
            array($this, 'remove_calculate_query_param'),
            10,
            3
        );
        //don't add the _calculated_fields either
        add_filter(
            'FHEE__Read__create_entity_from_wpdb_results__entity_before_inaccessible_field_removal',
            array($this, 'remove_calculated_fields_from_response'),
            10,
            5
        );
        //and also don't add the count headers
        add_filter(
            'FHEE__EventEspresso\core\libraries\rest_api\controllers\Base___get_response_headers',
            array($this, 'remove_headers_new_in_this_version'),
            10,
            3
        );
        //remove the old featured_image part of the response...
        add_filter(
            'FHEE__Read__create_entity_from_wpdb_results__entity_before_including_requested_models',
            array($this, 'add_old_featured_image_part_of_cpt_entities'),
            10,
            5
        );
        //assuming ticket 9425's change gets pushed with 9406, we don't need to
        //remove it from the calculated fields on older requests (because this will
        //be the first version with calculated fields)
        //before this, infinity was -1, now it's null
        add_filter(
            'FHEE__EventEspresso\core\libraries\rest_api\Model_Data_Translator__prepare_field_for_rest_api',
            array($this, 'use_negative_one_for_infinity_before_this_version'),
            10,
            4
        );
    }



    /**
     * Dont show "calculate" as an query param option in the index
     *
     * @param array     $query_params
     * @param \EEM_base $model
     * @param string    $version
     * @return array
     */
    public function remove_calculate_query_param($query_params, \EEM_Base $model, $version)
    {
        if ($this->applies_to_version($version)) {
            unset($query_params['calculate']);
        }
        return $query_params;
    }



    /**
     * Removes the "_calculate_fields" part of entity responses before 4.8.36
     *
     * @param array            $entity_response_array
     * @param \EEM_Base        $model
     * @param string           $request_context
     * @param \WP_REST_Request $request
     * @param Read             $controller
     * @return array
     */
    public function remove_calculated_fields_from_response(
        $entity_response_array,
        \EEM_Base $model,
        $request_context,
        \WP_REST_Request $request,
        Read $controller
    ) {
        if ($this->applies_to_version($controller->get_model_version_info()->requested_version())) {
            unset($entity_response_array['_calculated_fields']);
        }
        return $entity_response_array;
    }



    /**
     * Removes the new headers for requests before 4.8.36
     *
     * @param array  $headers
     * @param Base   $controller
     * @param string $version
     * @return array
     */
    public function remove_headers_new_in_this_version(
        $headers,
        Controller_Base $controller,
        $version
    ) {
        if ($this->applies_to_version($version)) {
            $headers = array_diff_key(
                $headers,
                array_flip(
                    array(
                        Base::header_prefix_for_wp . 'Total',
                        Base::header_prefix_for_wp . 'TotalPages',
                        Base::header_prefix_for_wp . 'PageSize',
                    )));
        }
        return $headers;
    }



    /**
     * Puts the 'featured_image_url' back in for responses before 4.8.36.
     *
     * @param array            $entity_response_array
     * @param \EEM_Base        $model
     * @param string           $request_context
     * @param \WP_REST_Request $request
     * @param Read             $controller
     * @return array
     */
    public function add_old_featured_image_part_of_cpt_entities(
        $entity_response_array,
        \EEM_Base $model,
        $request_context,
        \WP_REST_Request $request,
        Read $controller
    ) {
        if ($this->applies_to_version($controller->get_model_version_info()->requested_version())
            && $model instanceof \EEM_CPT_Base
        ) {
            $attachment = wp_get_attachment_image_src(
                get_post_thumbnail_id($entity_response_array[$model->primary_key_name()]),
                'full'
            );
            $entity_response_array['featured_image_url'] = ! empty($attachment) ? $attachment[0] : null;
        }
        return $entity_response_array;
    }



    /**
     * If the value was infinity, we now use null in our JSON responses,
     * but before this version we used -1.
     *
     * @param mixed                $new_value
     * @param \EE_Model_Field_Base $field_obj
     * @param mixed                $original_value
     * @param string               $requested_value
     * @return mixed
     */
    public function use_negative_one_for_infinity_before_this_version(
        $new_value,
        $field_obj,
        $original_value,
        $requested_value
    ) {
        if ($this->applies_to_version($requested_value)
            && $original_value === EE_INF
        ) {
            //return the old representation of infinity in the JSON
            return -1;
        }
        return $new_value;
    }

}

