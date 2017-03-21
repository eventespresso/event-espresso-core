<?php
namespace EventEspresso\core\libraries\rest_api;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class Model_Data_Translator
 * Class for translating data between the EE4 models and JSON.
 * Some of this class needs to interpret an incoming array of query params from
 * the REST API and prepare it for use by the models. Some of this code seems duplicated
 * from the models but it's anticipated to diverge (because providing parameters
 * in the REST API is sometimes more difficult than in PHP directly. Eg, providing an array like
 * array( 'where' => array( 'EVT_ID' => array( '<', 100 ) ) ) in PHP is easy, but in a query string it needs to look
 * like
 * "where[EVT_ID][]=<&where[EVT_ID][]=100" is less intuitive, so we may want
 * to allow REST API query parameters to diverge from the format accepted by models)

 *
*@package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @since                 4.8.36
 */
class ModelDataTranslator
{

    /**
     * We used to use -1 for infinity in the rest api, but that's ambiguous for
     * fields that COULD contain -1; so we use null
     */
    const EE_INF_IN_REST = null;



    /**
     * Prepares a possible array of input values from JSON for use by the models
     *
     * @param \EE_Model_Field_Base $field_obj
     * @param mixed                $original_value_maybe_array
     * @param string               $requested_version
     * @param string               $timezone_string treat values as being in this timezone
     * @return mixed
     * @throws \DomainException
     */
    public static function prepareFieldValuesFromJson(
        $field_obj,
        $original_value_maybe_array,
        $requested_version,
        $timezone_string = 'UTC'
    ) {
        if (is_array($original_value_maybe_array)) {
            $new_value_maybe_array = array();
            foreach ($original_value_maybe_array as $array_key => $array_item) {
                $new_value_maybe_array[$array_key] = ModelDataTranslator::prepareFieldValueFromJson(
                    $field_obj,
                    $array_item,
                    $requested_version,
                    $timezone_string
                );
            }
        } else {
            $new_value_maybe_array = ModelDataTranslator::prepareFieldValueFromJson(
                $field_obj,
                $original_value_maybe_array,
                $requested_version,
                $timezone_string
            );
        }
        return $new_value_maybe_array;
    }



    /**
     * Prepares an array of field values FOR use in JSON/REST API
     *
     * @param \EE_Model_Field_Base $field_obj
     * @param mixed                $original_value_maybe_array
     * @param string               $request_version (eg 4.8.36)
     * @return array
     */
    public static function prepareFieldValuesForJson($field_obj, $original_value_maybe_array, $request_version)
    {
        if (is_array($original_value_maybe_array)) {
            $new_value_maybe_array = array();
            foreach ($original_value_maybe_array as $array_key => $array_item) {
                $new_value_maybe_array[$array_key] = ModelDataTranslator::prepareFieldValueForJson(
                    $field_obj,
                    $array_item,
                    $request_version
                );
            }
        } else {
            $new_value_maybe_array = ModelDataTranslator::prepareFieldValueForJson(
                $field_obj,
                $original_value_maybe_array,
                $request_version
            );
        }
        return $new_value_maybe_array;
    }



    /**
     * Prepares incoming data from the json or $_REQUEST parameters for the models'
     * "$query_params".
     *
     * @param \EE_Model_Field_Base $field_obj
     * @param mixed                $original_value
     * @param string               $requested_version
     * @param string               $timezone_string treat values as being in this timezone
     * @return mixed
     * @throws \DomainException
     */
    public static function prepareFieldValueFromJson(
        $field_obj,
        $original_value,
        $requested_version,
        $timezone_string = 'UTC' // UTC
    )
    {
        $timezone_string = $timezone_string !== '' ? $timezone_string : get_option('timezone_string', '');
        $new_value = null;
        if ($field_obj instanceof \EE_Infinite_Integer_Field
            && in_array($original_value, array(null, ''), true)
        ) {
            $new_value = EE_INF;
        } elseif ($field_obj instanceof \EE_Datetime_Field) {
            list($offset_sign, $offset_secs) = ModelDataTranslator::parseTimezoneOffset(
                $field_obj->get_timezone_offset(
                    new \DateTimeZone($timezone_string),
                    $original_value
                )
            );
            $offset_string =
                str_pad(
                    floor($offset_secs / HOUR_IN_SECONDS),
                    2,
                    '0',
                    STR_PAD_LEFT
                )
                . ':'
                . str_pad(
                    ($offset_secs % HOUR_IN_SECONDS) / MINUTE_IN_SECONDS,
                    2,
                    '0',
                    STR_PAD_LEFT
                );
            $new_value = rest_parse_date($original_value . $offset_sign . $offset_string);
        } else {
            $new_value = $original_value;
        }
        return $new_value;
    }



    /**
     * determines what's going on with them timezone strings
     *
     * @param int $timezone_offset
     * @return array
     */
    private static function parseTimezoneOffset($timezone_offset)
    {
        $first_char = substr((string)$timezone_offset, 0, 1);
        if ($first_char === '+' || $first_char === '-') {
            $offset_sign = $first_char;
            $offset_secs = substr((string)$timezone_offset, 1);
        } else {
            $offset_sign = '+';
            $offset_secs = $timezone_offset;
        }
        return array($offset_sign, $offset_secs);
    }



    /**
     * Prepares a field's value for display in the API
     *
     * @param \EE_Model_Field_Base $field_obj
     * @param mixed                $original_value
     * @param string               $requested_version
     * @return mixed
     */
    public static function prepareFieldValueForJson($field_obj, $original_value, $requested_version)
    {
        if ($original_value === EE_INF) {
            $new_value = ModelDataTranslator::EE_INF_IN_REST;
        } elseif ($field_obj instanceof \EE_Datetime_Field) {
            if ($original_value instanceof \DateTime) {
                $new_value = $original_value->format('Y-m-d H:i:s');
            } elseif (is_int($original_value)) {
                $new_value = date('Y-m-d H:i:s', $original_value);
            } else {
                $new_value = $original_value;
            }
            $new_value = mysql_to_rfc3339($new_value);
        } else {
            $new_value = $original_value;
        }
        return apply_filters('FHEE__EventEspresso\core\libraries\rest_api\Model_Data_Translator__prepare_field_for_rest_api',
            $new_value,
            $field_obj,
            $original_value,
            $requested_version
        );
    }



    /**
     * Prepares condition-query-parameters (like what's in where and having) from
     * the format expected in the API to use in the models
     *
     * @param array     $inputted_query_params_of_this_type
     * @param \EEM_Base $model
     * @param string    $requested_version
     * @return array
     * @throws \DomainException
     * @throws \EE_Error
     */
    public static function prepareConditionsQueryParamsForModels(
        $inputted_query_params_of_this_type,
        \EEM_Base $model,
        $requested_version
    ) {
        $query_param_for_models = array();
        foreach ($inputted_query_params_of_this_type as $query_param_key => $query_param_value) {
            $is_gmt_datetime_field = false;
            $query_param_sans_stars = ModelDataTranslator::removeStarsAndAnythingAfterFromConditionQueryParamKey($query_param_key);
            $field = ModelDataTranslator::deduceFieldFromQueryParam(
                $query_param_sans_stars,
                $model
            );
            //double-check is it a *_gmt field?
            if (! $field instanceof \EE_Model_Field_Base
                && ModelDataTranslator::isGmtDateFieldName($query_param_sans_stars)
            ) {
                //yep, take off '_gmt', and find the field
                $query_param_key = ModelDataTranslator::removeGmtFromFieldName($query_param_sans_stars);
                $field = ModelDataTranslator::deduceFieldFromQueryParam(
                    $query_param_key,
                    $model
                );
                $timezone = 'UTC';
                $is_gmt_datetime_field = true;
            } elseif( $field instanceof \EE_Datetime_Field ) {
                //so it's not a GMT field. Set the timezone on the model to the default
                $timezone = \EEH_DTT_Helper::get_valid_timezone_string();
            }else{
                //just keep using what's already set for the timezone
                $timezone = $model->get_timezone();
            }
            if ($field instanceof \EE_Model_Field_Base) {
                //did they specify an operator?
                if (is_array($query_param_value)) {
                    $op = $query_param_value[0];
                    $translated_value = array($op);
                    if (isset($query_param_value[1])) {
                        $value = $query_param_value[1];
                        $translated_value[1] = ModelDataTranslator::prepareFieldValuesFromJson($field, $value,
                            $requested_version, $timezone);
                    }
                } else {
                    $translated_value = ModelDataTranslator::prepareFieldValueFromJson($field, $query_param_value,
                        $requested_version, $timezone);
                }
                if(isset( $query_param_for_models[$query_param_key]) && $is_gmt_datetime_field){
                    //they have already provided a non-gmt field, ignore the gmt one. That's what WP core
                    //currently does (they might change it though). See https://core.trac.wordpress.org/ticket/39954
                    continue;
                }
                $query_param_for_models[$query_param_key] = $translated_value;
            } else {
                //so it's not for a field, assume it's a logic query param key
                $query_param_for_models[$query_param_key] = ModelDataTranslator::prepareConditionsQueryParamsForModels($query_param_value,
                    $model, $requested_version);
            }
        }
        return $query_param_for_models;
    }



    /**
     * Mostly checks if the last 4 characters are "_gmt", indicating its a
     * gmt date field name
     *
     * @param string $field_name
     * @return boolean
     */
    public static function isGmtDateFieldName($field_name)
    {
        return substr(
                   ModelDataTranslator::removeStarsAndAnythingAfterFromConditionQueryParamKey($field_name),
                   -4,
                   4
               ) === '_gmt';
    }



    /**
     * Removes the last "_gmt" part of a field name (and if there is no "_gmt" at the end, leave it alone)
     *
     * @param string $field_name
     * @return string
     */
    public static function removeGmtFromFieldName($field_name)
    {
        if ( ! ModelDataTranslator::isGmtDateFieldName($field_name)) {
            return $field_name;
        }
        $query_param_sans_stars = ModelDataTranslator::removeStarsAndAnythingAfterFromConditionQueryParamKey($field_name);
        $query_param_sans_gmt_and_sans_stars = substr(
            $query_param_sans_stars,
            0,
            strrpos(
                $field_name,
                '_gmt'
            )
        );
        return str_replace($query_param_sans_stars, $query_param_sans_gmt_and_sans_stars, $field_name);
    }



    /**
     * Takes a field name from the REST API and prepares it for the model querying
     *
     * @param string $field_name
     * @return string
     */
    public static function prepareFieldNameFromJson($field_name)
    {
        if (ModelDataTranslator::isGmtDateFieldName($field_name)) {
            return ModelDataTranslator::removeGmtFromFieldName($field_name);
        }
        return $field_name;
    }



    /**
     * Takes array of field names from REST API and prepares for models
     *
     * @param array $field_names
     * @return array of field names (possibly include model prefixes)
     */
    public static function prepareFieldNamesFromJson(array $field_names)
    {
        $new_array = array();
        foreach ($field_names as $key => $field_name) {
            $new_array[$key] = ModelDataTranslator::prepareFieldNameFromJson($field_name);
        }
        return $new_array;
    }



    /**
     * Takes array where array keys are field names (possibly with model path prefixes)
     * from the REST API and prepares them for model querying
     *
     * @param array $field_names_as_keys
     * @return array
     */
    public static function prepareFieldNamesInArrayKeysFromJson(array $field_names_as_keys)
    {
        $new_array = array();
        foreach ($field_names_as_keys as $field_name => $value) {
            $new_array[ModelDataTranslator::prepareFieldNameFromJson($field_name)] = $value;
        }
        return $new_array;
    }



    /**
     * Prepares an array of model query params for use in the REST API
     *
     * @param array     $model_query_params
     * @param \EEM_Base $model
     * @param string    $requested_version eg "4.8.36". If null is provided, defaults to the latest release of the EE4
     *                                     REST API
     * @return array which can be passed into the EE4 REST API when querying a model resource
     * @throws \EE_Error
     */
    public static function prepareQueryParamsForRestApi(
        array $model_query_params,
        \EEM_Base $model,
        $requested_version = null
    ) {
        if ($requested_version === null) {
            $requested_version = \EED_Core_Rest_Api::latest_rest_api_version();
        }
        $rest_query_params = $model_query_params;
        if (isset($model_query_params[0])) {
            $rest_query_params['where'] = ModelDataTranslator::prepareConditionsQueryParamsForRestApi(
                $model_query_params[0],
                $model,
                $requested_version
            );
            unset($rest_query_params[0]);
        }
        if (isset($model_query_params['having'])) {
            $rest_query_params['having'] = ModelDataTranslator::prepareConditionsQueryParamsForRestApi(
                $model_query_params['having'],
                $model,
                $requested_version
            );
        }
        return apply_filters('FHEE__EventEspresso\core\libraries\rest_api\Model_Data_Translator__prepare_query_params_for_rest_api',
            $rest_query_params, $model_query_params, $model, $requested_version);
    }



    /**
     * Prepares all the sub-conditions query parameters (eg having or where conditions) for use in the rest api
     *
     * @param array     $inputted_query_params_of_this_type eg like the "where" or "having" conditions query params
     *                                                      passed into EEM_Base::get_all()
     * @param \EEM_Base $model
     * @param string    $requested_version                  eg "4.8.36"
     * @return array ready for use in the rest api query params
     * @throws \EE_Error
     */
    public static function prepareConditionsQueryParamsForRestApi(
        $inputted_query_params_of_this_type,
        \EEM_Base $model,
        $requested_version
    ) {
        $query_param_for_models = array();
        foreach ($inputted_query_params_of_this_type as $query_param_key => $query_param_value) {
            $field = ModelDataTranslator::deduceFieldFromQueryParam(
                ModelDataTranslator::removeStarsAndAnythingAfterFromConditionQueryParamKey($query_param_key),
                $model
            );
            if ($field instanceof \EE_Model_Field_Base) {
                //did they specify an operator?
                if (is_array($query_param_value)) {
                    $op = $query_param_value[0];
                    $translated_value = array($op);
                    if (isset($query_param_value[1])) {
                        $value = $query_param_value[1];
                        $translated_value[1] = ModelDataTranslator::prepareFieldValuesForJson($field, $value,
                            $requested_version);
                    }
                } else {
                    $translated_value = ModelDataTranslator::prepareFieldValueForJson($field, $query_param_value,
                        $requested_version);
                }
                $query_param_for_models[$query_param_key] = $translated_value;
            } else {
                //so it's not for a field, assume it's a logic query param key
                $query_param_for_models[$query_param_key] = ModelDataTranslator::prepareConditionsQueryParamsForRestApi($query_param_value,
                    $model, $requested_version);
            }
        }
        return $query_param_for_models;
    }



    /**
     * @param $condition_query_param_key
     * @return string
     */
    public static function removeStarsAndAnythingAfterFromConditionQueryParamKey($condition_query_param_key)
    {
        $pos_of_star = strpos($condition_query_param_key, '*');
        if ($pos_of_star === false) {
            return $condition_query_param_key;
        } else {
            $condition_query_param_sans_star = substr($condition_query_param_key, 0, $pos_of_star);
            return $condition_query_param_sans_star;
        }
    }



    /**
     * Takes the input parameter and finds the model field that it indicates.
     *
     * @param string    $query_param_name like Registration.Transaction.TXN_ID, Event.Datetime.start_time, or REG_ID
     * @param \EEM_Base $model
     * @return \EE_Model_Field_Base
     * @throws \EE_Error
     */
    public static function deduceFieldFromQueryParam($query_param_name, \EEM_Base $model)
    {
        //ok, now proceed with deducing which part is the model's name, and which is the field's name
        //which will help us find the database table and column
        $query_param_parts = explode('.', $query_param_name);
        if (empty($query_param_parts)) {
            throw new \EE_Error(sprintf(__('_extract_column_name is empty when trying to extract column and table name from %s',
                'event_espresso'), $query_param_name));
        }
        $number_of_parts = count($query_param_parts);
        $last_query_param_part = $query_param_parts[count($query_param_parts) - 1];
        if ($number_of_parts === 1) {
            $field_name = $last_query_param_part;
        } else {// $number_of_parts >= 2
            //the last part is the column name, and there are only 2parts. therefore...
            $field_name = $last_query_param_part;
            $model = \EE_Registry::instance()->load_model($query_param_parts[$number_of_parts - 2]);
        }
        try {
            return $model->field_settings_for($field_name);
        } catch (\EE_Error $e) {
            return null;
        }
    }

}
