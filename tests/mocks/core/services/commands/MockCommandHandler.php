<?php

namespace EventEspresso\tests\mocks\core\services\commands;

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
    public $results = null;

    /**
     * @param \EventEspresso\core\services\commands\CommandInterface $command
     * @return mixed
     */
    public function handle(CommandInterface $command)
    {
        return $this->results;
    }

    /**
     * Wrapper for handle, except it verifies the command is of the correct type.
     * @since $VID:$
     * @param CommandInterface $command
     * @return mixed
     */
    public function invokeHandle(CommandInterface $command)
    {
        return $this->handle($command);
    }
}
// End of file MockCommandHandler.php
// Location: testcases/tests/testcases/core/services/commands/MockCommandHandler.php