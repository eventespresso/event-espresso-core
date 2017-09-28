<?php

namespace EventEspresso\tests\mocks\core\services\context;

use Closure;
use EventEspresso\core\services\context\ContextChecker;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class ContextCheckerMock
 * Description
 *
 * @package EventEspresso\tests\mocks\core\services\context
 * @author  Brent Christensen
 * @since   $VID:$
 */
class ContextCheckerMock extends ContextChecker
{


    /**
     * @return string
     */
    public function getIdentifier()
    {
        return $this->identifier();
    }


    /**
     * @return array
     */
    public function getAcceptableValues()
    {
        return $this->acceptableValues();
    }


    /**
     * @return Closure
     */
    public function getEvaluationCallback()
    {
        return $this->evaluationCallback();
    }

}
// Location: ContextCheckerMock.php
