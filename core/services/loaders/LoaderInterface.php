<?php

namespace EventEspresso\core\services\loaders;

defined('EVENT_ESPRESSO_VERSION') || exit;



interface LoaderInterface
{

    /**
     * @param string $fqcn
     * @param array  $arguments
     * @return mixed
     */
    public function load($fqcn, $arguments = array());

}
// End of file LoaderInterface.php
// Location: core/services/loaders/LoaderInterface.php