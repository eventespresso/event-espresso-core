<?php
namespace EventEspresso\tests\mocks\core\services\assets;

use EventEspresso\core\services\assets\Registry;

class RegistryMock extends Registry
{
    public function verifyMethod($method_name)
    {
        parent::verifyMethod($method_name);
    }


    public function methodNameToJsFriendlyString($method_name)
    {
        return parent::methodNameToJsFriendlyString($method_name);
    }
}
