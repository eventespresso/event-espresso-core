<?php

namespace EventEspresso\tests\mocks\core\domain;

use EventEspresso\core\domain\DomainFactory;

class DomainFactoryMock extends DomainFactory
{
    public static function reset()
    {
        DomainFactory::$domains = [];
    }
}
