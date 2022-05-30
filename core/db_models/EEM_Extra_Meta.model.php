<?php

/**
 * Extra Meta Model
 *
 * This is meta info which can be potentially attached to any model with a integer primary key.
 * (If they have a string primary key, some further development will be needed in the code).
 * Querying on this meta data is cumbersome and difficult, but this can be used
 * to attach any arbitrary information onto any model desired.
 *
 * @package         Event Espresso
 * @subpackage      includes/models/
 * @author              Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
class EEM_Extra_Meta extends EEM_Base
{
    // private instance of the Attendee object
    protected static $_instance = null;

    protected function __construct($timezone = null)
    {
        $this->singular_item = esc_html__('Extra Meta', 'event_espresso');
        $this->plural_item = esc_html__('Extra Metas', 'event_espresso');
        $this->_tables = array(
            'Extra_Meta' => new EE_Primary_Table('esp_extra_meta', 'EXM_ID')
        );
        $models_this_can_attach_to = array_keys(EE_Registry::instance()->non_abstract_db_models);
        $this->_fields = array(
            'Extra_Meta' => array(
                'EXM_ID' => new EE_Primary_Key_Int_Field('EXM_ID', esc_html__("Extra Meta ID", "event_espresso")),
                'OBJ_ID' => new EE_Foreign_Key_Int_Field('OBJ_ID', esc_html__("Primary Key of Attached Thing", "event_espresso"), false, 0, $models_this_can_attach_to),
                'EXM_type' => new EE_Any_Foreign_Model_Name_Field('EXM_type', esc_html__("Model of Attached Thing", "event_espresso"), false, 'Transaction', $models_this_can_attach_to),
                'EXM_key' => new EE_Plain_Text_Field('EXM_key', esc_html__("Meta Key", "event_espresso"), false, ''),
                'EXM_value' => new EE_Maybe_Serialized_Text_Field('EXM_value', esc_html__("Meta Value", "event_espresso"), true)

            ));
        $this->_model_relations = array();
        foreach ($models_this_can_attach_to as $model) {
            $this->_model_relations[ $model ] = new EE_Belongs_To_Any_Relation();
        }
        foreach ($this->cap_contexts_to_cap_action_map() as $cap_context => $action) {
            $this->_cap_restriction_generators[ $cap_context ] = new EE_Restriction_Generator_Meta('EXM_key', 'EXM_value');
        }
        parent::__construct($timezone);
    }
}
