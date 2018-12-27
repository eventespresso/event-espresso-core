<?php

namespace EventEspresso\core\domain\values\model;

use InvalidArgumentException;

/**
 * CustomSelects
 * VO for model system that receives a formatted array for custom select part of a a query and can be used by the model
 * to build the various query parts.
 * This includes accomplishing things like `COUNT(Registration.REG_ID) as registration_cound` or
 * `SUM(Transaction.TXN_total) as TXN_sum`
 *
 * @package EventEspresso\core\domain\values\model
 * @author  Darren Ethier
 * @since   4.9.57.p
 */
class CustomSelects
{
    const TYPE_SIMPLE = 'simple';
    const TYPE_COMPLEX = 'complex';
    const TYPE_STRUCTURED = 'structured';

    private $valid_operators = array('COUNT', 'SUM');


    /**
     * Original incoming select array
     *
     * @var array
     */
    private $original_selects;

    /**
     * Select string that can be added to the query
     *
     * @var string
     */
    private $columns_to_select_expression;


    /**
     * An array of aliases for the columns included in the incoming select array.
     *
     * @var array
     */
    private $column_aliases_in_select;


    /**
     * Enum representation of the "type" of array coming into this value object.
     *
     * @var string
     */
    private $type = '';


    /**
     * CustomSelects constructor.
     * Incoming selects can be in one of the following formats:
     * ---- self::TYPE_SIMPLE array ----
     * This is considered the "simple" type. In this case the array is an numerically indexed array with single or
     * multiple columns to select as the values.
     * eg. array( 'ATT_ID', 'REG_ID' )
     * eg. array( '*' )
     * If you want to use the columns in any WHERE, GROUP BY, or HAVING clauses, you must instead use the "complex" or
     * "structured" method.
     * ---- self::TYPE_COMPLEX array ----
     * This is considered the "complex" type.  In this case the array is indexed by arbitrary strings that serve as
     * column alias, and the value is an numerically indexed array where there are two values.  The first value (0) is
     * the selection and the second value (1) is the data type.  Data types must be one of the types defined in
     * EEM_Base::$_valid_wpdb_data_types.
     * eg. array( 'count' => array('count(REG_ID)', '%d') )
     * Complex array configuration allows for using the column alias in any WHERE, GROUP BY, or HAVING clauses.
     * ---- self::TYPE_STRUCTURED array ---
     * This is considered the "structured" type. This type is similar to the complex type except that the array attached
     * to the column alias contains three values.  The first value is the qualified column name (which can include
     * join syntax for models).  The second value is the operator performed on the column (i.e. 'COUNT', 'SUM' etc).,
     * the third value is the data type.  Note, if the select does not have an operator, you can use an empty string for
     * the second value.
     * Note: for now SUM is only for simple single column expressions (i.e. SUM(Transaction.TXN_total))
     * eg. array( 'registration_count' => array('Registration.REG_ID', 'count', '%d') );
     * NOTE: mixing array types in the incoming $select will cause errors.
     *
     * @param array $selects
     * @throws InvalidArgumentException
     */
    public function __construct(array $selects)
    {
        $this->original_selects = $selects;
        $this->deriveType($selects);
        $this->deriveParts($selects);
    }


    /**
     * Derives what type of custom select has been sent in.
     *
     * @param array $selects
     * @throws InvalidArgumentException
     */
    private function deriveType(array $selects)
    {
        // first if the first key for this array is an integer then its coming in as a simple format, so we'll also
        // ensure all elements of the array are simple.
        if (is_int(key($selects))) {
            // let's ensure all keys are ints
            $invalid_keys = array_filter(
                array_keys($selects),
                function ($value) {
                    return ! is_int($value);
                }
            );
            if (! empty($invalid_keys)) {
                throw new InvalidArgumentException(
                    sprintf(
                        esc_html__(
                            'Incoming array looks like its formatted for "%1$s" type selects, however it has elements that are not indexed numerically',
                            'event_espresso'
                        ),
                        self::TYPE_SIMPLE
                    )
                );
            }
            $this->type = self::TYPE_SIMPLE;
            return;
        }
        // made it here so that means we've got either complex or structured selects.  Let's find out which by popping
        // the first array element off.
        $first_element = reset($selects);

        if (! is_array($first_element)) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        'Incoming array looks like its formatted as a "%1$s" or "%2$s" type.  However, the values in the array must be arrays themselves and they are not.',
                        'event_espresso'
                    ),
                    self::TYPE_COMPLEX,
                    self::TYPE_STRUCTURED
                )
            );
        }
        $this->type = count($first_element) === 2
            ? self::TYPE_COMPLEX
            : self::TYPE_STRUCTURED;
    }


    /**
     * Sets up the various properties for the vo depending on type.
     *
     * @param array $selects
     * @throws InvalidArgumentException
     */
    private function deriveParts(array $selects)
    {
        $column_parts = array();
        switch ($this->type) {
            case self::TYPE_SIMPLE:
                $column_parts = $selects;
                $this->column_aliases_in_select = $selects;
                break;
            case self::TYPE_COMPLEX:
                foreach ($selects as $alias => $parts) {
                    $this->validateSelectValueForType($parts, $alias);
                    $column_parts[] = "{$parts[0]} AS {$alias}";
                    $this->column_aliases_in_select[] = $alias;
                }
                break;
            case self::TYPE_STRUCTURED:
                foreach ($selects as $alias => $parts) {
                    $this->validateSelectValueForType($parts, $alias);
                    $column_parts[] = $parts[1] !== ''
                        ? $this->assembleSelectStringWithOperator($parts, $alias)
                        : "{$parts[0]} AS {$alias}";
                    $this->column_aliases_in_select[] = $alias;
                }
                break;
        }
        $this->columns_to_select_expression = implode(', ', $column_parts);
    }


    /**
     * Validates self::TYPE_COMPLEX and self::TYPE_STRUCTURED select statement parts.
     *
     * @param array  $select_parts
     * @param string $alias
     * @throws InvalidArgumentException
     */
    private function validateSelectValueForType(array $select_parts, $alias)
    {
        $valid_data_types = array('%d', '%s', '%f');
        if (count($select_parts) !== $this->expectedSelectPartCountForType()) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        'The provided select part array for the %1$s column is expected to have a count of %2$d because the incoming select array is of type %3$s.  However the count was %4$d.',
                        'event_espresso'
                    ),
                    $alias,
                    $this->expectedSelectPartCountForType(),
                    $this->type,
                    count($select_parts)
                )
            );
        }
        // validate data type.
        $data_type = $this->type === self::TYPE_COMPLEX ? $select_parts[1] : '';
        $data_type = $this->type === self::TYPE_STRUCTURED ? $select_parts[2] : $data_type;

        if (! in_array($data_type, $valid_data_types, true)) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        'Datatype %1$s (for selection "%2$s" and alias "%3$s") is not a valid wpdb datatype (eg %%s)',
                        'event_espresso'
                    ),
                    $data_type,
                    $select_parts[0],
                    $alias,
                    implode(', ', $valid_data_types)
                )
            );
        }
    }


    /**
     * Each type will have an expected count of array elements, this returns what that expected count is.
     *
     * @param string $type
     * @return int
     */
    private function expectedSelectPartCountForType($type = '')
    {
        $type = $type === '' ? $this->type : $type;
        $types_count_map = array(
            self::TYPE_COMPLEX    => 2,
            self::TYPE_STRUCTURED => 3,
        );
        return isset($types_count_map[ $type ]) ? $types_count_map[ $type ] : 0;
    }


    /**
     * Prepares the select statement part for for structured type selects.
     *
     * @param array  $select_parts
     * @param string $alias
     * @return string
     * @throws InvalidArgumentException
     */
    private function assembleSelectStringWithOperator(array $select_parts, $alias)
    {
        $operator = strtoupper($select_parts[1]);
        // validate operator
        if (! in_array($operator, $this->valid_operators, true)) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        'An invalid operator has been provided (%1$s) for the column %2$s.  Valid operators must be one of the following: %3$s.',
                        'event_espresso'
                    ),
                    $operator,
                    $alias,
                    implode(', ', $this->valid_operators)
                )
            );
        }
        return $operator . '(' . $select_parts[0] . ') AS ' . $alias;
    }


    /**
     * Return the datatype from the given select part.
     * Remember the select_part has already been validated on object instantiation.
     *
     * @param array $select_part
     * @return string
     */
    private function getDataTypeForSelectType(array $select_part)
    {
        switch ($this->type) {
            case self::TYPE_COMPLEX:
                return $select_part[1];
            case self::TYPE_STRUCTURED:
                return $select_part[2];
            default:
                return '';
        }
    }


    /**
     * Returns the original select array sent into the VO.
     *
     * @return array
     */
    public function originalSelects()
    {
        return $this->original_selects;
    }


    /**
     * Returns the final assembled select expression derived from the incoming select array.
     *
     * @return string
     */
    public function columnsToSelectExpression()
    {
        return $this->columns_to_select_expression;
    }


    /**
     * Returns all the column aliases derived from the incoming select array.
     *
     * @return array
     */
    public function columnAliases()
    {
        return $this->column_aliases_in_select;
    }


    /**
     * Returns the enum type for the incoming select array.
     *
     * @return string
     */
    public function type()
    {
        return $this->type;
    }


    /**
     * Return the datatype for the given column_alias
     *
     * @param string $column_alias
     * @return string  (if there's no data type we return string as the default).
     */
    public function getDataTypeForAlias($column_alias)
    {
        if (isset($this->original_selects[ $column_alias ])
            && in_array($column_alias, $this->columnAliases(), true)
        ) {
            return $this->getDataTypeForSelectType($this->original_selects[ $column_alias ]);
        }
        return '%s';
    }
}
