<?php
use EventEspresso\core\services\activation\ActivationType;

/**
 * ActivationTypeTest
 * Tests EventEspresso\core\services\activation\ActivationType
 *
 * @package    EventEspresso\tests
 * @subpackage \testcases
 * @author     Brent Christenson
 * @since      4.9.44
 * @group      Activation
 */
class ActivationTypeTest extends EE_UnitTestCase
{

    /**
     * @throws InvalidArgumentException
     * @throws \PHPUnit\Framework\AssertionFailedError
     */
    public function testDefaultActivationType()
    {
        // default object
        $activation_type = new ActivationType();
        $this->assertEquals($activation_type->getActivationType(), ActivationType::NOT_ACTIVATION);
        $this->assertFalse($activation_type->isMajorVersionChange());
    }


    /**
     * @throws InvalidArgumentException
     */
    public function testSetActivationType()
    {
        // default object
        $activation_type = new ActivationType();
        foreach ($activation_type->validActivationTypes() as $valid_activation_type) {
            $activation_type->setActivationType($valid_activation_type);
            $this->assertEquals($activation_type->getActivationType(), $valid_activation_type);
        }
    }


    /**
     * @throws InvalidArgumentException
     * @throws \PHPUnit\Framework\AssertionFailedError
     */
    public function testSetMajorVersionChange()
    {
        // default object
        $activation_type = new ActivationType();
        $activation_type->setMajorVersionChange(true);
        $this->assertTrue($activation_type->isMajorVersionChange());
    }

}
// Location: testcases/core/services/activation/ActivationTypeTest.php
