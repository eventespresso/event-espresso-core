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
 * @since         $VID:$
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
}
// End of file MockCommandHandler.php
// Location: testcases/tests/testcases/core/services/commands/MockCommandHandler.php