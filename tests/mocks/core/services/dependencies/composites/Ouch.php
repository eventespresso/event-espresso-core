<?php

namespace EventEspresso\tests\mocks\core\services\dependencies\composites;

/**
 * Ouch
 *
 * @package EventEspresso\tests\mocks\core\services\dependencies\composites;
 * @author  Brent Christensen
 * @since   $VID:$
 */
class Ouch extends OofOuchOwieDecorator
{
    public function setKey()
    {
        $this->key = 'ouch';
    }
}
