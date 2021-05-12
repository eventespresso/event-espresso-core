<?php

/**
 * Parent field class for any fields which accept a parameter of a model name.
 * Originally this was just foreign keys, but EE_Any_Foreign_Model_name_Field (which works
 * with the EE_Foreign_Key_Field to create a relation between any two models)
 * also required basically the exact same functionality, except NOT be a foreign key.
 */
abstract class EE_Field_With_Model_Name extends EE_Model_Field_Base
{
    /**
     * Usually the name of a single model. However, as in the case for custom post types,
     * it can actually be an array of models
     *
     * @var string|string[]
     */
    protected $_model_name_pointed_to;


    /**
     * @param string       $table_column  name fo column for field
     * @param string       $nice_name     should be internationalized with esc_html__('blah','event_espresso')
     * @param boolean      $nullable
     * @param mixed        $default_value if this is a integer field, it should be an int.
     *                                    if it's a string field, it should be a string
     * @param string|array $model_name    eg 'Event', 'Answer', 'Term', etc.
     *                                    Basically its the model class's name without the "EEM_"
     */
    public function __construct($table_column, $nice_name, $nullable, $default_value, $model_name)
    {
        $this->_model_name_pointed_to = $model_name;
        parent::__construct($table_column, $nice_name, $nullable, $default_value);
    }


    /**
     * Returns the name of the model(s) pointed to
     *
     * @return string|string[]
     * @deprecated since version 4.6.7
     */
    public function get_model_name_pointed_to()
    {
        EE_Error::doing_it_wrong(
            'get_model_name_pointed_to',
            esc_html__(
                'This method has been deprecated in favour of instead using get_model_names_pointed_to, which consistently returns an array',
                'event_espresso'
            ),
            '4.6.7'
        );
        return $this->_model_name_pointed_to;
    }


    /**
     * Gets the model names pointed to by this field, always as an array
     * (even if there's only one)
     *
     * @return string|string[] of model names pointed to by this field
     */
    public function get_model_names_pointed_to()
    {
        if (is_array($this->_model_name_pointed_to)) {
            return $this->_model_name_pointed_to;
        } else {
            return [$this->_model_name_pointed_to];
        }
    }


    /**
     * Returns the model's classname (eg EE_Event instead of just Event)
     *
     * @return string[]
     */
    public function get_model_class_names_pointed_to(): array
    {
        $model_names = [];
        if (is_array($this->_model_name_pointed_to)) {
            foreach ($this->_model_name_pointed_to as $model_name) {
                $model_names[] = "EE_" . $model_name;
            }
        } else {
            $model_names = ["EE_" . $this->_model_name_pointed_to];
        }
        return $model_names;
    }


    /**
     * @param $model_obj_or_ID
     * @return bool
     */
    public function is_model_obj_of_type_pointed_to($model_obj_or_ID): bool
    {
        foreach ($this->get_model_class_names_pointed_to() as $model_obj_classname) {
            if ($model_obj_or_ID instanceof $model_obj_classname) {
                return true;
            }
        }
        return false;
    }
}
