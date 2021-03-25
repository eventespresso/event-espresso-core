<?php

/**
 * Class EE_Default_Where_Conditions
 * Strategy specifically for adding where conditions specific to CPT models.
 *
 * @package             Event Espresso
 * @subpackage          core/db_models
 * @author              Mike Nelson
 * * @since            4.6.0
 */
class EE_CPT_Where_Conditions extends EE_CPT_Minimum_Where_Conditions
{

    /**
     * Gets the where default where conditions for a custom post type model
     *
     * @return array
     * @throws EE_Error
     * @see https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md#0-where-conditions
     */
    protected function _get_default_where_conditions(): array
    {
        $status_field = $this->_get_field_on_column('post_status');
        return array_merge(
            parent::_get_default_where_conditions(),
            [
                $status_field->get_name() => ['NOT IN', ['auto-draft', 'trash']]
            ]
        );
    }
}
