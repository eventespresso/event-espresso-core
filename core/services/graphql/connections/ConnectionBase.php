<?php

namespace EventEspresso\core\services\graphql\connections;

/**
 * Class ConnectionBase
 * Description
 *
 * @package EventEspresso\core\services\graphql
 * @author  Manzoor Wani
 * @since   $VID:$
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
}
