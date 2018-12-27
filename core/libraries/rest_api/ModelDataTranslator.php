<?php

namespace EventEspresso\core\libraries\rest_api;

use DomainException;
use EE_Capabilities;
use EE_Datetime_Field;
use EE_Error;
use EE_Infinite_Integer_Field;
use EE_Maybe_Serialized_Simple_HTML_Field;
use EE_Model_Field_Base;
use EE_Password_Field;
use EE_Restriction_Generator_Base;
use EE_Serialized_Text_Field;
use EED_Core_Rest_Api;
use EEM_Base;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;

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
 * @package               Event Espresso
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
     * @param EE_Model_Field_Base $field_obj
     * @param mixed               $original_value_maybe_array
     * @param string              $requested_version
     * @param string              $timezone_string treat values as being in this timezone
     * @return mixed
     * @throws RestException
     */
    public static function prepareFieldValuesFromJson(
        $field_obj,
        $original_value_maybe_array,
        $requested_version,
        $timezone_string = 'UTC'
    ) {
        if (is_array($original_value_maybe_array)
            && ! $field_obj instanceof EE_Serialized_Text_Field
        ) {
            $new_value_maybe_array = array();
            foreach ($original_value_maybe_array as $array_key => $array_item) {
                $new_value_maybe_array[ $array_key ] = ModelDataTranslator::prepareFieldValueFromJson(
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
     * @param EE_Model_Field_Base $field_obj
     * @param mixed               $original_value_maybe_array
     * @param string              $request_version (eg 4.8.36)
     * @return array
     */
    public static function prepareFieldValuesForJson($field_obj, $original_value_maybe_array, $request_version)
    {
        if (is_array($original_value_maybe_array)) {
            $new_value = array();
            foreach ($original_value_maybe_array as $key => $value) {
                $new_value[ $key ] = ModelDataTranslator::prepareFieldValuesForJson(
                    $field_obj,
                    $value,
                    $request_version
                );
            }
        } else {
            $new_value = ModelDataTranslator::prepareFieldValueForJson(
                $field_obj,
                $original_value_maybe_array,
                $request_version
            );
        }
        return $new_value;
    }


    /**
     * Prepares incoming data from the json or $_REQUEST parameters for the models'
     * "$query_params".
     *
     * @param EE_Model_Field_Base $field_obj
     * @param mixed               $original_value
     * @param string              $requested_version
     * @param string              $timezone_string treat values as being in this timezone
     * @return mixed
     * @throws RestException
     * @throws DomainException
     * @throws EE_Error
     */
    public static function prepareFieldValueFromJson(
        $field_obj,
        $original_value,
        $requested_version,
        $timezone_string = 'UTC' // UTC
    ) {
        // check if they accidentally submitted an error value. If so throw an exception
        if (is_array($original_value)
            && isset($original_value['error_code'], $original_value['error_message'])) {
            throw new RestException(
                'rest_submitted_error_value',
                sprintf(
                    esc_html__(
                        'You tried to submit a JSON error object as a value for %1$s. That\'s not allowed.',
                        'event_espresso'
                    ),
                    $field_obj->get_name()
                ),
                array(
                    'status' => 400,
                )
            );
        }
        // double-check for serialized PHP. We never accept serialized PHP. No way Jose.
        ModelDataTranslator::throwExceptionIfContainsSerializedData($original_value);
        $timezone_string = $timezone_string !== '' ? $timezone_string : get_option('timezone_string', '');
        $new_value = null;
        // walk through the submitted data and double-check for serialized PHP. We never accept serialized PHP. No
        // way Jose.
        ModelDataTranslator::throwExceptionIfContainsSerializedData($original_value);
        if ($field_obj instanceof EE_Infinite_Integer_Field
            && in_array($original_value, array(null, ''), true)
        ) {
            $new_value = EE_INF;
        } elseif ($field_obj instanceof EE_Datetime_Field) {
            $new_value = rest_parse_date(
                self::getTimestampWithTimezoneOffset($original_value, $field_obj, $timezone_string)
            );
            if ($new_value === false) {
                throw new RestException(
                    'invalid_format_for_timestamp',
                    sprintf(
                        esc_html__(
                            'Timestamps received on a request as the value for Date and Time fields must be in %1$s/%2$s format.  The timestamp provided (%3$s) is not that format.',
                            'event_espresso'
                        ),
                        'RFC3339',
                        'ISO8601',
                        $original_value
                    ),
                    array(
                        'status' => 400,
                    )
                );
            }
        } else {
            $new_value = $original_value;
        }
        return $new_value;
    }


    /**
     * This checks if the incoming timestamp has timezone information already on it and if it doesn't then adds timezone
     * information via details obtained from the host site.
     *
     * @param string            $original_timestamp
     * @param EE_Datetime_Field $datetime_field
     * @param                   $timezone_string
     * @return string
     * @throws DomainException
     */
    private static function getTimestampWithTimezoneOffset(
        $original_timestamp,
        EE_Datetime_Field $datetime_field,
        $timezone_string
    ) {
        // already have timezone information?
        if (preg_match('/Z|(\+|\-)(\d{2}:\d{2})/', $original_timestamp)) {
            // yes, we're ignoring the timezone.
            return $original_timestamp;
        }
        // need to append timezone
        list($offset_sign, $offset_secs) = self::parseTimezoneOffset(
            $datetime_field->get_timezone_offset(
                new \DateTimeZone($timezone_string),
                $original_timestamp
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
        return $original_timestamp . $offset_sign . $offset_string;
    }


    /**
     * Throws an exception if $data is a serialized PHP string (or somehow an actually PHP object, although I don't
     * think that can happen). If $data is an array, recurses into its keys and values
     *
     * @param mixed $data
     * @throws RestException
     * @return void
     */
    public static function throwExceptionIfContainsSerializedData($data)
    {
        if (is_array($data)) {
            foreach ($data as $key => $value) {
                ModelDataTranslator::throwExceptionIfContainsSerializedData($key);
                ModelDataTranslator::throwExceptionIfContainsSerializedData($value);
            }
        } else {
            if (is_serialized($data) || is_object($data)) {
                throw new RestException(
                    'serialized_data_submission_prohibited',
                    esc_html__(
                    // @codingStandardsIgnoreStart
                        'You tried to submit a string of serialized text. Serialized PHP is prohibited over the EE4 REST API.',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    )
                );
            }
        }
    }


    /**
     * determines what's going on with them timezone strings
     *
     * @param int $timezone_offset
     * @return array
     */
    private static function parseTimezoneOffset($timezone_offset)
    {
        $first_char = substr((string) $timezone_offset, 0, 1);
        if ($first_char === '+' || $first_char === '-') {
            $offset_sign = $first_char;
            $offset_secs = substr((string) $timezone_offset, 1);
        } else {
            $offset_sign = '+';
            $offset_secs = $timezone_offset;
        }
        return array($offset_sign, $offset_secs);
    }


    /**
     * Prepares a field's value for display in the API
     *
     * @param EE_Model_Field_Base $field_obj
     * @param mixed               $original_value
     * @param string              $requested_version
     * @return mixed
     */
    public static function prepareFieldValueForJson($field_obj, $original_value, $requested_version)
    {
        if ($original_value === EE_INF) {
            $new_value = ModelDataTranslator::EE_INF_IN_REST;
        } elseif ($field_obj instanceof EE_Datetime_Field) {
            if (is_string($original_value)) {
                // did they submit a string of a unix timestamp?
                if (is_numeric($original_value)) {
                    $datetime_obj = new \DateTime();
                    $datetime_obj->setTimestamp((int) $original_value);
                } else {
                    // first, check if its a MySQL timestamp in GMT
                    $datetime_obj = \DateTime::createFromFormat('Y-m-d H:i:s', $original_value);
                }
                if (! $datetime_obj instanceof \DateTime) {
                    // so it's not a unix timestamp or a MySQL timestamp. Maybe its in the field's date/time format?
                    $datetime_obj = $field_obj->prepare_for_set($original_value);
                }
                $original_value = $datetime_obj;
            }
            if ($original_value instanceof \DateTime) {
                $new_value = $original_value->format('Y-m-d H:i:s');
            } elseif (is_int($original_value) || is_float($original_value)) {
                $new_value = date('Y-m-d H:i:s', $original_value);
            } elseif ($original_value === null || $original_value === '') {
                $new_value = null;
            } else {
                // so it's not a datetime object, unix timestamp (as string or int),
                // MySQL timestamp, or even a string in the field object's format. So no idea what it is
                throw new \EE_Error(
                    sprintf(
                        esc_html__(
                        // @codingStandardsIgnoreStart
                            'The value "%1$s" for the field "%2$s" on model "%3$s" could not be understood. It should be a PHP DateTime, unix timestamp, MySQL date, or string in the format "%4$s".',
                            // @codingStandardsIgnoreEnd
                            'event_espresso'
                        ),
                        $original_value,
                        $field_obj->get_name(),
                        $field_obj->get_model_name(),
                        $field_obj->get_time_format() . ' ' . $field_obj->get_time_format()
                    )
                );
            }
            if ($new_value !== null) {
                $new_value = mysql_to_rfc3339($new_value);
            }
        } else {
            $new_value = $original_value;
        }
        // are we about to send an object? just don't. We have no good way to represent it in JSON.
        // can't just check using is_object() because that missed PHP incomplete objects
        if (! ModelDataTranslator::isRepresentableInJson($new_value)) {
            $new_value = array(
                'error_code'    => 'php_object_not_return',
                'error_message' => esc_html__(
                    'The value of this field in the database is a PHP object, which can\'t be represented in JSON.',
                    'event_espresso'
                ),
            );
        }
        return apply_filters(
            'FHEE__EventEspresso\core\libraries\rest_api\Model_Data_Translator__prepare_field_for_rest_api',
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
     * @param array $inputted_query_params_of_this_type
     * @param EEM_Base $model
     * @param string $requested_version
     * @param boolean $writing whether this data will be written to the DB, or if we're just building a query.
     *                          If we're writing to the DB, we don't expect any operators, or any logic query
     *                          parameters, and we also won't accept serialized data unless the current user has
     *                          unfiltered_html.
     * @return array
     * @throws DomainException
     * @throws EE_Error
     * @throws RestException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public static function prepareConditionsQueryParamsForModels(
        $inputted_query_params_of_this_type,
        EEM_Base $model,
        $requested_version,
        $writing = false
    ) {
        $query_param_for_models = array();
        $context = new RestIncomingQueryParamContext($model, $requested_version, $writing);
        foreach ($inputted_query_params_of_this_type as $query_param_key => $query_param_value) {
            $query_param_meta = new RestIncomingQueryParamMetadata($query_param_key, $query_param_value, $context);
            if ($query_param_meta->getField() instanceof EE_Model_Field_Base) {
                $translated_value = $query_param_meta->determineConditionsQueryParameterValue();
                if ((isset($query_param_for_models[ $query_param_meta->getQueryParamKey() ]) && $query_param_meta->isGmtField())
                    || $translated_value === null
                ) {
                    // they have already provided a non-gmt field, ignore the gmt one. That's what WP core
                    // currently does (they might change it though). See https://core.trac.wordpress.org/ticket/39954
                    // OR we couldn't create a translated value from their input
                    continue;
                }
                $query_param_for_models[ $query_param_meta->getQueryParamKey() ] = $translated_value;
            } else {
                $nested_query_params = $query_param_meta->determineNestedConditionQueryParameters();
                if ($nested_query_params) {
                    $query_param_for_models[ $query_param_meta->getQueryParamKey() ] = $nested_query_params;
                }
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
        if (! ModelDataTranslator::isGmtDateFieldName($field_name)) {
            return $field_name;
        }
        $query_param_sans_stars = ModelDataTranslator::removeStarsAndAnythingAfterFromConditionQueryParamKey(
            $field_name
        );
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
            $new_array[ $key ] = ModelDataTranslator::prepareFieldNameFromJson($field_name);
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
            $new_array[ ModelDataTranslator::prepareFieldNameFromJson($field_name) ] = $value;
        }
        return $new_array;
    }


    /**
     * Prepares an array of model query params for use in the REST API
     *
     * @param array    $model_query_params
     * @param EEM_Base $model
     * @param string   $requested_version  eg "4.8.36". If null is provided, defaults to the latest release of the EE4
     *                                     REST API
     * @return array which can be passed into the EE4 REST API when querying a model resource
     * @throws EE_Error
     */
    public static function prepareQueryParamsForRestApi(
        array $model_query_params,
        EEM_Base $model,
        $requested_version = null
    ) {
        if ($requested_version === null) {
            $requested_version = EED_Core_Rest_Api::latest_rest_api_version();
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
        return apply_filters(
            'FHEE__EventEspresso\core\libraries\rest_api\Model_Data_Translator__prepare_query_params_for_rest_api',
            $rest_query_params,
            $model_query_params,
            $model,
            $requested_version
        );
    }


    /**
     * Prepares all the sub-conditions query parameters (eg having or where conditions) for use in the rest api
     *
     * @param array    $inputted_query_params_of_this_type  eg like the "where" or "having" conditions query params
     *                                                      @see https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md#0-where-conditions
     * @param EEM_Base $model
     * @param string   $requested_version                   eg "4.8.36"
     * @return array ready for use in the rest api query params
     * @throws EE_Error
     * @throws ObjectDetectedException if somehow a PHP object were in the query params' values,
     *                                                      (which would be really unusual)
     */
    public static function prepareConditionsQueryParamsForRestApi(
        $inputted_query_params_of_this_type,
        EEM_Base $model,
        $requested_version
    ) {
        $query_param_for_models = array();
        foreach ($inputted_query_params_of_this_type as $query_param_key => $query_param_value) {
            $field = ModelDataTranslator::deduceFieldFromQueryParam(
                ModelDataTranslator::removeStarsAndAnythingAfterFromConditionQueryParamKey($query_param_key),
                $model
            );
            if ($field instanceof EE_Model_Field_Base) {
                // did they specify an operator?
                if (is_array($query_param_value)) {
                    $op = $query_param_value[0];
                    $translated_value = array($op);
                    if (isset($query_param_value[1])) {
                        $value = $query_param_value[1];
                        $translated_value[1] = ModelDataTranslator::prepareFieldValuesForJson(
                            $field,
                            $value,
                            $requested_version
                        );
                    }
                } else {
                    $translated_value = ModelDataTranslator::prepareFieldValueForJson(
                        $field,
                        $query_param_value,
                        $requested_version
                    );
                }
                $query_param_for_models[ $query_param_key ] = $translated_value;
            } else {
                // so it's not for a field, assume it's a logic query param key
                $query_param_for_models[ $query_param_key ] = ModelDataTranslator::prepareConditionsQueryParamsForRestApi(
                    $query_param_value,
                    $model,
                    $requested_version
                );
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
     * @param string   $query_param_name like Registration.Transaction.TXN_ID, Event.Datetime.start_time, or REG_ID
     * @param EEM_Base $model
     * @return EE_Model_Field_Base
     * @throws EE_Error
     */
    public static function deduceFieldFromQueryParam($query_param_name, EEM_Base $model)
    {
        // ok, now proceed with deducing which part is the model's name, and which is the field's name
        // which will help us find the database table and column
        $query_param_parts = explode('.', $query_param_name);
        if (empty($query_param_parts)) {
            throw new EE_Error(
                sprintf(
                    __(
                        '_extract_column_name is empty when trying to extract column and table name from %s',
                        'event_espresso'
                    ),
                    $query_param_name
                )
            );
        }
        $number_of_parts = count($query_param_parts);
        $last_query_param_part = $query_param_parts[ count($query_param_parts) - 1 ];
        if ($number_of_parts === 1) {
            $field_name = $last_query_param_part;
        } else {// $number_of_parts >= 2
            // the last part is the column name, and there are only 2parts. therefore...
            $field_name = $last_query_param_part;
            $model = \EE_Registry::instance()->load_model($query_param_parts[ $number_of_parts - 2 ]);
        }
        try {
            return $model->field_settings_for($field_name, false);
        } catch (EE_Error $e) {
            return null;
        }
    }


    /**
     * Returns true if $data can be easily represented in JSON.
     * Basically, objects and resources can't be represented in JSON easily.
     *
     * @param mixed $data
     * @return bool
     */
    protected static function isRepresentableInJson($data)
    {
        return is_scalar($data)
               || is_array($data)
               || is_null($data);
    }
}
