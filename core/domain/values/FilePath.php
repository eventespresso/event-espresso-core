<?php

namespace EventEspresso\core\domain\values;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidFilePathException;

/**
 * Class FilePath
 * Value Object representing a valid readable filepath
 *
 * @package EventEspresso\core\domain\values
 * @author  Brent Christensen
 * @since   4.9.51
 */
class FilePath
{
    private string $file_path;


    /**
     * FilePath constructor.
     *
     * @param string $file_path
     * @throws InvalidDataTypeException
     * @throws InvalidFilePathException
     */
    public function __construct(string $file_path)
    {
        if (! is_readable($file_path)) {
            throw new InvalidFilePathException($file_path);
        }
        $this->file_path = $file_path;
    }


    /**
     * @return string
     */
    public function __toString(): string
    {
        return $this->file_path;
    }
}
