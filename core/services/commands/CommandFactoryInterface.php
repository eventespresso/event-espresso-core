<?php

namespace EventEspresso\core\services\commands;

interface CommandFactoryInterface
{
    /**
     * @param string $command_fqcn
     * @param array  $arguments
     * @return mixed
     */
    public function getNew(string $command_fqcn, array $arguments = []);
}
