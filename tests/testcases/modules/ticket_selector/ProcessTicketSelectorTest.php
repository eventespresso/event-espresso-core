<?php

namespace EventEspresso\tests\testcases\modules\ticket_selector;

use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\modules\ticket_selector\ProcessTicketSelectorPostData as PTSPD;
use EventEspresso\tests\mocks\modules\ticket_selector\ProcessTicketSelectorPostDataMock;
use EventEspresso\tests\mocks\modules\ticket_selector\RequestMock;
use PHPUnit\Framework\TestCase;

/**
 * Class ProcessTicketSelectorTest
 *
 * @author  Brent Christensen
 * @package EventEspresso\tests\testcases\modules\ticket_selector
 * @since   $VID:$
 * @group   ticket-selector
 */
class ProcessTicketSelectorTest extends TestCase
{
    /**
     * @var string
     */
    private $anchor = '#tkt-slctr-tbl-';

    /**
     * @var string
     */
    private $mock_url = 'https://www.unittest.com/events/testing-the-ticket-selector';

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
        $this->request = new RequestMock();
    }


    /**
     * @param int|string $event_id
     */
    public function mockRequestData($event_id, $tickets, $max_atndz, $qty, $rows, $extra_url_params = [])
    {
        // put test data into request
        $this->request->setRequestParam(PTSPD::INPUT_KEY_EVENT_ID, $event_id);
        $this->request->setRequestParam(PTSPD::INPUT_KEY_TICKET_ID . $event_id, $tickets);
        $this->request->setRequestParam(PTSPD::INPUT_KEY_MAX_ATNDZ . $event_id, $max_atndz);
        $this->request->setRequestParam(PTSPD::INPUT_KEY_QTY . $event_id, $qty);
        $this->request->setRequestParam(PTSPD::INPUT_KEY_ROWS . $event_id, $rows);
        $extra_params = '';
        if (! empty($extra_url_params)) {
            $extra_params = '?' . implode('&', $extra_url_params);
        }
        $this->request->setRequestParam(
            PTSPD::INPUT_KEY_RETURN_URL . $event_id,
            "{$this->mock_url}{$extra_params}{$this->anchor}{$event_id}"
        );
    }


    public function initializeValidator()
    {
        $this->post_data_validator = new ProcessTicketSelectorPostDataMock($this->request);
        $this->post_data_validator->setValidData('ee', 'process_ticket_selections');
        $this->post_data_validator->setValidData('noheader', 'true');
    }


    /**
     * [ EVT_ID, ticket IDs, max_atndz, rows, qty, expected [ qty, return_url, total tickets ], extra params, throws
     * exception ]
     *
     * @return array[]
     */
    public function postDataProvider(): array
    {
        return [
            // Dude Where's My Ticket Selector? ( max attendees = 1 & ticket options = 1  )
            [
                '1',
                ['2'],
                '1',
                '1',
                ['1'],
                [
                    'qty'        => [1],
                    'return_url' => "{$this->mock_url}{$this->anchor}1",
                    'tickets'    => 1,
                ],
            ],
            [
                3,
                [4],
                1,
                1,
                [1],
                [
                    'qty'        => [1],
                    'return_url' => "{$this->mock_url}{$this->anchor}3", // <-- last number needs to match the EVT ID
                    'tickets'    => 1,
                ],
            ],
            [
                5,
                [6],
                1,
                1,
                [1],
                [
                    'qty'        => [1],
                    'return_url' => "{$this->mock_url}?hack_attack=Robert');%20DROP%20TABLE%20students;--{$this->anchor}5",
                    'tickets'    => 1,
                ],
                false,
                ["hack_attack=Robert'); DROP TABLE students;--"],
            ],
            [
                'bad',
                ['garbage'],
                'useless',
                'junk',
                ['Kid Rock'],
                [
                    'qty'        => [0],
                    'return_url' => "{$this->mock_url}{$this->anchor}0",
                    'tickets'    => 0,
                ],
                true, // <-- throws exception due to bad data
            ],
            // max attendees = 1 & ticket options > 1
            [
                '7',
                ['8', '9', '10'],
                '1',
                '3',
                '2-1', // if max atndz = 1 but not DWMTS, then qty is a dash (-) separated value string
                [
                    'qty'        => [0, 1, 0],
                    'return_url' => "{$this->mock_url}{$this->anchor}7",
                    'tickets'    => 1,
                ],
            ],
            [
                '11',
                ['12', '13'],
                '1',
                '2',
                '1-1',
                [
                    'qty'        => [1, 0],
                    'return_url' => "{$this->mock_url}{$this->anchor}11",
                    'tickets'    => 1,
                ],
            ],
            [
                '14',
                ['not', 'valid', 'data'],
                '1',
                '0',
                '1-1',
                [
                    'qty'        => [1, 0],
                    'return_url' => "{$this->mock_url}{$this->anchor}11",
                    'tickets'    => 1,
                ],
                true, // <-- throws exception due to bad data
            ],
            // max attendees > 1 & ticket options > 1
            [
                '15',
                ['16', '17'],
                '10', // <-- default max attendees value
                '2',
                ['0', '2'], // <-- selected 2 of ticket 17
                [
                    'qty'        => [0, 2],
                    'return_url' => "{$this->mock_url}{$this->anchor}15",
                    'tickets'    => 2,
                ],
            ],
            [
                '18',
                ['19', '20', '21', '22', '23'],
                '10', // <-- default max attendees value
                '5',
                ['1', '1', '1', '1', '1'], // <-- selected 1 of each ticket
                [
                    'qty'        => [1, 1, 1, 1, 1],
                    'return_url' => "{$this->mock_url}{$this->anchor}18",
                    'tickets'    => 5,
                ],
            ],
            [
                '24',
                ['25', '26', '27'],
                '10', // <-- default max attendees value
                '3',
                ['1', '2', '3'],
                [
                    'qty'        => [1, 2, 3],
                    'return_url' => "{$this->mock_url}{$this->anchor}24",
                    'tickets'    => 6,
                ],
            ],
            [
                '24',
                ['25', '26', '27'],
                '5', // <-- reduced max attendees value that is less than quantity of tickets selected,
                // test will still pass because max attendees is NOT enforced within ProcessTicketSelectorPostData
                '3',
                ['1', '2', '3'],
                [
                    'qty'        => [1, 2, 3],
                    'return_url' => "{$this->mock_url}{$this->anchor}24",
                    'tickets'    => 6,
                ],
            ],
            [
                '28',
                ['29', '30'],
                '5', // <-- reduced max attendees value
                '2',
                ['1', '2', '3'], // mismatch with available ticket options
                [
                    'qty'        => [1, 2],
                    'return_url' => "{$this->mock_url}{$this->anchor}28",
                    'tickets'    => 3,
                ],
                true, // <-- throws exception due to bad data
            ],
        ];
    }


    /**
     * @dataProvider postDataProvider
     * @param int|string|null $event_id
     * @param array           $tickets
     * @param int|string|null $max_atndz
     * @param int|string|null $rows
     * @param array           $qty
     * @param array           $expected
     * @param bool            $throws
     * @param array           $extra_url_params
     */
    public function testValidatePostData(
        $event_id,
        $tickets,
        $max_atndz,
        $rows,
        $qty,
        array $expected,
        bool $throws = false,
        array $extra_url_params = []
    ) {
        // put test data into request
        $this->mockRequestData($event_id, $tickets, $max_atndz, $qty, $rows, $extra_url_params);
        if ($throws) {
            $this->expectException('DomainException');
        }
        $this->initializeValidator((int) $event_id);
        $this->post_data_validator->validatePostData();

        // event ID
        $event_id = $this->post_data_validator->getValidData(PTSPD::DATA_KEY_EVENT_ID);
        $this->assertEquals($event_id, $event_id);

        // ticket IDs
        $ticket_IDs = $this->post_data_validator->getValidData(PTSPD::DATA_KEY_TICKET_ID);
        $this->assertIsArray($ticket_IDs);
        foreach ($ticket_IDs as $key => $ticket_id) {
            $this->assertEquals($tickets[ $key ], $ticket_id);
        }

        // max_atndz
        $max = $this->post_data_validator->getValidData(PTSPD::DATA_KEY_MAX_ATNDZ);
        $this->assertEquals($max_atndz, $max);

        // rows
        $row_count = $this->post_data_validator->getValidData(PTSPD::DATA_KEY_ROWS);
        $this->assertEquals($rows, $row_count);

        // ticket quantities selected
        $quantities = $this->post_data_validator->getValidData(PTSPD::DATA_KEY_QUANTITY);
        $this->assertIsArray($quantities);
        foreach ($quantities as $key => $quantity) {
            $this->assertEquals($expected['qty'][ $key ], $quantity);
        }

        // total ticket count
        $total_tickets = $this->post_data_validator->getValidData(PTSPD::DATA_KEY_TOTAL_TICKETS);
        $this->assertEquals($expected['tickets'], $total_tickets);
        if ((int) $max_atndz === 1) {
            $this->assertEquals(1, $total_tickets);
        }

        // return_url
        $return_url = $this->post_data_validator->getValidData(PTSPD::DATA_KEY_RETURN_URL);
        $this->assertEquals($expected['return_url'], $return_url);

    }
}
// /tests/testcases/modules/ticket_selector/ProcessTicketSelectorTest.php
