<?php
defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * Tests for the EE_All_Caps_Text_Field class
 *
 * @package    Event Espresso
 * @subpackage tests
 * @author     Darren Ethier
 * @since      4.9.26.rc.000
 * @group   model_fields
 * @group   models
 */
class EE_All_Caps_Text_Field_Test extends EE_UnitTestCase
{

    /**
     * holds the field being tested
     * @var EE_All_Caps_Text_Field
     */
    protected $_field;

    public function set_up()
    {
        parent::set_up();
        $this->_field = EEM_Payment::instance()->field_settings_for('PAY_source');
        $this->assertInstanceOf('EE_All_Caps_Text_Field', $this->_field);
    }


    public function tear_down()
    {
        $this->_field = null;
        parent::tear_down();
    }


    public function test_getSchemaType()
    {
        $this->assertEquals('string', $this->_field->getSchemaType());
    }

    public function test_get_wpdb_data_type()
    {
        $this->assertEquals('%s', $this->_field->get_wpdb_data_type());
    }
}