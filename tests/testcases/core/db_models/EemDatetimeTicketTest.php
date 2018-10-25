<?php

/**
 * Class EemDatetimeTicketTest
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class EemDatetimeTicketTest extends EE_UnitTestCase
{
    /**
     * @var EEM_Datetime_Ticket
     */
    protected $model;

    /**
     * @since $VID:$
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
     * @since $VID:$
     * @group private-1
     */
    public function testRestrictedbyRelatedModelPassword()
    {
        $this->assertTrue($this->model->restrictedByRelatedModelPassword());
    }
}
// End of file EemDatetimeTicketTest.php
// Location: ${NAMESPACE}/EemDatetimeTicketTest.php
