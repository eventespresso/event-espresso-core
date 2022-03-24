<?php

use EventEspresso\core\services\json\JsonDataHandler;

class EE_JSON_Field extends EE_Model_Field_Base
{
    /**
     * @var JsonDataHandler
     */
    private $json_data_handler;


    /**
     * @param string $table_column
     * @param string $nicename
     * @param bool   $nullable
     * @param null   $default_value
     */
    public function __construct(
        $table_column,
        $nicename,
        $nullable,
        $default_value = null
    ) {
        $this->json_data_handler = new JsonDataHandler();
        $this->json_data_handler->configure(
            JsonDataHandler::DATA_TYPE_OBJECT
        );
        parent::__construct($table_column, $nicename, $nullable, $default_value);
    }


    // /**
    //  * When get() is called on a model object (eg EE_Event), before returning its value,
    //  * call this function on it, allowing us to customize the returned value based on
    //  * the field's type. Eg, we may want to unserialize it, strip tags, etc. By default,
    //  * we simply return it.
    //  *
    //  * @param mixed $value_of_field_on_model_object
    //  * @return mixed
    //  */
    // public function prepare_for_get($value_of_field_on_model_object)
    // {
    //     // return $this->json_data_handler->decodeJson($value_of_field_on_model_object);
    //     return $value_of_field_on_model_object;
    // }


    /**
     * When creating a brand-new model object, or setting a particular value for one of its fields, this function
     * is called before setting it on the model object. We may want to strip slashes, unserialize the value, etc.
     * By default, we do nothing.
     *
     * If the model field is going to perform any validation on the input, this is where it should be done
     * (once the value is on the model object, it may be used in other ways besides putting it into the DB
     * so it's best to validate it right away).
     *
     * @param mixed $value_inputted_for_field_on_model_object
     * @return string
     */
    public function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        return $this->json_data_handler->encodeData($value_inputted_for_field_on_model_object);
    }


    /**
     * When inserting or updating a field on a model object, run this function on each
     * value to prepare it for insertion into the db. Generally this converts
     * the validated input on the model object into the format used in the DB.
     *
     * @param mixed $value_of_field_on_model_object
     * @return string
     */
    public function prepare_for_use_in_db($value_of_field_on_model_object)
    {
        return $this->json_data_handler->encodeData($value_of_field_on_model_object);
    }
}
