<?php

namespace EventEspresso\core\services\loaders;

defined('EVENT_ESPRESSO_VERSION') || exit;



interface LoaderDecoratorInterface
{

    /**
     * @param string $fqcn
     * @param array  $arguments
     * @return mixed
     */
    public function load($fqcn, $arguments = array());



    /**
     * calls reset() on loader if method exists
     *
     * @param bool $hard
     */
    public function reset($hard = true);

}
// End of file LoaderInterface.php
// Location: core/services/loaders/LoaderInterface.php
