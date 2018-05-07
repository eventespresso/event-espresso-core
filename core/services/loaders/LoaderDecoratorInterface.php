<?php

namespace EventEspresso\core\services\loaders;

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
