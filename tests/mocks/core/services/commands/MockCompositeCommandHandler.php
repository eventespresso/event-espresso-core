<?php

namespace EventEspresso\tests\mocks\core\services\commands;

use EventEspresso\core\services\commands\CommandInterface;
use EventEspresso\core\services\commands\CompositeCommandHandler;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class MockCompositeCommandHandler
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class MockCompositeCommandHandler extends CompositeCommandHandler
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
// End of file MockCompositeCommandHandler.php
// Location: EventEspresso\tests\mocks\core\services\commands/MockCompositeCommandHandler.php