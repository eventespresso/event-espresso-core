<?php

namespace EventEspresso\tests\mocks\core\services\commands;

use EventEspresso\core\domain\services\capabilities\CapCheckInterface;
use EventEspresso\core\services\commands\CommandRequiresCapCheckInterface;
use EventEspresso\tests\mocks\core\domain\services\capabilities\CapCheckMock;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class RequiresCapCheckMockCommand
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class RequiresCapCheckMockCommand extends MockCommand implements CommandRequiresCapCheckInterface
{

    /**
     * @return CapCheckInterface
     */
    public function getCapCheck()
    {
        return new CapCheckMock();
    }

}
// End of file RequiresCapCheckMockCommand.php
// Location: mocks/core/services/commands/RequiresCapCheckMockCommand.php