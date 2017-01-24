<?php
defined('EVENT_ESPRESSO_VERSION') || exit;

class EE_Foreign_Key_Int_Field extends EE_Foreign_Key_Field_Base
{

    /**
     * @param string  $table_column  name fo column for field
     * @param string  $nicename      should eb internationalized with __('blah','event_espresso')
     * @param boolean $nullable
     * @param mixed   $default_value if this is a integer field, it shoudl be an int. if it's a string field, it shoul
     *                               dbe a string
     * @param string  $model_name    eg 'Event','Answer','Term', etc. Basically its the model class's name without the
     *                               "EEM_"
     */
    public function __construct($table_column, $nicename, $nullable, $default_value, $model_name)
    {
        parent::__construct($table_column, $nicename, $nullable, $default_value, $model_name);
        $this->setSchemaType('integer');
    }


    /**
     * @param int|EE_Base_Class $value_inputted_for_field_on_model_object
     * @return int
     */
    function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        if ($this->is_model_obj_of_type_pointed_to($value_inputted_for_field_on_model_object)) {
            $value_inputted_for_field_on_model_object = $value_inputted_for_field_on_model_object->ID();
        }
        return absint($value_inputted_for_field_on_model_object);
    }

    function prepare_for_set_from_db($value_found_in_db_for_model_object)
    {
        return intval($value_found_in_db_for_model_object);
    }

}