<?php
require_once(EE_MODELS . 'fields/EE_Boolean_Field.php');

class EE_Trashed_Flag_Field extends EE_Boolean_Field
{
    //note: some client code simply checks if a field IS an EE_Trashed_Flag_Field
    //...otherwise, these fields are mostly the same as boolean fields
}
