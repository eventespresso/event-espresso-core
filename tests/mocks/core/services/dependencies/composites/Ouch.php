<?php

namespace EventEspresso\tests\mocks\core\services\dependencies\composites;

/**
 * Ouch
 *
 * @package EventEspresso\tests\mocks\core\services\dependencies\composites;
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class Ouch extends OofOuchOwieDecorator
{
    public function setKey()
    {
        $this->key = 'ouch';
    }
}
