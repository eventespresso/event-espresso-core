<?php

class EE_DB_Only_Float_Field extends EE_DB_Only_Field_Base
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
        $this->setSchemaType('number');
    }
}
