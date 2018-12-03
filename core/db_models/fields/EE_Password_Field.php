<?php

/**
 * Class EE_Password_Field
 *
 * Field to describe a password that grants access to certain other fields on this model.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.9.74.p
 *
 */
class EE_Password_Field extends EE_Text_Field_Base
{
    /**
     * @var array
     */
    protected $protected_fields;

    /**
     * EE_Password_Field constructor.
     * @param $table_column
     * @param $nicename
     * @param $nullable
     * @param null $default_value
     * @param array $protected_fields
     */
    public function __construct($table_column, $nicename, $nullable, $default_value = null, $protected_fields = array())
    {
        $this->protected_fields = $protected_fields;
        parent::__construct($table_column, $nicename, $nullable, $default_value);
    }

    /**
     * Returns the names of the fields on this model that this password field should protect
     * @since 4.9.74.p
     * @return array
     */
    public function protectedFields()
    {
        return $this->protected_fields;
    }

    /**
     * Returns whether or not the specified field is protected by this model
     * @since 4.9.74.p
     * @param $field_name
     * @return bool
     */
    public function fieldIsProtected($field_name)
    {
        return in_array($field_name, $this->protectedFields(), true);
    }
}
// End of file EE_Password_Field.php
// Location: ${NAMESPACE}/EE_Password_Field.php
