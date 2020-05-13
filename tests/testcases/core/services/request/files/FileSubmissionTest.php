<?php

namespace EventEspresso\tests\testcases\core\services\request\files;

use EventEspresso\core\services\request\files\FileSubmission;
use EventEspresso\tests\includes\EspressoPHPUnitFrameworkTestCase;

/**
 * Class FileSubmissionTest
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.9.80.p
 * @group current
 *
 */
class FileSubmissionTest extends EspressoPHPUnitFrameworkTestCase
{
    public function testEverythingOk()
    {
        $filename = wp_basename(__FILE__);
        $filepath = __FILE__;
        $filesize = 1234;
        $error = UPLOAD_ERR_OK;
        $file = new FileSubmission($filename, $filepath, $filesize, $error);
        $this->assertEquals($filename, $file->getName());
        $this->assertEquals($filepath, $file->getTmpFile());
        $this->assertEquals('php', $file->getExtension());
        $this->assertEquals('text/x-php', $file->getType());
        $this->assertEquals($filesize, $file->getSize());
        $this->assertEquals($error, $file->getErrorCode());
    }

    public function testFileError()
    {
        $filename = '';
        $filepath = '';
        $filesize = 0;
        $error = UPLOAD_ERR_INI_SIZE;
        $file = new FileSubmission($filename, $filepath, $filesize, $error);
        $this->assertEquals($filename, $file->getName());
        $this->assertEquals($filepath, $file->getTmpFile());
        $this->assertEquals('', $file->getExtension());
        $this->assertEquals('', $file->getType());
        $this->assertEquals($filesize, $file->getSize());
        $this->assertEquals($error, $file->getErrorCode());
    }

    public function testFileExtensionDifferentOnTmpFile()
    {
        $filename = 'foobar.csv';
        $filepath = __FILE__;
        $filesize = 1234;
        $error = UPLOAD_ERR_OK;
        $file = new FileSubmission($filename, $filepath, $filesize, $error);
        $this->assertEquals($filename, $file->getName());
        $this->assertEquals($filepath, $file->getTmpFile());
        $this->assertEquals('csv', $file->getExtension());
        $this->assertEquals('text/x-php', $file->getType());
        $this->assertEquals($filesize, $file->getSize());
        $this->assertEquals($error, $file->getErrorCode());
    }

    public function testFileNpExtension()
    {
        $filename = 'foobar';
        $filepath = __FILE__;
        $filesize = 1234;
        $error = UPLOAD_ERR_OK;
        $file = new FileSubmission($filename, $filepath, $filesize, $error);
        $this->assertEquals($filename, $file->getName());
        $this->assertEquals($filepath, $file->getTmpFile());
        $this->assertEquals('', $file->getExtension());
        $this->assertEquals('text/x-php', $file->getType());
        $this->assertEquals($filesize, $file->getSize());
        $this->assertEquals($error, $file->getErrorCode());
    }
}
// End of file FileSubmissionTest.php
// Location: EventEspresso\tests\testcases\core\services\request\files/FileSubmissionTest.php
