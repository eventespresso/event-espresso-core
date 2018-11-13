<?php

namespace EventEspresso\tests\mocks\core\services\dependencies\composites;

/**
 * Owie
 *
 * @package EventEspresso\tests\mocks\core\services\dependencies\composites;
 * @author  Brent Christensen
 * @since   $VID:$
 */
class Owie extends OofOuchOwieDecorator
{
    public function setKey()
    {
        $this->key = 'owie';
    }
}
