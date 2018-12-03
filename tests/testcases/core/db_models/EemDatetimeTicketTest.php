<?php

/**
 * Class EemDatetimeTicketTest
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.9.74.p
 *
 */
class EemDatetimeTicketTest extends EE_UnitTestCase
{
    /**
     * @var EEM_Datetime_Ticket
     */
    protected $model;

    /**
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function setUp()
    {
        parent::setUp();
        $this->model = EEM_Datetime_Ticket::instance();
    }

    /**
     * @since 4.9.74.p
     * @group private-1
     */
    public function testRestrictedbyRelatedModelPassword()
    {
        $this->assertTrue($this->model->restrictedByRelatedModelPassword());
    }
}
// End of file EemDatetimeTicketTest.php
// Location: ${NAMESPACE}/EemDatetimeTicketTest.php
