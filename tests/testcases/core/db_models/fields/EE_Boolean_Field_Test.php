<?php
defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * Class EE_Boolean_Field_Test
 * Description here
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * 
 * @group                 model_fields
 * @group                 models
 */
class EE_Boolean_Field_Test extends EE_UnitTestCase
{

    /**
     * holds the field being tested
     * @var EE_Boolean_Field
     */
    protected $_field;

    public function setUp()
    {
        parent::setUp();
        $this->_field = EEM_Checkin::instance()->field_settings_for('CHK_in');
        $this->assertInstanceOf('EE_Boolean_Field', $this->_field);
    }


    public function tearDown()
    {
        $this->_field = null;
        parent::tearDown();
    }


    public function test_getSchemaType()
    {
        $this->assertEquals('boolean', $this->_field->getSchemaType());
    }


    public function test_prepare_for_pretty_echoing()
    {
        $this->assertEquals(esc_html__('Yes', 'event_espresso'), $this->_field->prepare_for_pretty_echoing(true));
        $this->assertEquals(esc_html__('No', 'event_espresso'), $this->_field->prepare_for_pretty_echoing(false));
    }

    public function test_get_wpdb_data_type()
    {
        $this->assertEquals('%d', $this->_field->get_wpdb_data_type());
    }
}
