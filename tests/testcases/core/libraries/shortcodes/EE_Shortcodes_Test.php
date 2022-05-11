<?php
defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed.');

/**
 * Tests the EE_Shortcodes class
 *
 * @package    Event Espresso
 * @subpackage messages, tests
 * @author     Darren Ethier
 * @since      4.9.32.rc.019
 */
class EE_Shortcodes_Test extends EE_UnitTestCase
{
    /**
     * @var EE_Shortcodes_Mock;
     */
    protected $shortcode_mock;


    public function set_up()
    {
        parent::set_up();
        require_once EE_TESTS_DIR . 'mocks/core/libraries/shortcodes/EE_Shortcodes_Mock.php';
        $this->shortcode_mock = new EE_Shortcodes_Mock;
    }


    /**
     * @group 10561
     */
    public function test_mutate_conditional_block_in_template()
    {
        $data = array(
            'template' => 'This is a template with some conditional tags.'
            . ' [IF_MOCK_TEST_ONE_* id=10]Mock Test One Content A[/IF_MOCK_TEST_ONE_*]'
            . ' [IF_MOCK_TEST_ONE_* id=14]Mock Test One Content B[/IF_MOCK_TEST_ONE_*]'
            . ' [IF_MOCK_TEST_ONE_* id=10]Mock Test One Content C[/IF_MOCK_TEST_ONE_*]'
            . ' [IF_MOCK_TEST_TWO_* something=30]Mock Test Two Content[/IF_MOCK_TEST_TWO_*]'
        );

        //not expecting this return a value because the mock doesn't have conditional shortcodes registered.
        $this->assertEmpty($this->shortcode_mock->parser('', $data));

        //test the method we're testing.
        //key is shortcode to test, value is expectation on return value.
        $assertions_for_hide = array(
            '[IF_MOCK_TEST_ONE_* id=10]' => 'This is a template with some conditional tags.'
                                . '  [IF_MOCK_TEST_ONE_* id=14]Mock Test One Content B[/IF_MOCK_TEST_ONE_*]'
                                . '  [IF_MOCK_TEST_TWO_* something=30]Mock Test Two Content[/IF_MOCK_TEST_TWO_*]',
            '[IF_MOCK_TEST_ONE_* id=14]' => 'This is a template with some conditional tags.'
                                . ' [IF_MOCK_TEST_ONE_* id=10]Mock Test One Content A[/IF_MOCK_TEST_ONE_*]'
                                . '  [IF_MOCK_TEST_ONE_* id=10]Mock Test One Content C[/IF_MOCK_TEST_ONE_*]'
                                . ' [IF_MOCK_TEST_TWO_* something=30]Mock Test Two Content[/IF_MOCK_TEST_TWO_*]',
            '[IF_MOCK_TEST_TWO_* something=30]' => 'This is a template with some conditional tags.'
                                . ' [IF_MOCK_TEST_ONE_* id=10]Mock Test One Content A[/IF_MOCK_TEST_ONE_*]'
                                . ' [IF_MOCK_TEST_ONE_* id=14]Mock Test One Content B[/IF_MOCK_TEST_ONE_*]'
                                . ' [IF_MOCK_TEST_ONE_* id=10]Mock Test One Content C[/IF_MOCK_TEST_ONE_*] '
        );

        $assertions_for_show = array(
            '[IF_MOCK_TEST_ONE_* id=10]' => 'This is a template with some conditional tags.'
                                . ' Mock Test One Content A'
                                . ' [IF_MOCK_TEST_ONE_* id=14]Mock Test One Content B[/IF_MOCK_TEST_ONE_*]'
                                . ' Mock Test One Content C'
                                . ' [IF_MOCK_TEST_TWO_* something=30]Mock Test Two Content[/IF_MOCK_TEST_TWO_*]',
            '[IF_MOCK_TEST_ONE_* id=14]' => 'This is a template with some conditional tags.'
                                . ' [IF_MOCK_TEST_ONE_* id=10]Mock Test One Content A[/IF_MOCK_TEST_ONE_*]'
                                . ' Mock Test One Content B'
                                . ' [IF_MOCK_TEST_ONE_* id=10]Mock Test One Content C[/IF_MOCK_TEST_ONE_*]'
                                . ' [IF_MOCK_TEST_TWO_* something=30]Mock Test Two Content[/IF_MOCK_TEST_TWO_*]',
            '[IF_MOCK_TEST_TWO_* something=30]' => 'This is a template with some conditional tags.'
                                . ' [IF_MOCK_TEST_ONE_* id=10]Mock Test One Content A[/IF_MOCK_TEST_ONE_*]'
                                . ' [IF_MOCK_TEST_ONE_* id=14]Mock Test One Content B[/IF_MOCK_TEST_ONE_*]'
                                . ' [IF_MOCK_TEST_ONE_* id=10]Mock Test One Content C[/IF_MOCK_TEST_ONE_*]'
                                . ' Mock Test Two Content'
        );

        //first lets test the expectations for when a condition results in hiding the contained content.
        foreach ($assertions_for_hide as $shortcode => $expectation) {
            $this->shortcode_mock->parser('', $data);
            $this->assertEquals(
                $expectation,
                $this->shortcode_mock->mutate_conditional_block_in_template(
                    $shortcode,
                    false
                ),
                sprintf('Testing %s shortcode in the assertions for hide tests.', $shortcode)
            );
        }

        //next test the expectations for when a condition results in showing
        foreach ($assertions_for_show as $shortcode => $expectation) {
            //reset template to original
            $this->shortcode_mock->parser('', $data);
            $this->assertEquals(
                $expectation,
                $this->shortcode_mock->mutate_conditional_block_in_template(
                    $shortcode
                ),
                sprintf('Testing %s shortcode in the assertions for show tests.', $shortcode)
            );
        }
    }
}