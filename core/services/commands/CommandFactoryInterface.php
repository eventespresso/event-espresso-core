<?php

namespace EventEspresso\core\services\commands;

use InvalidArgumentException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

defined('EVENT_ESPRESSO_VERSION') || exit;



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
// End of file CommandFactoryInterface.php
// Location: EventEspresso\core\services\commands/CommandFactoryInterface.php