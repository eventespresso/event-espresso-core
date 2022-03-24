<?php

/**
 * EE_None_Where_Conditions
 * Adds a where condition which makes it so NO rows will eb returned.
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Mike Nelson
 */
class EE_Return_None_Where_Conditions extends EE_Default_Where_Conditions
{
    /**
     * @return array[]
     * @throws EE_Error
     */
    protected function _get_default_where_conditions(): array
    {
        if ($this->_model->has_primary_key_field()) {
            return [$this->_model->primary_key_name() => ['<', 0]];
        }
        $fk_field = $this->_model->get_a_field_of_type('EE_Foreign_Key_Field_Base');
        return [
            'AND*impossible' => [
                $fk_field->get_name() => ['IS_NULL'],
                $fk_field->get_name() => 'IS_NOT_NULL',
            ],
        ];
    }
}
