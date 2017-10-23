<?php

namespace EventEspresso\core\services\loaders;

defined('EVENT_ESPRESSO_VERSION') || exit;



interface LoaderDecoratorInterface
{

    /**
     * @param string $fqcn
     * @param array  $arguments
     * @param bool   $shared
     * @return mixed
     */
    public function load($fqcn, $arguments = array(), $shared = true);



    /**
     * calls reset() on loader if method exists
     */
    public function reset();

}
// End of file LoaderInterface.php
// Location: core/services/loaders/LoaderInterface.php
