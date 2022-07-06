<?php
defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * Tests for the EE_Maybe_Serialized_Simple_HTML_Field class
 *
 * @package    Event Espresso
 * @subpackage tests
 * @author     Darren Ethier
 * @since      4.9.26.rc.000
 * @group   model_fields
 * @group   models
 */
class EE_Maybe_Serialized_Simple_HTML_Field_Test extends EE_UnitTestCase
{

    /**
     * holds the field being tested
     * @var EE_Maybe_Serialized_Simple_HTML_Field
     */
    protected $_field;

    public function set_up()
    {
        parent::set_up();
        $this->_field = EEM_Answer::instance()->field_settings_for('ANS_value');
        $this->assertInstanceOf('EE_Maybe_Serialized_Simple_HTML_Field', $this->_field);
    }


    public function tear_down()
    {
        $this->_field = null;
        parent::tear_down();
    }


    public function test_getSchemaType()
    {
        $this->assertEquals(array('object','string'), $this->_field->getSchemaType());
    }

    public function test_get_wpdb_data_type()
    {
        $this->assertEquals('%s', $this->_field->get_wpdb_data_type());
    }
}