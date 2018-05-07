<?php

namespace EventEspresso\core\services\commands;

use InvalidArgumentException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

interface CommandFactoryInterface
{

    /**
     * @param string $command_fqcn
     * @param array  $arguments
     * @return mixed
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function getNew($command_fqcn, $arguments = array());
}
