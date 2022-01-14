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
 * @since   4.10.20.p
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
    public function postDataProvider()
    {
        return [
            // Dude Where's My Ticket Selector? ( max attendees = 1 & ticket options = 1  )
            0 => [
                '1',
                ['2'],
                '1',
                '1',
                ['2' => '1'],
                [
                    'qty'        => [1],
                    'return_url' => "{$this->mock_url}{$this->anchor}1",
                    'tickets'    => 1,
                    'selected_ticket_ids' => [2 => 1],
                ],
            ],
            1 => [
                3,
                [4],
                1,
                1,
                [4 => 1],
                [
                    'qty'        => [1],
                    'return_url' => "{$this->mock_url}{$this->anchor}3", // <-- last number needs to match the EVT ID
                    'tickets'    => 1,
                    'selected_ticket_ids' => [4 => 1],
                ],
            ],
            2 => [
                5,
                [6],
                1,
                1,
                [6 => 1],
                [
                    'qty'        => [1],
                    'return_url' => "{$this->mock_url}?hack_attack=Robert');%20DROP%20TABLE%20students;--{$this->anchor}5",
                    'tickets'    => 1,
                    'selected_ticket_ids' => [6 => 1],
                ],
                false,
                ["hack_attack=Robert'); DROP TABLE students;--"],
            ],
            3 => [
                'bad',
                ['garbage'],
                'useless',
                'junk',
                ['garbage' => 'Kid Rock'],
                [
                    'qty'        => [0],
                    'return_url' => "{$this->mock_url}{$this->anchor}0",
                    'tickets'    => 0,
                    'selected_ticket_ids' => [0],
                ],
                true, // <-- throws exception due to bad data
            ],
            // max attendees = 1 & ticket options > 1
            4 => [
                '7',
                ['8', '9', '10'],
                '1',
                '3',
                ['9' => '1'],
                [
                    'qty'        => [0, 1, 0],
                    'return_url' => "{$this->mock_url}{$this->anchor}7",
                    'tickets'    => 1,
                    'selected_ticket_ids' => [8 => 0, 9 => 1, 10 => 0],
                ],
            ],
            5 => [
                '11',
                ['12', '13'],
                '1',
                '2',
                ['12' => '1'],
                [
                    'qty'        => [1, 0],
                    'return_url' => "{$this->mock_url}{$this->anchor}11",
                    'tickets'    => 1,
                    'selected_ticket_ids' => [12 => 1, 13 => 0],
                ],
            ],
            6 => [
                '14',
                ['not', 'valid', 'data'],
                '1',
                '0',
                ['not' => '1'],
                [
                    'qty'        => [1, 0],
                    'return_url' => "{$this->mock_url}{$this->anchor}11",
                    'tickets'    => 1,
                    'selected_ticket_ids' => [14 => 0],
                ],
                true, // <-- throws exception due to bad data
            ],
            // max attendees > 1 & ticket options > 1
            7 => [
                '15',
                ['16', '17'],
                '10', // <-- default max attendees value
                '2',
                ['16' => '0', '17' => '2'], // <-- selected 2 of ticket 17
                [
                    'qty'        => [0, 2],
                    'return_url' => "{$this->mock_url}{$this->anchor}15",
                    'tickets'    => 2,
                    'selected_ticket_ids' => [16 => 0, 17 => 2],
                ],
            ],
            8 => [
                '18',
                ['19', '20', '21', '22', '23'],
                '10', // <-- default max attendees value
                '5',
                ['19' => '1', '20' => '1', '21' => '1', '22' => '1', '23' => '1'], // <-- selected 1 of each ticket
                [
                    'qty'        => [1, 1, 1, 1, 1],
                    'return_url' => "{$this->mock_url}{$this->anchor}18",
                    'tickets'    => 5,
                    'selected_ticket_ids' => [19 => 1, 20 => 1, 21 => 1, 22 => 1, 23 => 1],
                ],
            ],
            9 => [
                '24',
                ['25', '26', '27'],
                '10', // <-- default max attendees value
                '3',
                ['25' => '1', '26' => '2', '27' => '3'],
                [
                    'qty'        => [1, 2, 3],
                    'return_url' => "{$this->mock_url}{$this->anchor}24",
                    'tickets'    => 6,
                    'selected_ticket_ids' => [25 => 1, 26 => 2, 27 => 3],
                ],
            ],
            10 => [
                '24',
                ['25', '26', '27'],
                '5', // <-- reduced max attendees value that is less than quantity of tickets selected,
                // test will still pass because max attendees is NOT enforced within ProcessTicketSelectorPostData
                '3',
                ['25' => '1', '26' => '2', '27' => '3'],
                [
                    'qty'        => [1, 2, 3],
                    'return_url' => "{$this->mock_url}{$this->anchor}24",
                    'tickets'    => 6,
                    'selected_ticket_ids' => [25 => 1, 26 => 2, 27 => 3],
                ],
            ],
            11 => [
                '28',
                ['29', '30'],
                '5', // <-- reduced max attendees value
                '2',
                ['29' => '1', '30' => '2', '3'], // mismatch with available ticket options
                [
                    'qty'        => [1, 2],
                    'return_url' => "{$this->mock_url}{$this->anchor}28",
                    'tickets'    => 3,
                    'selected_ticket_ids' => [29 => 1, 30 => 2],
                ],
            ],
            // max attendees = 1 & ticket options > 1 & first two tickets cap restricted
            12 => [
                '31',
                ['32', '33', '34', '35', '36'],
                '1',
                '3',
                ['32' => 0, '33' => 0, '34' => 1],
                [
                    'qty'        => [0, 0, 1, 0, 0],
                    'return_url' => "{$this->mock_url}{$this->anchor}31",
                    'tickets'    => 1,
                    'selected_ticket_ids' => [32 => 0, 33 => 0, 34 => 1, 35 => 0, 36 => 0],
                ],
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
        $throws = false,
        array $extra_url_params = []
    ) {
        // put test data into request
        $this->mockRequestData($event_id, $tickets, $max_atndz, $qty, $rows, $extra_url_params);
        if ($throws) {
            $this->expectException('DomainException');
        }
        $this->initializeValidator();
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
            // also make sure that quantities for ticket IDs match up with expected
            $this->assertEquals($expected['selected_ticket_ids'][ $tickets[ $key ] ], $quantity);
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
