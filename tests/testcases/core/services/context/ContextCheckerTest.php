<?php

use EventEspresso\core\domain\entities\contexts\Context;
use EventEspresso\core\domain\entities\contexts\ContextInterface;
use EventEspresso\tests\mocks\core\services\context\ContextCheckerMock;

/**
 * Class ContextCheckerTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\services\context
 * @author  Brent Christensen
 * 
 * @group   11040
 */
class ContextCheckerTest extends EE_UnitTestCase
{

    /**
     * @var ContextCheckerMock $context_checker
     */
    private $context_checker;

    /**
     * @var array $acceptable_values
     */
    private $acceptable_values = array('context-one', 'context-two');


    public function set_up()
    {
        parent::set_up();
        $this->context_checker = new ContextCheckerMock(
            'This-is-a-Test',
            $this->acceptable_values
        );
    }


    public function testGetters()
    {
        $this->assertEquals('this-is-a-test', $this->context_checker->getIdentifier());
        $this->assertEquals($this->acceptable_values, $this->context_checker->getAcceptableValues());
        $this->assertIsCallable($this->context_checker->getEvaluationCallback());
        $context_checker = new ContextCheckerMock(
            'This-is-a-Test',
            $this->acceptable_values,
            function() { return true; }
        );
        $this->assertIsCallable($context_checker->getEvaluationCallback());
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
        $context_checker_looking_for_three = new ContextCheckerMock(
            'looking-for-three',
            $this->acceptable_values,
            function (ContextInterface $context)
            {
                return strpos($context->slug(), 'three' ) !== false;
            }
        );
        $this->assertTrue($context_checker_looking_for_three->isAllowed($context_three));
        $context_checker_looking_for_four = new ContextCheckerMock(
            'looking-for-four',
            $this->acceptable_values,
            function (ContextInterface $context)
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
            'FHEE__EventEspresso_core_domain_entities_context_ContextChecker__this-is-a-test__isAllowed',
            function ($is_allowed, ContextInterface $context)
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
        remove_all_filters('FHEE__EventEspresso_core_domain_entities_context_ContextChecker__this-is-a-test__isAllowed');
        // now do it again, but looking for a value that will not be within the context slug
        add_filter(
            'FHEE__EventEspresso_core_domain_entities_context_ContextChecker__this-is-a-test__isAllowed',
            function ($is_allowed, ContextInterface $context)
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


    public function testIsAllowedWithFilteredAcceptableValues()
    {
        // and 'context-six' to list of acceptable values
        add_filter(
            'FHEE__EventEspresso_core_domain_entities_context_ContextChecker__this-is-a-test__acceptableValues',
            function ($acceptable_values)
            {
                $acceptable_values[] = 'context-six';
                return $acceptable_values;
            }
        );
        $this->assertTrue(
            $this->context_checker->isAllowed(
                new Context('context-six', 'for testing if context-six is valid')
            )
        );
    }


}
// Location: /testcases/core/services/context/ContextCheckerTest.php
