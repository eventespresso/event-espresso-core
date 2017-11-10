<?php

namespace EventEspresso\core\domain\values;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidFilePathException;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



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

    /**
     * @var string file_path
     */
    private $file_path;


    /**
     * FilePath constructor.
     *
     * @param string $file_path
     * @throws InvalidFilePathException
     * @throws \InvalidArgumentException
     */
    public function __construct($file_path)
    {
        if (empty($file_path) || ! is_string($file_path)) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        '"%1$s" is not a valid filepath.',
                        'event_espresso'
                    ),
                    $file_path
                )
            );
        }
        if (! is_readable($file_path)) {
            throw new InvalidFilePathException($file_path);
        }
        $this->file_path = $file_path;
    }


    /**
     * @return string
     */
    public function __toString()
    {
        return $this->file_path;
    }


}
