<?php

if (! class_exists('PluginUpdateEngine\PluginUpdateEngine')) {
    EE_Psr4AutoloaderInit::psr4_loader()->addNamespace('PluginUpdateEngine', __DIR__);

    class PluginUpdateEngineChecker extends PluginUpdateEngine\PluginUpdateEngine
    {
    }
    class PluginUpdateUtility extends PluginUpdateEngine\PluginUpdateUtility
    {
    }
    class PU_PluginInfo extends PluginUpdateEngine\PluginInfo
    {
    }
}
