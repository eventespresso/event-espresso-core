<?php
use EventEspresso\core\services\activation\RequestType;

/**
 * RequestTypeTest
 * Tests EventEspresso\core\services\activation\RequestType
 *
 * @package    EventEspresso\tests
 * @subpackage \testcases
 * @author     Brent Christenson
 * @since      4.9.44
 * @group      Activation
 */
class RequestTypeTest extends EE_UnitTestCase
{

    public function testDefaultRequestType()
    {
        // default object
        $request_type = new RequestType();
        $this->assertEquals($request_type->getRequestType(), RequestType::NORMAL);
        $this->assertFalse($request_type->isMajorVersionChange());
    }

    public function testSetRequestType()
    {
        // default object
        $request_type = new RequestType();
        foreach ($request_type->validRequestTypes() as $valid_request_type) {
            $request_type->setRequestType($valid_request_type);
            $this->assertEquals($request_type->getRequestType(), $valid_request_type);
        }
    }

    public function testSetMajorVersionChange()
    {
        // default object
        $request_type = new RequestType();
        $request_type->setMajorVersionChange(true);
        $this->assertTrue($request_type->isMajorVersionChange());
    }

}
// Location: testcases/core/services/request/RequestTypeTest.php
