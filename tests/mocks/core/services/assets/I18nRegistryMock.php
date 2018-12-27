<?php

namespace EventEspresso\tests\mocks\core\services\assets;


use EventEspresso\core\services\assets\I18nRegistry;

class I18nRegistryMock extends I18nRegistry
{

    private $track_calls_to_method = array();


    protected function registerInlineScript($handle, array $translations, $domain)
    {
        $this->incrementCallToMethod(__METHOD__);
        parent::registerInlineScript($handle, $translations, $domain);
    }


    private function incrementCallToMethod($method_name)
    {
        if (! isset($this->track_calls_to_method[ $method_name ])) {
            $this->track_calls_to_method[ $method_name ] = 0;
        }
        $this->track_calls_to_method[ $method_name ]++;
    }


    public function getCountOfMethodCalled($method_name)
    {
        return isset($this->track_calls_to_method[ $method_name ])
            ? $this->track_calls_to_method[ $method_name ]
            : 0;
    }
}