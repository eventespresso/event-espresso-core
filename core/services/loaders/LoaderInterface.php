<?php

namespace EventEspresso\core\services\loaders;

defined('EVENT_ESPRESSO_VERSION') || exit;



interface LoaderInterface
{

    /**
     * Can be for instantiating a new instance of a class,
     * or for getting a shared instance of a class (default)
     *
     * @param string $fqcn
     * @param array  $arguments
     * @param bool   $shared
     * @return mixed
     */
    public function load($fqcn, $arguments = array(), $shared = true);

    /**
     * Used for instantiating a new instance of a class
     *
     * @param string $fqcn
     * @param array  $arguments
     * @return mixed
     */
    public function getNew($fqcn, $arguments = array());

    /**
     * Used for getting a shared instance of a class
     *
     * @param string $fqcn
     * @param array  $arguments
     * @return mixed
     */
    public function getShared($fqcn, $arguments = array());

    /**
     * calls reset() on loader if method exists
     */
    public function reset();

}
// End of file LoaderInterface.php
// Location: core/services/loaders/LoaderInterface.php