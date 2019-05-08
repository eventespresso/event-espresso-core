<?php

namespace EventEspresso\tests\mocks\core\services\commands;

use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\commands\CommandHandlerInterface;
use EventEspresso\core\services\commands\CommandInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class MockCommandHandler
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 *
 */
class MockCommandHandler implements CommandHandlerInterface
{
    public $expected = 'EventEspresso\tests\mocks\core\services\commands\MockCommand';
    public $results = null;

    /**
     * @param CommandInterface $command
     * @return mixed
     */
    public function handle(CommandInterface $command)
    {
        return $this->results;
    }


    /**
     * @param CommandInterface $command
     * @return $this|CommandHandlerInterface
     * @throws InvalidEntityException
     * @since 4.9.80.p
     */
    public function verify(CommandInterface $command)
    {
        if (! $command instanceof $this->expected) {
            throw new InvalidEntityException($command, $this->expected);
        }
        return $this;
    }
}
// End of file MockCommandHandler.php
// Location: testcases/tests/testcases/core/services/commands/MockCommandHandler.php
