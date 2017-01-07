<?php

require_once(EE_MODELS . 'fields/EE_DB_Only_Field_Base.php');

class EE_DB_Only_Int_Field extends EE_DB_Only_Field_Base
{
    protected $_schema_type = 'integer';
}