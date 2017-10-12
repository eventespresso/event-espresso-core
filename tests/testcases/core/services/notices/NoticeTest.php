<?php

use EventEspresso\core\services\notices\Notice;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class testNotice
 * Description
 *
 * @package EventEspresso\tests\testcases\core\services\notices
 * @author  Brent Christensen
 * @since   $VID:$
 * @group   Notices
 */
class NoticeTest extends EE_UnitTestCase
{

    /**
     * @param        $type
     * @param string $notice
     * @param bool   $dismissible
     * @return Notice
     */
    private function createNotice($type, $notice = 'message', $dismissible = true)
    {
        return new Notice(
            $type,
            $notice,
            $dismissible,
            __FILE__,
            __FUNCTION__,
            __LINE__
        );
    }


    public function testType()
    {
        $types = array(
            Notice::ERROR       => true,
            Notice::SUCCESS     => true,
            Notice::ATTENTION   => true,
            Notice::INFORMATION => true,
            'INVALID'           => false,
        );
        foreach ($types as $type => $valid) {
            if (! $valid) {
                $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidDataTypeException');
            }
            $notice = $this->createNotice($type);
            $this->assertEquals($type, $notice->type());
        }
    }


    public function testValidMessage()
    {
        $notice = $this->createNotice(Notice::SUCCESS, 'valid message');
        $this->assertEquals('valid message', $notice->message());
    }


    public function testMessageWithArray()
    {
        $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidDataTypeException');
        $this->createNotice(Notice::SUCCESS, array('invalid message'));
    }


    public function testMessageWithObject()
    {
        $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidDataTypeException');
        $this->createNotice(Notice::SUCCESS, new stdClass());
    }


    public function testMessageWithInteger()
    {
        $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidDataTypeException');
        $this->createNotice(Notice::SUCCESS, 12345);
    }


    public function testDismissible()
    {
        $dismissible_values = array(
            true,
            false,
            1,
            0,
            'true',
            'false',
            'yes',
            'no',
            array(),
            new stdClass(),
            12345,
            'nope',
        );
        foreach ($dismissible_values as $dismissible) {
            $notice = $this->createNotice(Notice::SUCCESS, 'valid message', $dismissible);
            $this->assertEquals(
                filter_var($dismissible, FILTER_VALIDATE_BOOLEAN),
                $notice->isDismissible()
            );
        }
    }


    public function testFile()
    {
        $files = array(
            0                => Notice::SUCCESS,
            1                => Notice::ATTENTION,
            ''               => Notice::INFORMATION,
            'valid_file.php' => Notice::ERROR,
            4                => Notice::ERROR,
        );
        foreach ($files as $file => $type) {
            // file is only required for Notice::ERROR types
            if ($file === 4) {
                $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidDataTypeException');
            }
            $notice = new Notice(
                $type,
                'valid message',
                true,
                $file,
                __FUNCTION__,
                __LINE__
            );
            $this->assertEquals($type, $notice->type());
        }
    }


    public function testFunc()
    {
        $functions = array(
            0            => Notice::SUCCESS,
            1            => Notice::ATTENTION,
            ''           => Notice::INFORMATION,
            __FUNCTION__ => Notice::ERROR,
            4            => Notice::ERROR,
        );
        foreach ($functions as $function => $type) {
            // file is only required for Notice::ERROR types
            if ($function === 4) {
                $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidDataTypeException');
            }
            $notice = new Notice(
                $type,
                'valid message',
                true,
                __FILE__,
                $function,
                __LINE__
            );
            $this->assertEquals($type, $notice->type());
        }
    }


    public function testLine()
    {
        $lines = array(
            '0'      => Notice::SUCCESS,
            '1'      => Notice::ATTENTION,
            ''       => Notice::INFORMATION,
            __LINE__ => Notice::ERROR,
            'number' => Notice::ERROR,
        );
        foreach ($lines as $line => $type) {
            // file is only required for Notice::ERROR types
            if ($line === 'number') {
                $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidDataTypeException');
            }
            $notice = new Notice(
                $type,
                'valid message',
                true,
                __FILE__,
                __FUNCTION__,
                $line
            );
            $this->assertEquals($type, $notice->type());
        }
    }


}
// Location: tests/testcases/core/services/notices/NoticeTest.php
