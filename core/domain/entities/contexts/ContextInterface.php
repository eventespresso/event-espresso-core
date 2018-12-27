<?php

namespace EventEspresso\core\domain\entities\contexts;

/**
 * Class ContextInterface
 * Simple DTO for conveying the background details about why some other logic is being performed,
 * that can assist with the decision making process or simply enhance logging.
 *
 * @package EventEspresso\core\domain\entities\contexts
 * @author  Brent Christensen
 * @since   4.9.54
 */
interface ContextInterface
{

    /**
     * @return string
     */
    public function slug();


    /**
     * @return string
     */
    public function description();
}
