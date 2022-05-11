<?php
defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * Tests for the EE_Simple_HTML_Field class
 *
 * @package    Event Espresso
 * @subpackage tests
 * @author     Darren Ethier
 * @since      4.9.26.rc.000
 * @group   model_fields
 * @group   models
 */
class EE_Simple_HTML_Field_Test extends EE_UnitTestCase
{

    /**
     * holds the field being tested
     * @var EE_Simple_HTML_Field
     */
    protected $_field;

    public function set_up()
    {
        parent::set_up();
        $this->_field = EEM_Event::instance()->field_settings_for('EVT_short_desc');
        $this->assertInstanceOf('EE_Simple_HTML_Field', $this->_field);
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

    public function test_prepare_for_set_with_valid_html()
    {
        $valid_html = 'Hey! <a href="">This should stay.</a>';
        $this->assertEquals($valid_html, $this->_field->prepare_for_set($valid_html));
    }


    public function test_prepare_for_set_with_invalid_partial_html_tag()
    {
        $invalid_html = 'Hey! <img onload=prompt(document.domain)//';
        $expected_result = 'Hey! &lt;img onload=prompt(document.domain)//';
        $this->assertEquals($expected_result, $this->_field->prepare_for_set($invalid_html));
    }


    public function test_prepare_for_set_with_invalid_full_html_tag()
    {
        $invalid_html = 'Hey! <img onload=prompt(document.domain)></img>';
        $expected_result = 'Hey! ';
        $this->assertEquals($expected_result, $this->_field->prepare_for_set($invalid_html));
    }
}