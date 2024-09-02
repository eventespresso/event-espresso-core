<?php

/**
 * Class EE_Password_Field
 * Field to describe a password that grants access to certain other fields on this model.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.74.p
 */
class EE_Password_Field extends EE_Text_Field_Base
{
    protected array $protected_fields;


    /**
     * EE_Password_Field constructor.
     *
     * @param       $table_column
     * @param       $nicename
     * @param       $nullable
     * @param null  $default_value
     * @param array $protected_fields
     */
    public function __construct(
        $table_column,
        $nicename,
        $nullable,
        $default_value = null,
        array $protected_fields =
        []
    ) {
        $this->protected_fields = $protected_fields;
        parent::__construct($table_column, $nicename, $nullable, $default_value);
    }


    /**
     * Returns the names of the fields on this model that this password field should protect
     *
     * @return array
     * @since 4.9.74.p
     */
    public function protectedFields(): array
    {
        return $this->protected_fields;
    }


    /**
     * Returns whether or not the specified field is protected by this model
     *
     * @param $field_name
     * @return bool
     * @since 4.9.74.p
     */
    public function fieldIsProtected($field_name): bool
    {
        return in_array($field_name, $this->protectedFields(), true);
    }
}
// Location: ${NAMESPACE}/EE_Password_Field.php
