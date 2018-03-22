<?php

/**
 *
 * Class EE_Default_Where_Conditions
 *
 * Strategy specifically for adding where conditions specific to CPT models.
 * This strategy will find the field of type 'EE_Trashed_Flag_Field',
 * and add a condition that it be FALSE on all queries involving the model.
 *
 * @package             Event Espresso
 * @subpackage          core/db_models
 * @author              Mike Nelson
 * @since               4.6.0
 */
class EE_Soft_Delete_Where_Conditions extends EE_Default_Where_Conditions
{

    /**
     * Gets the where default where conditions for a custom post type model
     *
     * @return array like EEM_Base::get_all's $query_params's index [0] (where conditions)
     * @throws EE_Error
     */
    protected function _get_default_where_conditions(): array
    {
        $trashed_field_name = $this->deleted_field_name();
        return [
            $trashed_field_name => false,
        ];
    }


    /**
     * Searches for field on the model of type 'deleted_flag',
     * and returns its name if found,
     *
     * @return string
     * @throws EE_Error
     */
    private function deleted_field_name(): string
    {
        $field = $this->_model->get_a_field_of_type('EE_Trashed_Flag_Field');
        if ($field) {
            return $field->get_name();
        }
        throw new EE_Error(
            sprintf(
                __(
                    'We are trying to find the deleted flag field on %s, but none was found. Are you sure there is a field of type EE_Trashed_Flag_Field in %s constructor?',
                    'event_espresso'
                ),
                get_class($this),
                get_class($this)
            )
        );
    }
}
