<?php

namespace EventEspresso\core\services\loaders;

use EventEspresso\core\domain\values\FullyQualifiedName;

interface LoaderDecoratorInterface
{
    /**
     * @param FullyQualifiedName|string $fqcn
     * @param array                     $arguments
     * @param bool                      $shared
     * @return mixed
     */
    public function load($fqcn, array $arguments = array(), bool $shared = true);



    /**
     * calls reset() on loader if method exists
     */
    public function reset();
}
