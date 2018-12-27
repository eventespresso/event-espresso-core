<?php

namespace EventEspresso\tests\testcases\core\domain\values;

use EE_UnitTestCase;
use EventEspresso\core\domain\values\FilePath;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class FilePathTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\domain\values
 * @author  Brent Christensen
 * @since   4.9.51
 * @group   ValueObjects
 * @group   FilePath
 */
class FilePathTest extends EE_UnitTestCase
{

    public function test_constructor()
    {
        $filepath = new FilePath(__FILE__);
        $this->assertInstanceOf('EventEspresso\core\domain\values\FilePath', $filepath);
    }


    public function test_constructor_with_invalid_data_type()
    {
        $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidDataTypeException');
        new FilePath(1234);
    }


    public function test_constructor_with_invalid_filepath()
    {
        $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidFilePathException');
        new FilePath(__FILE__ . '.totallynotmalware');
    }


    public function test_toString()
    {
        $filepath = new FilePath(__FILE__);
        $this->assertEquals(__FILE__, (string) $filepath);
        $this->assertEquals(
            str_replace('\\', '/', EE_TESTS_DIR . 'testcases/core/domain/values/FilePathTest.php'),
            str_replace('\\', '/', $filepath)
        );
    }


}
// Location: FilePathTest.php
