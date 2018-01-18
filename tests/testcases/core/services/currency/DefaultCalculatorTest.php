<?php
use EventEspresso\core\services\currency\Calculator;
use EventEspresso\core\services\currency\DefaultCalculator;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class DefaultCalculatorTest
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 * @group 10619
 */
class DefaultCalculatorTest extends \EE_UnitTestCase
{

    /**
     * @group Money
     */
    public function test_add()
    {
        $calculator = new DefaultCalculator();
        $test_sets = array(
            array(1,2,3),
            array(1,2.5,3.5),
        );
        foreach ($test_sets as $numbers) {
            $this->assertEquals(
                $numbers[2],
                $calculator->add($numbers[0], $numbers[1]),
                sprintf('%s + %s !== %s', $numbers[0], $numbers[1], $numbers[2])
            );
        }
    }

    /**
     * @group Money
     */
    public function test_subtract()
    {
        $calculator = new DefaultCalculator();
        $test_sets = array(
            array(3, 2, 1),
            array(3.5, 2.5, 1),
        );
        foreach ($test_sets as $numbers) {
            $this->assertEquals(
                $numbers[2],
                $calculator->subtract($numbers[0], $numbers[1]),
                sprintf('%s - %s !== %s', $numbers[0], $numbers[1], $numbers[2])
            );
        }
    }

    /**
     * @group Money
     */
    public function test_multiply()
    {
        $calculator = new DefaultCalculator();
        $test_sets = array(
            array(2, 3, 6),
            array(2, 3.2, 6),
            array(2, 3.3, 7),
        );
        foreach ($test_sets as $numbers) {
            $this->assertEquals(
                $numbers[2],
                $calculator->multiply($numbers[0], $numbers[1], 0),
                sprintf('%s x %s !== %s', $numbers[0], $numbers[1], $numbers[2])
            );
        }
    }

    /**
     * @group Money
     */
    public function test_divide()
    {
        $calculator = new DefaultCalculator();
        $test_sets = array(
            array(4, 2, 2),
            array(4.5, 2, 2),
            array(5, 2, 3),
            array(5.5, 2, 3),
        );
        foreach ($test_sets as $numbers) {
            $this->assertEquals(
                $numbers[2],
                $calculator->divide($numbers[0], $numbers[1], 0),
                sprintf('%s / %s !== %s', $numbers[0], $numbers[1], $numbers[2])
            );
        }
    }

    /**
     * @group Money
     */
    public function test_round()
    {
        $calculator = new DefaultCalculator();
        // Calculator::ROUND_UP
        $this->assertEquals(
            '2',
            $calculator->round(1.1, 0,Calculator::ROUND_UP)
        );
        $this->assertEquals(
            '2',
            $calculator->round(1.5, 0, Calculator::ROUND_UP)
        );
        $this->assertEquals(
            '2',
            $calculator->round(1.9, 0, Calculator::ROUND_UP)
        );
        // Calculator::ROUND_DOWN
        $this->assertEquals(
            '1',
            $calculator->round(1.1, 0, Calculator::ROUND_DOWN)
        );
        $this->assertEquals(
            '1',
            $calculator->round(1.5, 0, Calculator::ROUND_DOWN)
        );
        $this->assertEquals(
            '1',
            $calculator->round(1.9, 0, Calculator::ROUND_DOWN)
        );
        // Calculator::ROUND_HALF_UP
        $this->assertEquals(
            '1',
            $calculator->round(1.1, 0, Calculator::ROUND_HALF_UP)
        );
        $this->assertEquals(
            '2',
            $calculator->round(1.5, 0, Calculator::ROUND_HALF_UP)
        );
        $this->assertEquals(
            '2',
            $calculator->round(1.9, 0, Calculator::ROUND_HALF_UP)
        );
        // Calculator::ROUND_HALF_DOWN
        $this->assertEquals(
            '1',
            $calculator->round(1.1, 0, Calculator::ROUND_HALF_DOWN)
        );
        $this->assertEquals(
            '1',
            $calculator->round(1.5, 0, Calculator::ROUND_HALF_DOWN)
        );
        $this->assertEquals(
            '2',
            $calculator->round(1.9, 0, Calculator::ROUND_HALF_DOWN)
        );
        // Calculator::ROUND_HALF_EVEN
        $this->assertEquals(
            '1',
            $calculator->round(1.1, 0, Calculator::ROUND_HALF_EVEN)
        );
        $this->assertEquals(
            '2',
            $calculator->round(1.5, 0, Calculator::ROUND_HALF_EVEN)
        );
        $this->assertEquals(
            '2',
            $calculator->round(1.9, 0, Calculator::ROUND_HALF_EVEN)
        );
        // Calculator::ROUND_HALF_ODD
        $this->assertEquals(
            '1',
            $calculator->round(1.1, 0, Calculator::ROUND_HALF_ODD)
        );
        $this->assertEquals(
            '1',
            $calculator->round(1.5, 0, Calculator::ROUND_HALF_ODD)
        );
        $this->assertEquals(
            '2',
            $calculator->round(1.9, 0, Calculator::ROUND_HALF_ODD)
        );
    }
}
// End of file DecimalMoneyFormatterTest.php
// Location: tests/testcases/core/services/currency/DefaultCalculatorTest.php