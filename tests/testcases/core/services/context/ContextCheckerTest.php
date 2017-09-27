<?php

use EventEspresso\core\domain\entities\Context;
use EventEspresso\core\services\context\ContextChecker;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class ContextCheckerTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\services\context
 * @author  Brent Christensen
 * @since   $VID:$
 * @group   11040
 */
class ContextCheckerTest extends EE_UnitTestCase
{

    /**
     * @var ContextChecker $context_checker
     */
    private $context_checker;

    /**
     * @var array $acceptable_values
     */
    private $acceptable_values = array('context-one', 'context-two');


    public function setUp()
    {
        parent::setUp();
        $this->context_checker = new ContextChecker(
            'This-is-a-Test',
            $this->acceptable_values
        );
    }


    public function testGetters()
    {
        $this->assertEquals('this-is-a-test', $this->context_checker->identifier());
        $this->assertEquals($this->acceptable_values, $this->context_checker->acceptableValues());
        $this->assertInstanceOf('Closure', $this->context_checker->evaluationCallback());
        $context_checker = new ContextChecker(
            'This-is-a-Test',
            $this->acceptable_values,
            function() { return true; }
        );
        $this->assertInstanceOf('Closure', $context_checker->evaluationCallback());
    }



    public function testIsAllowed()
    {
        $this->assertTrue(
            $this->context_checker->isAllowed(
                new Context('context-one', 'for testing if context-one is valid')
            )
        );
        $this->assertTrue(
            $this->context_checker->isAllowed(
                new Context('context-two', 'for testing if context-two is valid')
            )
        );
        $this->assertFalse(
            $this->context_checker->isAllowed(
                new Context('context-three', 'for testing if context-three is valid')
            )
        );
    }


    public function testIsAllowedWithCustomCallback()
    {
        $context_three = new Context('context-three', 'for testing if context-three is valid');
        $context_checker_looking_for_three = new ContextChecker(
            'looking-for-three',
            $this->acceptable_values,
            function (Context $context)
            {
                return strpos($context->slug(), 'three' ) !== false;
            }
        );
        $this->assertTrue($context_checker_looking_for_three->isAllowed($context_three));
        $context_checker_looking_for_four = new ContextChecker(
            'looking-for-four',
            $this->acceptable_values,
            function (Context $context)
            {
                return strpos($context->slug(), 'four' ) !== false;
            }
        );
        $this->assertFalse($context_checker_looking_for_four->isAllowed($context_three));
    }


    public function testIsAllowedWithFilter()
    {
        $context_five = new Context('context-five', 'for testing if context-five is valid');
        // hook into existing ContextChecker using default built-in evaluation callback,
        // and add custom detection for the word "five"
        add_filter(
            'FHEE__ContextChecker__this-is-a-test__isAllowed',
            function ($is_allowed, Context $context)
            {
                // if context slug contains the word "five" return true, else return previously evaluated result
                return strpos($context->slug(), 'five') !== false
                    ? true
                    : $is_allowed;
            },
            10,
            2
        );
        $this->assertTrue($this->context_checker->isAllowed($context_five));
        remove_all_filters('FHEE__ContextChecker__this-is-a-test__isAllowed');
        // now do it again, but looking for a value that will not be within the context slug
        add_filter(
            'FHEE__ContextChecker__this-is-a-test__isAllowed',
            function ($is_allowed, Context $context)
            {
                // if context slug contains the word "six" return true, else return previously evaluated result
                return strpos($context->slug(), 'six') !== false
                    ? true
                    : $is_allowed;
            },
            10,
            2
        );
        $this->assertFalse($this->context_checker->isAllowed($context_five));
    }


}
// Location: /testcases/core/services/context/ContextCheckerTest.php
