<?php

abstract class EE_Primary_Key_Field_Base extends EE_Field_With_Model_Name
{
    /**
     * Overrides parent so it doesn't need to provide so many non-applicable fields
     *
     * @param string $table_column
     * @param string $nicename
     */
    public function __construct($table_column, $nicename, $default)
    {
        parent::__construct($table_column, $nicename, false, $default, '');
    }


    /**
     * @param string $table_alias
     * @param string $name
     * @param string $model_name
     */
    public function _construct_finalize(string $table_alias, string $name, string $model_name)
    {
        $this->_model_name_pointed_to = $model_name;
        parent::_construct_finalize($table_alias, $name, $model_name);
    }
}
