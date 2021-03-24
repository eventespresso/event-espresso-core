<?php

/**
 * Class EE_CPT_Minimum_Where_Conditions
 * Strategy specifically for adding where conditions specific to CPT models.
 * But only sets the minimum, so any row of the right type will get used
 *
 * @package             Event Espresso
 * @subpackage          core/db_models
 * @author              Mike Nelson
 * @since               4.8.29.rc.010
 */
class EE_CPT_Minimum_Where_Conditions extends EE_Default_Where_Conditions
{

    /**
     * @var string
     */
    protected $_post_type;

    /**
     * @var string
     */
    protected $_meta_field;


    /**
     * EE_CPT_Minimum_Where_Conditions constructor.
     *
     * @param string $post_type
     * @param string $meta_field_to_chk
     */
    public function __construct(string $post_type, string $meta_field_to_chk = '')
    {
        $this->_post_type  = $post_type;
        $this->_meta_field = $meta_field_to_chk;
        parent::__construct();
    }


    /**
     * Gets the field with the specified column. Note, this function might not
     * work properly if two fields refer to columns with the same name on
     * different tables
     *
     * @param string $column column name
     * @return EE_Model_Field_Base
     * @throws EE_Error
     */
    protected function _get_field_on_column(string $column): EE_Model_Field_Base
    {
        $all_fields = $this->_model->field_settings(true);
        foreach ($all_fields as $field_name => $field_obj) {
            if ($column == $field_obj->get_table_column()) {
                return $field_obj;
            }
        }
        throw new EE_Error(
            sprintf(
                esc_html__(
                    'Could not find a valid field for the supplied "" column.',
                    'event_espresso'
                ),
                $column
            )
        );
    }


    /**
     * Gets the where default where conditions for a custom post type model
     *
     * @return array
     * @throws EE_Error
     * @see https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md#0-where-conditions
     */
    protected function _get_default_where_conditions(): array
    {
        // find post_type field
        $post_type_field = $this->_get_field_on_column('post_type');
        return [
            $post_type_field->get_name() => $this->_post_type
        ];
    }
}
