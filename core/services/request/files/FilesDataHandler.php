<?php

namespace EventEspresso\core\services\request\files;

use EventEspresso\core\services\collections\CollectionDetails;
use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\collections\CollectionLoader;
use EventEspresso\core\services\collections\CollectionLoaderException;
use EventEspresso\core\services\request\Request;
use InvalidArgumentException;
use UnexpectedValueException;

/**
 * Class FilesDataHandler
 *
 * Helper for dealing with PHP's $_FILES. Instead of working with a sometimes puzzling array, with file info
 * dispersed throughout, creates a single array of FileSubmissionInterface objects. This array can be multi-dimensional,
 * but its shape follows that of $_POST and $_GET.
 * Eg, access all file info for a file input named "file1" using
 *
 * ```
 * $data_handler = LoaderFactory::getLoader()->load(' EventEspresso\core\services\request\files\FilesDataHandler');
 * $files = $data_handler->getFileObjects();
 * $file = $files['file1'];
 * ```
 *
 * and for a file input named "my[great][file][input]", use the same code but change the last line to:
 *
 * ```
 * $file = $files['my']['great']['file']['input'];
 * ```
 *
 * In both cases, $file will be a FileSubmissionInterface object, containing the file's name, temporary filepath, size,
 * error code, and helpers to get its mime type and extension.
 *
 *
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class FilesDataHandler
{
    /**
     * @var Request
     */
    protected $request;

    /**
     * @var array
     */
    protected $file_objects;

    /**
     * @var bool
     */
    protected $initialized = false;

    /**
     * FilesDataHandler constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * @since $VID:$
     * @return array with a similar structure to $_POST and $_GET (ie, it can be multi-dimensional) but the "leaf"
     * nodes are all of type FileSubmissionInterface
     * @throws UnexpectedValueException
     * @throws InvalidArgumentException
     */
    public function getFileObjects()
    {
        if (!$this->initialized) {
            $this->initialize();
        }
        return $this->file_objects;
    }

    /**
     * Sets up the file objects from the request's $_FILES data.
     * @since $VID:$
     * @throws UnexpectedValueException
     * @throws InvalidArgumentException
     */
    protected function initialize()
    {
        $files_raw_data = $this->request->filesParams();
        if (empty($files_raw_data)) {
            return;
        }
        if ($this->isStrangeFilesArray($files_raw_data)) {
            $data = $this->fixFilesDataArray($files_raw_data);
        } else {
            $data = $files_raw_data;
        }
        $this->file_objects = $this->createFileObjects($data);
        $this->initialized = true;
    }

    /**
     * Detects if $_FILES is a weird multi-dimensional array that needs fixing or not.
     * @since $VID:$
     * @param $files_data
     * @return bool
     * @throws UnexpectedValueException
     */
    protected function isStrangeFilesArray($files_data)
    {
        if (!is_array($files_data)) {
            throw new UnexpectedValueException(
                sprintf(
                    esc_html__(
                        'Unexpected PHP $_FILES data format. "%1$s" was expected to be an array.',
                        'event_espresso'
                    ),
                    (string) $files_data
                )
            );
        }
        $first_value = reset($files_data);
        if (!is_array($first_value)) {
            throw new UnexpectedValueException(
                sprintf(
                    esc_html__(
                        'Unexpected PHP $_FILES data format. "%1$s" was expected to be an array.',
                        'event_espresso'
                    ),
                    (string) $first_value
                )
            );
        }
        $first_sub_array_item = reset($first_value);
        if (is_array($first_sub_array_item)) {
            // not just a 2d array
            return true;
        }
        // yep, just 2d array
        return false;
    }

    /**
     * Takes into account that $_FILES does a weird thing when you have hierarchical form names (eg `<input type="file"
     * name="my[hierarchical][form]">`): it leaves the top-level form part alone, but replaces the SECOND part with
     * "name", "size", "tmp_name", etc. So that file's data is located at "my[name][hierarchical][form]",
     * "my[size][hierarchical][form]", "my[tmp_name][hierarchical][form]", etc. It's really weird.
     * @since $VID:$
     * @param $files_data
     * @return array
     */
    protected function fixFilesDataArray($files_data)
    {
        $sane_files_array = [];
        foreach ($files_data as $top_key => $top_key_avlue) {
            foreach ($top_key_avlue as $lower_key => $lower_key_value) {
                foreach ($lower_key_value as $lowest_key => $lowest_key_value) {
                    $next_data = [
                        $top_key => [
                            $lowest_key => $this->organizeFilesData($lowest_key_value, $lower_key, $lowest_key)
                        ]
                    ];
                    $sane_files_array = array_merge_recursive(
                        $sane_files_array,
                        $next_data
                    );
                }
            }
        }
        return $sane_files_array;
    }

    /**
     * Recursively explores the array until it finds a leaf node, and tacks `$type` as a final index in front of it.
     * @since $VID:$
     * @param $data either 'name', 'tmp_name', 'size', or 'error'
     * @param $type
     * @return array
     */
    protected function organizeFilesData($data, $type)
    {
        $organized_data = [];
        foreach ($data as $key => $val) {
            if (is_array($val)) {
                $organized_data[ $key ] = $this->organizeFilesData($val, $type);
            } else {
                $organized_data[ $key ][ $type ] = $val;
            }
        }
        return $organized_data;
    }

    /**
     * Takes the organized $_FILES array (where all file info is located at the same spot as you'd expect an input
     * to be in $_GET or $_POST, with all the file's data located side-by-side in an array) and creates a
     * multi-dimensional array of FileSubmissionInterface objects.
     * @since $VID:$
     * @param $organized_files
     * @return array
     * @throws UnexpectedValueException
     * @throws InvalidArgumentException
     */
    protected function createFileObjects($organized_files)
    {
        if (!is_array($organized_files)) {
            throw new UnexpectedValueException(
                sprintf(
                    esc_html__(
                        'Unexpected PHP $organized_files data format. "%1$s" was expected to be an array.',
                        'event_espresso'
                    ),
                    (string) $organized_files
                )
            );
        }
        $objs = [];
        foreach ($organized_files as $key => $value) {
            if (isset($value['name'], $value['tmp_name'], $value['size'])) {
                $objs[ $key ] = new FileSubmission(
                    $value['name'],
                    $value['tmp_name'],
                    $value['size'],
                    $value['error']
                );
            } else {
                $objs[ $key ] = $this->createFileObjects($value);
            }
        }
        return $objs;
    }
}
// End of file FilesDataHandler.php
// Location: EventEspresso\core\services\request\files/FilesDataHandler.php
