<?php

namespace EventEspresso\core\services\graphql\connections;

use EEM_Base;

/**
 * Class ConnectionBase
 * Description
 *
 * @package EventEspresso\core\services\graphql
 * @author  Manzoor Wani
 * @since   5.0.0.p
 */
abstract class ConnectionBase implements ConnectionInterface
{
    /**
     * @var EEM_Base $model
     */
    protected $model;

    /**
     * @var string $namespace The graphql namespace/prefix.
     */
    protected $namespace = 'Espresso';


    /**
     * @param EEM_Base $model
     */
    public function __construct(EEM_Base $model)
    {
        $this->model = $model;
    }
}
