<?php

use EventEspresso\core\services\orm\model_field\SchemaType;

/**
 * Text_Fields is a base class for any fields which are have text value. (Exception: foreign and private key fields.
 * Wish PHP had multiple-inheritance for this...)
 */
abstract class EE_Text_Field_Base extends EE_Model_Field_Base
{
    /**
     * @param string $table_column
     * @param string $nicename
     * @param bool   $nullable
     * @param null   $default_value
     */
    public function __construct($table_column, $nicename, $nullable, $default_value = null)
    {
        parent::__construct($table_column, $nicename, $nullable, $default_value);
        $this->setSchemaType(SchemaType::STRING);
    }


    /**
     * Gets the value in the format expected when being set.
     * For display on the front-end, usually you would use prepare_for_pretty_echoing() instead.
     *
     * @param mixed $value_of_field_on_model_object
     * @return mixed|string
     */
    public function prepare_for_get($value_of_field_on_model_object)
    {
        if ($value_of_field_on_model_object === null) {
            return $this->is_nullable() ? null : '';
        }
        return $value_of_field_on_model_object;
    }


    /**
     * Accepts schema of 'form_input' which formats the string for echoing in form input's value.
     *
     * @param mixed       $value_on_field_to_be_outputted
     * @param string|null $schema
     * @return string
     */
    public function prepare_for_pretty_echoing($value_on_field_to_be_outputted, ?string $schema = null)
    {
        if ($schema === 'form_input') {
            $value_on_field_to_be_outputted = htmlentities(
                (string) $value_on_field_to_be_outputted,
                ENT_QUOTES,
                'UTF-8'
            );
        }
        return parent::prepare_for_pretty_echoing($value_on_field_to_be_outputted);
    }


    /**
     * Data received from the user should be exactly as they hope to save it in the DB, with the exception that
     * quotes need to have slashes added to it. This method takes care of removing the slashes added by WP
     * in magic-quotes fashion. We used to call html_entity_decode on the value here,
     * because we called htmlentities when in EE_Text_Field_Base::prepare_for_pretty_echoing, but that's not necessary
     * because web browsers always decode HTML entities in element attributes, like a form element's value attribute.
     * So if we do it again here, we'll be removing HTML entities the user intended to have.)
     *
     * @param string|null $value_inputted_for_field_on_model_object
     * @return string
     */
    public function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        return stripslashes((string) parent::prepare_for_set($value_inputted_for_field_on_model_object));
    }
}
