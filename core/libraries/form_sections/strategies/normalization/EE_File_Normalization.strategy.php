<?php

/**
 * EE_File_Normalization
 * Takes the input from $_FILES and creates an EE_PHP_Upload_File object.
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class EE_File_Normalization extends EE_Normalization_Strategy_Base
{

    /**
     * Convert the $_FILES inputted data into a well-defined object.
     * @param string $value_to_normalize
     * @return EE_PHP_Uploaded_File
     */
    public function normalize($value_to_normalize)
    {
        if (is_array($value_to_normalize)) {
            return new EE_PHP_Uploaded_File($value_to_normalize);
        } elseif( $value_to_normalize instanceof EE_PHP_Uploaded_File){
            return $value_to_normalize;
        } else {
            throw new EE_Validation_Error(
                esc_html__('The file input has an inavlid format.', 'event_espresso')
            );
        }
    }


    /**
     * Convert the object back into a string of the filename.
     *
     * @param string $normalized_value
     * @return string
     */
    public function unnormalize($normalized_value)
    {
        if ($normalized_value instanceof EE_PHP_Uploaded_File) {
            // Leave it as the object, it can be treated like a string because it
            // overrides __toString()
            return $normalized_value;
        } elseif(is_array($normalized_value)){
            return new EE_PHP_Uploaded_File($normalized_value);
        } else {
            return (string)$normalized_value;
        }
    }
}

/**
 * Class EE_PHP_Uploaded_File
 *
 * A file that was uploaded using an HTML form.
 * See https://secure.php.net/manual/en/features.file-upload.post-method.php
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class EE_PHP_Uploaded_File
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
        $this->tmp_name = $this->extractFromArrayOrThrowException($php_file_info, 'tpm_name');
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