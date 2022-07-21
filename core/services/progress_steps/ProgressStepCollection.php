<?php

namespace EventEspresso\core\services\progress_steps;

use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;

/**
 * Class ProgressStepCollection
 * an SplObjectStorage container for objects that implement
 * \EventEspresso\core\services\progress_steps\ProgressStepInterface
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.0
 */
class ProgressStepCollection extends Collection
{
    /**
     * ProgressStepCollection constructor.
     *
     * @throws InvalidInterfaceException
     */
    public function __construct()
    {
        parent::__construct('\EventEspresso\core\services\progress_steps\ProgressStepInterface');
    }
}
