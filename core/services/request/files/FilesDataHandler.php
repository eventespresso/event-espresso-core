<?php

namespace EventEspresso\core\services\request\files;

use EventEspresso\core\services\collections\Collection;
use EventEspresso\core\services\request\Request;
use InvalidArgumentException;
use UnexpectedValueException;

/**
 * Class FilesDataHandler
 *
 * Helper for dealing with PHP's $_FILES. Instead of working with a sometimes puzzling array, with file info
 * dispersed throughout, creates a single collection of FileSubmissionInterface objects. This collection is a
 * one-dimensional list, where identifiers are the HTML input names.
 * Eg, access all file info for a file input named "file1" using
 *
 * ```
 * $data_handler = LoaderFactory::getLoader()->load(' EventEspresso\core\services\request\files\FilesDataHandler');
 * $file = $data_handler->getFileObject('file1);
 * ```
 *
 * and for a file input named "my[great][file][input]", use the same code but change the last line to:
 *
 * ```
 * $file = $data_handler->getFileObject('my[great][file][input]');
 * ```
 *
 * In both cases, $file will be a FileSubmissionInterface object, containing the file's name, temporary filepath, size,
 * error code, and helpers to get its mime type and extension.
 *
 *
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.9.80.p
 *
 */
class FilesDataHandler
{
    /**
     * @var Request
     */
    protected $request;

    /**
     * @var CollectionInterface | FileSubmissionInterface[]
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
     * @since 4.9.80.p
     * @return CollectionInterface | FileSubmissionInterface[]
     * @throws UnexpectedValueException
     * @throws InvalidArgumentException
     */
    protected function getFileObjects()
    {
        $this->initialize();
        return $this->file_objects;
    }

    /**
     * Sets up the file objects from the request's $_FILES data.
     * @since 4.9.80.p
     * @throws UnexpectedValueException
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    protected function initialize()
    {
        if ($this->initialized) {
            return;
        }
        $this->file_objects = new Collection(
            // collection interface
            'EventEspresso\core\services\request\files\FileSubmissionInterface',
            // collection name
            'submitted_files'
        );
        $files_raw_data = $this->request->filesParams();
        if (empty($files_raw_data)) {
            return;
        }
        if ($this->isStrangeFilesArray($files_raw_data)) {
            $data = $this->fixFilesDataArray($files_raw_data);
        } else {
            $data = $files_raw_data;
        }
        $this->createFileObjects($data);
        $this->initialized = true;
    }

    /**
     * Detects if $_FILES is a weird multi-dimensional array that needs fixing or not.
     * @since 4.9.80.p
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
     * @since 4.9.80.p
     * @param $files_data
     * @return array
     */
    protected function fixFilesDataArray($files_data)
    {
        $sane_files_array = [];
        foreach ($files_data as $top_level_name => $top_level_children) {
            $sub_array = [];
            $sane_files_array[ $top_level_name ] = [];
            foreach ($top_level_children as $file_data_part => $second_level_children) {
                foreach ($second_level_children as $next_level_name => $sub_values) {
                    $sub_array[ $next_level_name ] = $this->organizeFilesData($sub_values, $file_data_part);
                }
                $sane_files_array[ $top_level_name ] = array_replace_recursive(
                    $sub_array,
                    $sane_files_array[ $top_level_name ]
                );
            }
        }
        return $sane_files_array;
    }

    /**
     * Recursively explores the array until it finds a leaf node, and tacks `$type` as a final index in front of it.
     * @since 4.9.80.p
     * @param $data array|string
     * @param $type 'name', 'tmp_name', 'size', or 'error'
     * @param $name string
     * @return array|string
     */
    protected function organizeFilesData($data, $type)
    {
        if (! is_array($data)) {
            return [
                $type => $data
            ];
        }
        $organized_data = [];
        foreach ($data as $input_name_part => $sub_inputs_or_value) {
            if (is_array($sub_inputs_or_value)) {
                $organized_data[ $input_name_part ] = $this->organizeFilesData($sub_inputs_or_value, $type);
            } else {
                $organized_data[ $input_name_part ][ $type ] = $sub_inputs_or_value;
            }
        }
        return $organized_data;
    }

    /**
     * Takes the organized $_FILES array (where all file info is located at the same spot as you'd expect an input
     * to be in $_GET or $_POST, with all the file's data located side-by-side in an array) and creates a
     * multi-dimensional array of FileSubmissionInterface objects. Stores it in `$this->file_objects`.
     * @since 4.9.80.p
     * @param array $organized_files $_FILES but organized like $_POST
     * @param array $name_parts_so_far for multidimensional HTML form names,
     * @throws UnexpectedValueException
     * @throws InvalidArgumentException
     */
    protected function createFileObjects($organized_files, $name_parts_so_far = [])
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
        foreach ($organized_files as $key => $value) {
            $this_input_name_parts = $name_parts_so_far;
            array_push(
                $this_input_name_parts,
                $key
            );
            if (isset($value['name'], $value['tmp_name'], $value['size'])) {
                $html_name = $this->inputNameFromParts($this_input_name_parts);
                $this->file_objects->add(
                    new FileSubmission(
                        $value['name'],
                        $value['tmp_name'],
                        $value['size'],
                        $value['error']
                    ),
                    $html_name
                );
            } else {
                $this->createFileObjects($value, $this_input_name_parts);
            }
        }
    }

    /**
     * Takes the input name parts, like `['my', 'great', 'file', 'input1']`
     * and returns the HTML name for it, "my[great][file][input1]"
     * @since 4.9.80.p
     * @param $parts
     * @throws UnexpectedValueException
     */
    protected function inputNameFromParts($parts)
    {
        if (!is_array($parts)) {
            throw new UnexpectedValueException(esc_html__('Name parts should be an array.', 'event_espresso'));
        }
        $generated_string = '';
        foreach ($parts as $part) {
            if ($generated_string === '') {
                $generated_string = (string) $part;
            } else {
                $generated_string .= '[' . (string) $part . ']';
            }
        }
        return $generated_string;
    }

    /**
     * Gets the input by the indicated $name_parts.
     * Eg if you're looking for an input named "my[great][file][input1]", $name_parts
     * should be `['my', 'great', 'file', 'input1']`.
     * Alternatively, you could use `FileDataHandler::getFileObject('my[great][file][input1]');`
     * @since 4.9.80.p
     * @param $name_parts
     * @throws UnexpectedValueException
     * @return FileSubmissionInterface
     */
    public function getFileObjectFromNameParts($name_parts)
    {
        return $this->getFileObjects()->get($this->inputNameFromParts($name_parts));
    }

    /**
     * Gets the FileSubmissionInterface corresponding to the HTML name provided.
     * @since 4.9.80.p
     * @param $html_name
     * @return mixed
     * @throws InvalidArgumentException
     * @throws UnexpectedValueException
     */
    public function getFileObject($html_name)
    {
        return $this->getFileObjects()->get($html_name);
    }
}
// End of file FilesDataHandler.php
// Location: EventEspresso\core\services\request\files/FilesDataHandler.php
