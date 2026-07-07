<?php

namespace EventEspresso\core\services\commands;

use EventEspresso\core\services\loaders\LoaderInterface;

/**
 * Class CommandFactory
 * Uses a LoaderInterface class to build and return Command
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class CommandFactory implements CommandFactoryInterface
{
    private LoaderInterface $loader;


    /**
     * CommandFactory constructor
     *
     * @param LoaderInterface $loader
     */
    public function __construct(LoaderInterface $loader)
    {
        $this->loader = $loader;
    }


    /**
     * @param string $command_fqcn
     * @param array  $arguments
     * @return mixed
     */
    public function getNew(string $command_fqcn, array $arguments = [])
    {
        return $this->loader->getNew($command_fqcn, $arguments);
    }
}
