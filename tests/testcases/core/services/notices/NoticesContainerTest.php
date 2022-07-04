<?php

use EventEspresso\core\services\notices\NoticesContainer;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class NoticesContainerTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\services\notices
 * @author  Brent Christensen
 * 
 * @group   Notices
 */
class NoticesContainerTest extends EE_UnitTestCase
{

    /**
     * @var NoticesContainer $notices_container
     */
    private $notices_container;


    public function set_up()
    {
        parent::set_up();
        $this->notices_container = new NoticesContainer();
    }


    /**
     * @see https://stackoverflow.com/a/4356295
     * @return string
     */
    public function generateRandomString()
    {
        $length           = mt_rand(10, 50);
        $characters       = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString     = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[mt_rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }


    /**
     * @return stdClass
     */
    public function extraErrorDetails()
    {
        return (object)array(
            'file' => 'path/to/file.php',
            'func' => 'function',
            'line' => 123,
        );
    }


    public function containerMethods($type)
    {
        $add   = "add{$type}";
        $count = "count{$type}";
        $get   = "get{$type}";
        $has   = "has{$type}";
        $error = $this->extraErrorDetails();
        $this->assertEquals(0, $this->notices_container->$count());
        for ($x = 1; $x <= 10; $x++) {
            $message = $this->generateRandomString();
            if ($type === 'Error') {
                $this->notices_container->$add(
                    $message,
                    $x % 2,
                    $error->file,
                    $error->func,
                    $error->line
                );
            } else {
                $this->notices_container->$add($message, $x % 2);
            }
            $this->assertTrue($this->notices_container->$has());
            $this->assertEquals($x, $this->notices_container->$count());
        }
        $notices = $this->notices_container->$get();
        foreach ($notices as $notice) {
            $this->assertInstanceOf('EventEspresso\core\services\notices\Notice', $notice);
        }
    }


    public function testInformationMethods()
    {
        $this->containerMethods('Information');
    }


    public function testAttentionMethods()
    {
        $this->containerMethods('Attention');
    }


    public function testSuccessMethods()
    {
        $this->containerMethods('Success');
    }


    public function testErrorMethods()
    {
        $this->containerMethods('Error');
    }
}
// Location: tests/testcases/core/services/notices/NoticesContainerTest.php
