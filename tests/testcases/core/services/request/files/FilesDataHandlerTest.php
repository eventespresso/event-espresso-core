<?php

namespace EventEspresso\tests\testcases\core\services\request\files;

use EventEspresso\core\services\request\files\FilesDataHandler;
use EventEspresso\core\services\request\Request;
use PHPUnit_Framework_TestCase;

/**
 * Class FilesDataHandlerTest
 *
 * Tests FilesDataHandler. Uses PHPUnit_Framework_TestCase because it doesn't depend on anything from the EE
 * or WP environment.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 * @group current
 *
 */
class FilesDataHandlerTest extends PHPUnit_Framework_TestCase
{
    /**
     * @since $VID:$
     */
    public function testGetOrganizedFilesEmptyArray()
    {
        $request = new Request(
            [],
            [],
            [],
            [],
            []
        );
        $files_data_handler = new FilesDataHandler($request);
        $this->assertNull($files_data_handler->getFileObject('doesnt-exist'));
    }

    /**
     * @since $VID:$
     */
    public function testGetOrganizedFiles2dArray()
    {
        $request = new Request(
            [],
            [],
            [],
            [],
            [
                'file_input' => [
                    'name' => 'funnycatphoto.gif',
                    'size' => 1234,
                    'tmp_name' => '/srv/tmp/something/greegtd.gif',
                    'error' => UPLOAD_ERR_OK
                ]
            ]
        );
        $files_data_handler = new FilesDataHandler($request);
        $this->assertInstanceOf(
            'EventEspresso\core\services\request\files\FileSubmission',
            $files_data_handler->getFileObjectFromNameParts(['file_input'])
        );
        $this->assertInstanceOf(
            'EventEspresso\core\services\request\files\FileSubmission',
            $files_data_handler->getFileObject('file_input')
        );
    }

    /**
     * @since $VID:$
     */
    public function testGetOrganizedFiles3dArray()
    {
        $request = new Request(
            [],
            [],
            [],
            [],
            [
                'my' => [
                    'name' => [
                        'file' => [
                            'input1' => 'funnycatphoto.gif',
                            'input2' => 'registrations.csv',
                            'input3' => 'piratedvideo.mov'
                        ]
                    ],
                    'size' => [
                        'file' => [
                            'input1' => 123,
                            'input2' => 456,
                            'input3' => 1234567890
                        ]
                    ],
                    'tmp_name' => [
                        'file' => [
                            'input1' => 'fewgrgfew.gif',
                            'input2' => 'gbegr/rgrer.csv',
                            'input3' => 'grgt/wef/wegr.mov'
                        ]
                    ],
                    'error' => [
                        'file' => [
                            'input1' => UPLOAD_ERR_OK,
                            'input2' => UPLOAD_ERR_OK,
                            'input3' => UPLOAD_ERR_INI_SIZE
                        ]
                    ]
                ]
            ]
        );
        $files_data_handler = new FilesDataHandler($request);
        $this->assertInstanceOf(
            'EventEspresso\core\services\request\files\FileSubmission',
            $files_data_handler->getFileObjectFromNameParts(
                ['my', 'file', 'input1']
            )
        );
        $this->assertInstanceOf(
            'EventEspresso\core\services\request\files\FileSubmission',
            $files_data_handler->getFileObject('my[file][input1]')
        );
    }

    /**
     * @since $VID:$
     */
    public function testGetOrganizedFiles2dAnd3dArray()
    {
        $request = new Request(
            [],
            [],
            [],
            [],
            [
                'my' => [
                    'name' => [
                        'file' => [
                            'input1' => 'funnycatphoto.gif',
                            'input2' => 'registrations.csv',
                            'input3' => 'piratedvideo.mov'
                        ],
                        'input4' => 'unexpected.gif'
                    ],
                    'size' => [
                        'file' => [
                            'input1' => 123,
                            'input2' => 456,
                            'input3' => 1234567890
                        ],
                        'input4' => 123,
                    ],
                    'tmp_name' => [
                        'file' => [
                            'input1' => 'fewgrgfew.gif',
                            'input2' => 'gbegr/rgrer.csv',
                            'input3' => 'grgt/wef/wegr.mov'
                        ],
                        'input4' => 'ougif/iyv.gif'
                    ],
                    'error' => [
                        'file' => [
                            'input1' => UPLOAD_ERR_OK,
                            'input2' => UPLOAD_ERR_OK,
                            'input3' => UPLOAD_ERR_INI_SIZE
                        ],
                        'input4'=> UPLOAD_ERR_OK
                    ]
                ]
            ]
        );
        $files_data_handler = new FilesDataHandler($request);
        $this->assertInstanceOf(
            'EventEspresso\core\services\request\files\FileSubmission',
            $files_data_handler->getFileObject('my[file][input1]')
        );
        $this->assertInstanceOf(
            'EventEspresso\core\services\request\files\FileSubmission',
            $files_data_handler->getFileObject('my[input4]')
        );
    }

    /**
     * @since $VID:$
     */
    public function testGetOrganizedFiles4dArray()
    {
        $request = new Request(
            [],
            [],
            [],
            [],
            [
                'my' => [
                    'name' => [
                        'great' => [
                            'file' => [
                                'input1' => 'funnycatphoto.gif',
                            ]
                        ]
                    ],
                    'size' => [
                        'great' => [
                            'file' => [
                                'input1' => 123,
                            ]
                        ]
                    ],
                    'tmp_name' => [
                        'great' => [
                            'file' => [
                                'input1' => 'fewgrgfew.gif',
                            ]
                        ]
                    ],
                    'error' => [
                        'great' => [
                            'file' => [
                                'input1' => UPLOAD_ERR_OK,
                            ]
                        ]
                    ]
                ]
            ]
        );
        $files_data_handler = new FilesDataHandler($request);
        $this->assertInstanceOf(
            'EventEspresso\core\services\request\files\FileSubmission',
            $files_data_handler->getFileObjectFromNameParts(['my', 'great', 'file', 'input1'])
        );
        $this->assertInstanceOf(
            'EventEspresso\core\services\request\files\FileSubmission',
            $files_data_handler->getFileObject('my[great][file][input1]')
        );
    }
}
// End of file FilesDataHandlerTest.php
// Location: EventEspresso\tests\testcases\core\services\request\files/FilesDataHandlerTest.php
