<?php

/**
 * Text_Fields is a base class for any fields which are have text value. (Exception: foreign and private key fields.
 * Wish PHP had multiple-inheritance for this...)
 */
abstract class EE_Text_Field_Base extends EE_Model_Field_Base
{

    function prepare_for_get($value_of_field_on_model_object)
    {
        return is_string($value_of_field_on_model_object) ? stripslashes($value_of_field_on_model_object) : $value_of_field_on_model_object;
    }

    /**
     * Accepts schema of 'form_input' which formats the string for echoing in form input's value.
     *
     * @param string $value_on_field_to_be_outputted
     * @param string $schema
     * @return string
     */
    function prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema = null)
    {
        if ($schema == 'form_input') {
            $value_on_field_to_be_outputted = htmlentities($value_on_field_to_be_outputted, ENT_QUOTES, 'UTF-8');
        }
        return parent::prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema);
    }

    /**
     * In form inputs, we should have called htmlentities and addslashes on form inputs,
     * so we need to undo that on setting of these fields
     *
     * @param string $value_inputted_for_field_on_model_object
     * @return string
     */
    function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        return stripslashes(html_entity_decode(parent::prepare_for_set($value_inputted_for_field_on_model_object),
            ENT_QUOTES, 'UTF-8'));
    }
}