<?php

namespace EventEspresso\core\services\locators;

use Countable;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use FilesystemIterator;

/**
 * Class Locator
 * abstract parent for classes that use SPL Iterators
 *
 * @package Event Espresso
 * @author  Brent Christensen
 * @since   4.9.0
 */
abstract class Locator implements LocatorInterface, Countable
{
    /**
     * @var array $flags
     */
    protected $flags = [];


    /**
     * FileLocator constructor.
     *
     * @param array $flags controls how files are found and/or file data is returned
     * @throws InvalidDataTypeException
     */
    public function __construct(array $flags = [])
    {
        if (empty($flags)) {
            $flags = [
                FilesystemIterator::SKIP_DOTS,
                FilesystemIterator::UNIX_PATHS,
                FilesystemIterator::CURRENT_AS_PATHNAME,
            ];
        }
        $this->setFlags($flags);
    }


    /**
     * @see http://php.net/manual/en/class.filesystemiterator.php#filesystemiterator.constants
     * @param array|null $flags
     * @throws InvalidDataTypeException
     */
    public function setFlags(?array $flags)
    {
        if (! is_array($flags)) {
            throw new InvalidDataTypeException('$flags', $flags, 'array');
        }
        $this->flags = $flags;
    }
}
