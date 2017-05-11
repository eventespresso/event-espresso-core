<?php

namespace EventEspresso\core\services\commands;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderInterface;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CommandFactory
 * Uses a LoaderInterface class to build and return Command
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CommandFactory implements CommandFactoryInterface
{



    /**
     * @var LoaderInterface $loader
     */
    private $loader;



    /**
     * CommandFactory constructor
     *
     * @param LoaderInterface $loader
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public function __construct(LoaderInterface $loader = null)
    {
       $this->loader = $loader;
    }



    /**
     * @param string $command_fqcn
     * @param array  $arguments
     * @return mixed
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function getNew($command_fqcn, $arguments = array())
    {
        return $this->loader->getNew($command_fqcn, $arguments);
    }



}
// End of file CommandFactory.php
// Location: EventEspresso\core\services\commands/CommandFactory.php