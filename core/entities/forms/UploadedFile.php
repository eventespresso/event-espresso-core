<?php

namespace EventEspresso\core\entities\forms;

use InvalidArgumentException;

/**
 * Class UploadedFile
 *
 * A file that was uploaded using an HTML form.
 * See https://secure.php.net/manual/en/features.file-upload.post-method.php
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class UploadedFile
{
    /**
     * @var string original name on the client machine
     */
    protected $name;

    /**
     * @var string mime type
     */
    protected $type;

    /**
     * @var int in bytes
     */
    protected $size;

    /**
     * @var string local filepath to the temporary file
     */
    protected $tmp_name;

    /**
     * @var string one of https://secure.php.net/manual/en/features.file-upload.errors.php
     */
    protected $error;

    public function __construct($php_file_info)
    {
        $this->name = $this->extractFromArrayOrThrowException($php_file_info, 'name');
        try {
            $this->type = $this->extractFromArrayOrThrowException($php_file_info, 'type');
        } catch (InvalidArgumentException $e) {
            // The browser must have not provided the mimetype, oh well.
            $this->type = 'text/html';
        }
        $this->size = $this->extractFromArrayOrThrowException($php_file_info, 'size', 'int');
        $this->tmp_name = $this->extractFromArrayOrThrowException($php_file_info, 'tmp_name');
    }

    /**
     * Makes sure the input has the desired key and casts it as the appropriate type.
     * @since $VID:$
     * @param $php_file_info_array
     * @param $desired_key
     * @param string $cast_as "string" or "int"
     * @return int|string
     * @throws InvalidArgumentException
     */
    protected function extractFromArrayOrThrowException($php_file_info_array, $desired_key, $cast_as = 'string')
    {
        if (!isset($php_file_info_array[$desired_key])) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__('PHP Upload data for a file was missing the key %1$s', 'event_espresso'),
                    $desired_key
                )
            );
        }
        $raw_value = $php_file_info_array[$desired_key];
        switch ($cast_as) {
            case 'int':
                return (int)$raw_value;
            case 'string':
            default:
                return (string)$raw_value;
        }
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @return int
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * @return string
     */
    public function getTmpName()
    {
        return $this->tmp_name;
    }

    /**
     * @return string
     */
    public function getError()
    {
        return $this->error;
    }

    /**
     * @since $VID:$
     * @return string
     */
    public function __toString()
    {
        return $this->getTmpName();
    }
}
// End of file UploadedFile.php
// Location: EventEspresso\core\entities\forms/UploadedFile.php
