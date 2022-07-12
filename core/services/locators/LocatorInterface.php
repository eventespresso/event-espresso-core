<?php

namespace EventEspresso\core\services\locators;

use FilesystemIterator;

/**
 * Interface LocatorInterface
 *
 * @package EventEspresso\core\services\locators
 */
interface LocatorInterface
{
    /**
     * given a string or an array of information for where to look,
     * will find all files in that location
     *
     * @param array|string $location
     * @return array
     */
    public function locate($location): array;
}
