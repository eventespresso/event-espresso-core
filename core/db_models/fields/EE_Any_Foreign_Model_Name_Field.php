<?php
require_once(EE_MODELS . 'fields/EE_DB_Only_Field_Base.php');

/**
 * Used by EE_Belongs_To_Any_Relations and EE_Has_Many_Any_Relations to identify the model the foreign key points to.
 * Note: the array of model names on this field should match the array of model names on the
 * foreign key this field works with. Eg
 * $this->_fields = array(
 * 'obj_id'=>new EE_Foreign_Key_Int_Field('obj_id_column',__('Related Object
 * ID'),false,0,array('Registration','Transaction')),
 * 'obj_type'=>new EE_Any_Foreign_Model_Name_Field('obj_type_column',__('Related Object
 * type'),false,null,array('Registration','Transaction')));
 */
class EE_Any_Foreign_Model_Name_Field extends EE_Field_With_Model_Name
{
}