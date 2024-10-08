<?php

namespace EventEspresso\core\libraries\rest_api;

use DomainException;
use EE_Datetime_Field;
use EE_Error;
use EE_Model_Field_Base;
use EE_Password_Field;
use EE_Restriction_Generator_Base;
use EEH_Array;
use EEH_DTT_Helper;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use Exception;
use InvalidArgumentException;
use EED_Core_Rest_Api;
use ReflectionException;

/**
 * Class RestQueryParamMetadata
 *
 * Object for passing around metadata derived from the query parameters passed in via the REST API.
 * This is convenient when interpreting REST API query params and generating model query params.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.72.p
 *
 */
class RestIncomingQueryParamMetadata
{
    private string $query_param_key;

    private $query_param_value;

    private RestIncomingQueryParamContext $context;

    private ?EE_Model_Field_Base $field;

    /**
     * @var string same as $query_param_key but has the * and anything after it removed
     */
    private string $query_param_key_sans_stars;

    /**
     * @var string for timezone or timezone offset
     */
    private string $timezone;

    /**
     * @var bool if the field in $query_param_key is for a GMT field (eg `EVT_modified_gmt`)
     */
    private bool $is_gmt_field = false;


    /**
     * RestIncomingQueryParamMetadata constructor.
     * You probably want to call
     *
     * @param string                        $query_param_key
     * @param mixed                         $query_param_value
     * @param RestIncomingQueryParamContext $context
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(string $query_param_key, $query_param_value, RestIncomingQueryParamContext $context)
    {
        $this->query_param_key   = $query_param_key;
        $this->query_param_value = $query_param_value;
        $this->context           = $context;
        $this->determineFieldAndTimezone();
    }


    /**
     * Gets the query parameter key. This may have been modified (see setQueryParamValue())
     *
     * @return string
     */
    public function getQueryParamKey(): string
    {
        return $this->query_param_key;
    }


    /**
     * Modifies the query parameter key passed in (Eg this is done when rewriting the simplified specified operator REST
     * query parameters into the legacy structure)
     *
     * @param string|array|int|float $query_param_value
     */
    private function setQueryParamValue($query_param_value)
    {
        $this->query_param_value = $query_param_value;
    }


    /**
     * Gets the original query parameter value passed in.
     *
     * @return mixed
     */
    public function getQueryParamValue()
    {
        return $this->query_param_value;
    }


    /**
     * Gets the context object.
     *
     * @return RestIncomingQueryParamContext
     */
    public function getContext(): RestIncomingQueryParamContext
    {
        return $this->context;
    }


    /**
     * Sets the query parameter key. This may be used to rewrite a key into its non-GMT alternative.
     *
     * @param string $query_param_key
     */
    private function setQueryParamKey(string $query_param_key)
    {
        $this->query_param_key = $query_param_key;
    }


    /**
     * Gets the field the query parameter key indicated. This may be null (in cases where the query parameter key
     * did not indicate a field, eg if it were `OR`).
     *
     * @return EE_Model_Field_Base|null
     */
    public function getField(): ?EE_Model_Field_Base
    {
        return $this->field;
    }


    /**
     * Gets the query parameter key (with the star and everything afterwards removed).
     *
     * @return string
     */
    public function getQueryParamKeySansStars(): string
    {
        return $this->query_param_key_sans_stars;
    }


    /**
     * Gets the timezone associated with this model (the site timezone, except for GMT datetime fields).
     *
     * @return string
     */
    public function getTimezone(): string
    {
        return $this->timezone;
    }


    /**
     * Returns whether this is a GMT field
     *
     * @return bool
     */
    public function isGmtField(): bool
    {
        return $this->is_gmt_field;
    }


    /**
     * Sets the field indicated by the query parameter key (might be null).
     *
     * @param EE_Model_Field_Base|null $field
     */
    private function setField(EE_Model_Field_Base $field = null)
    {
        $this->field = $field;
    }


    /**
     * Sets the query parameter key-with-stars-removed.
     *
     * @param string $query_param_key_sans_stars
     */
    private function setQueryParamKeySansStars(string $query_param_key_sans_stars)
    {
        $this->query_param_key_sans_stars = $query_param_key_sans_stars;
    }


    /**
     * Sets the timezone (this could be a timezone offset string).
     *
     * @param string $timezone
     */
    private function setTimezone(string $timezone)
    {
        $this->timezone = $timezone;
    }


    /**
     * @param bool|int|string|null $is_gmt_field
     */
    private function setIsGmtField($is_gmt_field)
    {
        $this->is_gmt_field = filter_var($is_gmt_field, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * Determines what field, query param name, and query param name without stars, and timezone to use.
     *
     * @return void {
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws Exception
     * @since 4.9.72.p
     * @type EE_Model_Field_Base $field
     */
    private function determineFieldAndTimezone()
    {
        $this->setQueryParamKeySansStars(
            ModelDataTranslator::removeStarsAndAnythingAfterFromConditionQueryParamKey(
                $this->getQueryParamKey()
            )
        );
        $this->setField(
            ModelDataTranslator::deduceFieldFromQueryParam(
                $this->getQueryParamKeySansStars(),
                $this->getContext()->getModel()
            )
        );
        // double-check is it a *_gmt field?
        if (
            ! $this->getField() instanceof EE_Model_Field_Base
            && ModelDataTranslator::isGmtDateFieldName($this->getQueryParamKeySansStars())
        ) {
            // yep, take off '_gmt', and find the field
            $this->setQueryParamKey(ModelDataTranslator::removeGmtFromFieldName($this->getQueryParamKeySansStars()));
            $this->setField(
                ModelDataTranslator::deduceFieldFromQueryParam(
                    $this->getQueryParamKey(),
                    $this->context->getModel()
                )
            );
            $this->setTimezone('UTC');
            $this->setIsGmtField(true);
        } elseif ($this->getField() instanceof EE_Datetime_Field) {
            // so it's not a GMT field. Set the timezone on the model to the default
            $this->setTimezone(EEH_DTT_Helper::get_valid_timezone_string());
        } else {
            // just keep using what's already set for the timezone
            $this->setTimezone($this->context->getModel()->get_timezone());
        }
        $this->assertOnlyAdminCanReadPasswordFields();
    }


    /**
     * Throws an exception if a non-admin is trying to query by password.
     *
     * @throws RestException
     * @since 4.9.74.p
     */
    private function assertOnlyAdminCanReadPasswordFields()
    {
        if (
            $this->getField() instanceof EE_Password_Field
            && ! current_user_can(EE_Restriction_Generator_Base::get_default_restrictions_cap())
        ) {
            // only full admins can query by password. sorry bub!
            throw new RestException(
                'only_admins_can_query_by_password',
                // @codingStandardsIgnoreStart
                esc_html__(
                    'You attempted to filter by a password field without the needed privileges. Only a full admin is allowed to do that.',
                    'event_espresso'
                ),
                // @codingStandardsIgnoreEnd
                [
                    'status' => 403,
                ]
            );
        }
    }


    /**
     * Given a ton of input, determines the value to use for the models.
     *
     * @return mixed
     * @throws DomainException
     * @throws EE_Error
     * @throws RestException
     * @throws DomainException
     * @since 4.9.72.p
     */
    public function determineConditionsQueryParameterValue()
    {
        if ($this->valueIsArrayDuringRead()) {
            return $this->determineModelValueGivenRestInputArray();
        }
        return ModelDataTranslator::prepareFieldValueFromJson(
            $this->getField(),
            $this->getQueryParamValue(),
            $this->getContext()->getRequestedVersion(),
            $this->getTimezone()
        );
    }


    /**
     * Given that the array value provided was itself an array, handles finding the correct value to pass to the model.
     *
     * @return array|null
     * @throws RestException
     * @throws EE_Error
     * @since 4.9.72.p
     * @noinspection PhpStatementHasEmptyBodyInspection
     */
    private function determineModelValueGivenRestInputArray(): ?array
    {
        $this->transformSimplifiedSpecifiedOperatorSyntaxIntoStandardSyntax();
        // did they specify an operator?
        if ($this->valueIsLegacySpecifiedOperator()) {
            $query_param_value = $this->getQueryParamValue();
            $sub_array_key     = $query_param_value[0];
            $translated_value  = [$sub_array_key];
            if ($this->operatorIsNAry($sub_array_key)) {
                $translated_value[] = $this->prepareValuesFromJson($query_param_value[1]);
            } elseif ($this->operatorIsTernary($sub_array_key)) {
                $translated_value[] = [
                    $this->prepareValuesFromJson($query_param_value[1][0]),
                    $this->prepareValuesFromJson($query_param_value[1][1]),
                ];
            } elseif ($this->operatorIsLike($sub_array_key)) {
                // we want to leave this value mostly-as-is (eg don't force it to be a float
                // or a boolean or an enum value. Leave it as-is with wildcards etc)
                // but do verify it at least doesn't have any serialized data
                ModelDataTranslator::throwExceptionIfContainsSerializedData($query_param_value[1]);
                $translated_value[] = $query_param_value[1];
            } elseif ($this->operatorIsUnary($sub_array_key)) {
                // no arguments should have been provided, so don't look for any
            } elseif ($this->operatorIsBinary($sub_array_key)) {
                // it's a valid operator, but none of the exceptions. Treat it normally.
                $translated_value[] = $this->prepareValuesFromJson($query_param_value[1]);
            } else {
                // so they provided a valid operator, but wrong number of arguments
                $this->throwWrongNumberOfArgsExceptionIfDebugging($sub_array_key);
                $translated_value = null;
            }
        } else {
            // so they didn't provide a valid operator
            // if we aren't in debug mode, then just try our best to fulfill the user's request
            $this->throwInvalidOperatorExceptionIfDebugging();
            $translated_value = null;
        }
        return $translated_value;
    }


    /**
     * Returns if this request is a "read" request and the value provided was an array.
     * This will indicate is such things as `array('<', 123)` and `array('IN', array(1,2,3))` are acceptable or not.
     *
     * @return bool
     * @since 4.9.72.p
     */
    private function valueIsArrayDuringRead(): bool
    {
        return ! $this->getContext()->isWriting() && is_array($this->getQueryParamValue());
    }


    /**
     * Returns if the value provided was an associative array (we should have already verified it's an array of some
     * sort). If the value is an associative array, it had better be in the simplified specified operator structure.
     *
     * @return bool
     * @since 4.9.72.p
     */
    private function valueIsAssociativeArray(): bool
    {
        return ! EEH_Array::is_array_numerically_and_sequentially_indexed((array) $this->getQueryParamValue());
    }


    /**
     * Checks if the array value is itself an array that fits into the simplified specified operator structure
     * (eg ["!=" => 123]).
     *
     * @return bool
     * @since 4.9.72.p
     */
    private function valueIsSimplifiedSpecifiedOperator(): bool
    {
        return count($this->getQueryParamValue()) === 1
            && array_key_exists(
                key($this->getQueryParamValue()),
                $this->getContext()->getModel()->valid_operators()
            );
    }


    /**
     * Throws an exception if the sub-value is an array (eg ["!=" => []). It needs to just be a string,
     * of either comma-separated-values, or a JSON array.
     *
     * @param $sub_array_key
     * @param $sub_array_value
     * @throws RestException
     * @since 4.9.72.p
     */
    private function assertSubValueIsntArray($sub_array_key, $sub_array_value)
    {
        if (is_array($sub_array_value) && EED_Core_Rest_Api::debugMode()) {
            throw new RestException(
                'csv_or_json_string_only',
                sprintf(
                /* translators: 1: variable name*/
                    esc_html__(
                        'The value provided for the operator "%1$s" should be comma-separated value string or a JSON array.',
                        'event_espresso'
                    ),
                    $sub_array_key
                ),
                [
                    'status' => 400,
                ]
            );
        }
    }


    /**
     * Determines if the sub-array key is an operator taking 3 or more operators.
     *
     * @param $sub_array_key
     * @return bool
     * @since 4.9.72.p
     */
    private function subArrayKeyIsNonBinaryOperator($sub_array_key): bool
    {
        return array_key_exists(
            $sub_array_key,
            array_merge(
                $this->getContext()->getModel()->valid_in_style_operators(),
                $this->getContext()->getModel()->valid_between_style_operators()
            )
        );
    }


    /**
     * Given that the $sub_array_key is a string, checks if it's an operator taking only 1 argument.
     *
     * @param string $sub_array_key
     * @return bool
     * @since 4.9.72.p
     */
    private function subArrayKeyIsUnaryOperator(string $sub_array_key): bool
    {
        return array_key_exists(
            $sub_array_key,
            $this->getContext()->getModel()->valid_null_style_operators()
        );
    }


    /**
     * Parses the $sub_array_value string into an array (given it could either be a comma-separated-list or a JSON
     * array). eg `"1,2,3"` or `"[1,2,3]"` into `array(1,2,3)`.
     *
     * @param $sub_array_value
     * @return array|mixed|object
     * @since 4.9.72.p
     */
    private function extractQuickStyleSpecifiedOperatorValue($sub_array_value)
    {
        // the value should be JSON or CSV
        $values = json_decode($sub_array_value);
        if (! is_array($values)) {
            $values = array_filter(
                array_map(
                    'trim',
                    explode(
                        ',',
                        $sub_array_value
                    )
                )
            );
        }
        return $values;
    }


    /**
     * Throws an exception if the value isn't a simplified specified operator (only called when we expect that).
     *
     * @throws RestException
     * @since 4.9.72.p
     */
    private function assertSimplifiedSpecifiedOperator()
    {
        if (! $this->valueIsSimplifiedSpecifiedOperator() && EED_Core_Rest_Api::debugMode()) {
            throw new RestException(
                'numerically_indexed_array_of_values_only',
                sprintf(
                /* translators: 1: variable name*/
                    esc_html__(
                        'The array provided for the parameter "%1$s" should be numerically indexed.',
                        'event_espresso'
                    ),
                    $this->getQueryParamKey()
                ),
                [
                    'status' => 400,
                ]
            );
        }
    }


    /**
     * If query_param_value were in the simplified specific operator structure, change it into the legacy structure.
     *
     * @throws RestException
     * @since 4.9.72.p
     */
    private function transformSimplifiedSpecifiedOperatorSyntaxIntoStandardSyntax()
    {
        if ($this->valueIsAssociativeArray()) {
            $this->assertSimplifiedSpecifiedOperator();
            $query_param_value = $this->getQueryParamValue();
            $sub_array_value   = reset($query_param_value);
            $sub_array_key     = key($query_param_value);
            $this->assertSubValueIsntArray($sub_array_key, $sub_array_value);
            // they're doing something like "&where[EVT_ID][IN]=1,2,3" or "&where[EVT_ID][>]=5"
            if ($this->subArrayKeyIsNonBinaryOperator($sub_array_key)) {
                $this->setQueryParamValue(
                    [
                        $sub_array_key,
                        $this->extractQuickStyleSpecifiedOperatorValue($sub_array_value),
                    ]
                );
            } elseif ($this->subArrayKeyIsUnaryOperator($sub_array_key)) {
                $this->setQueryParamValue([$sub_array_key]);
            } else {
                $this->setQueryParamValue([$sub_array_key, $sub_array_value]);
            }
        }
    }


    /**
     * Returns true is the value is an array using the legacy structure to specify the operator. Eg `array('!=',123)`.
     *
     * @return bool
     * @since 4.9.72.p
     */
    private function valueIsLegacySpecifiedOperator(): bool
    {
        $valid_operators   = $this->getContext()->getModel()->valid_operators();
        $query_param_value = $this->getQueryParamValue();
        return isset($query_param_value[0])
            && isset($valid_operators[ $query_param_value[0] ]);
    }


    /**
     * Returns true if the value specified operator accepts arbitrary number of arguments, like "IN".
     *
     * @param $operator
     * @return bool
     * @since 4.9.72.p
     */
    private function operatorIsNAry($operator): bool
    {
        $valueArray = $this->getQueryParamValue();
        return array_key_exists(
            $operator,
            $this->getContext()->getModel()->valid_in_style_operators()
        )
            && isset($valueArray[1])
            && is_array($valueArray[1])
            && ! isset($valueArray[2]);
    }


    /**
     * Returns true if the operator accepts 3 arguments (eg "BETWEEN").
     * So we're looking for a value that looks like
     * `array('BETWEEN', array('2015-01-01T00:00:00', '2016-01-01T00:00:00'))`.
     *
     * @param $operator
     * @return bool
     * @since 4.9.72.p
     */
    private function operatorIsTernary($operator): bool
    {
        $query_param_value = $this->getQueryParamValue();
        return array_key_exists($operator, $this->getContext()->getModel()->valid_between_style_operators())
            && isset($query_param_value[1])
            && is_array($query_param_value[1])
            && isset($query_param_value[1][0], $query_param_value[1][1])
            && ! isset($query_param_value[1][2])
            && ! isset($query_param_value[2]);
    }


    /**
     * Returns true if the operator is a similar to LIKE, indicating the value may have wildcards we should leave alone.
     *
     * @param $operator
     * @return bool
     * @since 4.9.72.p
     */
    private function operatorIsLike($operator): bool
    {
        $query_param_value = $this->getQueryParamValue();
        return array_key_exists($operator, $this->getContext()->getModel()->valid_like_style_operators())
            && isset($query_param_value[1])
            && ! isset($query_param_value[2]);
    }


    /**
     * Returns true if the operator only takes one argument (eg it's like `IS NULL`).
     *
     * @param $operator
     * @return bool
     * @since 4.9.72.p
     */
    private function operatorIsUnary($operator): bool
    {
        $query_param_value = $this->getQueryParamValue();
        return array_key_exists($operator, $this->getContext()->getModel()->valid_null_style_operators())
            && ! isset($query_param_value[1]);
    }


    /**
     * Returns true if the operator specified is a binary operator (eg `=`, `!=`)
     *
     * @param $operator
     * @return bool
     * @since 4.9.72.p
     */
    private function operatorIsBinary($operator): bool
    {
        $query_param_value = $this->getQueryParamValue();
        $model             = $this->getContext()->getModel();
        return isset($query_param_value[1])
            && ! isset($query_param_value[2])
            && ! array_key_exists(
                $operator,
                array_merge(
                    $model->valid_in_style_operators(),
                    $model->valid_null_style_operators(),
                    $model->valid_like_style_operators(),
                    $model->valid_between_style_operators()
                )
            );
    }


    /**
     * If we're debugging, throws an exception saying that the wrong number of arguments was provided.
     *
     * @param $operator
     * @throws RestException
     * @since 4.9.72.p
     */
    private function throwWrongNumberOfArgsExceptionIfDebugging($operator)
    {
        if (EED_Core_Rest_Api::debugMode()) {
            throw new RestException(
                'wrong_number_of_arguments',
                sprintf(
                    esc_html__(
                        'The operator you provided, "%1$s" had the wrong number of arguments',
                        'event_espresso'
                    ),
                    $operator
                ),
                [
                    'status' => 400,
                ]
            );
        }
    }


    /**
     * Wrapper for ModelDataTranslator::prepareFieldValuesFromJson(), just a tad more DRY.
     *
     * @param $value
     * @return mixed
     * @throws RestException
     * @throws EE_Error
     * @since 4.9.72.p
     */
    private function prepareValuesFromJson($value)
    {
        return ModelDataTranslator::prepareFieldValuesFromJson(
            $this->getField(),
            $value,
            $this->getContext()->getRequestedVersion(),
            $this->getTimezone()
        );
    }


    /**
     * Throws an exception if an invalid operator was specified and we're debugging.
     *
     * @throws RestException
     * @since 4.9.72.p
     */
    private function throwInvalidOperatorExceptionIfDebugging()
    {
        // so they didn't provide a valid operator
        if (EED_Core_Rest_Api::debugMode()) {
            throw new RestException(
                'invalid_operator',
                sprintf(
                    esc_html__(
                        'You provided an invalid parameter, with key "%1$s" and value "%2$s"',
                        'event_espresso'
                    ),
                    $this->getQueryParamKey(),
                    $this->getQueryParamValue()
                ),
                [
                    'status' => 400,
                ]
            );
        }
    }


    /**
     * Returns true if the query_param_key was a logic query parameter, eg `OR`, `AND`, `NOT`, `OR*`, etc.
     *
     * @return bool
     * @since 4.9.72.p
     */
    private function isLogicQueryParam(): bool
    {
        return in_array($this->getQueryParamKeySansStars(), $this->getContext()->getModel()->logic_query_param_keys());
    }


    /**
     * If the query param isn't for a field, it must be a nested query parameter which requires different logic.
     *
     * @return array
     * @throws DomainException
     * @throws EE_Error
     * @throws RestException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @since 4.9.72.p
     */
    public function determineNestedConditionQueryParameters(): array
    {
        // so this param doesn't correspond to a field eh?
        if ($this->getContext()->isWriting()) {
            // always tell API clients about invalid parameters when they're creating data. Otherwise,
            // they are probably going to create invalid data
            throw new RestException(
                'invalid_field',
                sprintf(
                /* translators: 1: variable name */
                    esc_html__('You have provided an invalid parameter: "%1$s"', 'event_espresso'),
                    $this->getQueryParamKey()
                )
            );
        }
        // so it's not for a field, is it a logic query param key?
        if ($this->isLogicQueryParam()) {
            return ModelDataTranslator::prepareConditionsQueryParamsForModels(
                $this->getQueryParamValue(),
                $this->getContext()->getModel(),
                $this->getContext()->getRequestedVersion()
            );
        }
        if (EED_Core_Rest_Api::debugMode()) {
            // only tell API clients they got it wrong if we're in debug mode
            // otherwise try our best ot fulfill their request by ignoring this invalid data
            throw new RestException(
                'invalid_parameter',
                sprintf(
                /* translators: 1: variable name */
                    esc_html__(
                        'You provided an invalid parameter, with key "%1$s"',
                        'event_espresso'
                    ),
                    $this->getQueryParamKey()
                ),
                array(
                    'status' => 400,
                )
            );
        }
        return [];
    }
}
// End of file RestQueryParamMetadata.php
// Location: EventEspresso\core\libraries\rest_api/RestQueryParamMetadata.php
