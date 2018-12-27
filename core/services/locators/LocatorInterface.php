<?php
namespace EventEspresso\core\services\locators;

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
     * @access public
     * @param array|string $location
     * @return \FilesystemIterator
     */
    public function locate($location);
}
