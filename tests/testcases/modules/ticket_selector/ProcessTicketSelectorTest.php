<?php

namespace EventEspresso\tests\testcases\modules\ticket_selector;

use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\tests\mocks\modules\ticket_selector\ProcessTicketSelectorPostDataMock;
use PHPUnit\Framework\TestCase;

class ProcessTicketSelectorTest extends TestCase
{
    /**
     * @var ProcessTicketSelectorPostDataMock
     */
    private $post_data_validator;

    /**
     * @var RequestInterface
     */
    private $request;


    public function setUp()
    {
        parent::setUp();
        $this->post_data_validator = new ProcessTicketSelectorPostDataMock($id, $this->request);
    }


    public function tearDown()
    {
        parent::tearDown();
    }

}