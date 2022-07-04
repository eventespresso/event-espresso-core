<?php
defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * Tests for the EE_Post_Content_Field class
 *
 * @package    Event Espresso
 * @subpackage tests
 * @author     Darren Ethier
 * @since      4.9.26.rc.000
 * @group      model_fields
 * @group      models
 */
class EE_Post_Content_Field_Test extends EE_UnitTestCase
{

    /**
     * holds the field being tested
     *
     * @var EE_Post_Content_Field
     */
    protected $_field;

    public function set_up()
    {
        parent::set_up();
        $this->_field = EEM_Event::instance()->field_settings_for('EVT_desc');
        $this->assertInstanceOf('EE_Post_Content_Field', $this->_field);
    }


    public function tear_down()
    {
        $this->_field = null;
        parent::tear_down();
    }


    public function test_getSchemaType()
    {
        $this->assertEquals('object', $this->_field->getSchemaType());
    }

    public function test_get_wpdb_data_type()
    {
        $this->assertEquals('%s', $this->_field->get_wpdb_data_type());
    }


    /**
     * @group 8405
     */
    public function test_prepare_for_pretty_echoing()
    {
        //use a simple mock shortcode to verify it gets replaced
        add_shortcode(
            'mock',
            function () {
                return 'replacement';
            }
        );
        $this->assertTrue(
            strpos(
                $this->_field->prepare_for_pretty_echoing('This is the shortcode: [mock]'),
                'This is the shortcode: replacement'
            ) !== false
        );
    }

    /**
     * @group 8405
     */
    public function test_prepare_for_get()
    {
        //use a simple mock shortcode to verify it DOESN'T get replaced
        add_shortcode(
            'mock',
            function () {
                return 'replacement';
            }
        );
        $this->assertTrue(
            strpos(
                $this->_field->prepare_for_get('This is the shortcode: [mock]'),
                'This is the shortcode: replacement'
            ) === false
        );
    }

    public function test_prepare_for_set_with_valid_html()
    {
        $valid_html = 'Hey! <a href="">This should stay.</a>';
        $this->assertEquals($valid_html, $this->_field->prepare_for_set($valid_html));
    }


    public function test_prepare_for_set_with_invalid_partial_html_tag()
    {
        $invalid_html = 'Hey! <svg onload=prompt(document.domain)//';
        $expected_result = 'Hey! &lt;svg onload=prompt(document.domain)//';
        $this->assertEquals($expected_result, $this->_field->prepare_for_set($invalid_html));
    }


    public function test_prepare_for_set_with_invalid_full_html_tag()
    {
        $invalid_html = 'Hey! <svg onload=prompt(document.domain)></svg>';
        $expected_result = 'Hey! ';
        $this->assertEquals($expected_result, $this->_field->prepare_for_set($invalid_html));
    }

}