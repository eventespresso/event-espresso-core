<?php

namespace EventEspresso\core\services\deprecated;

/**
 * Class DeprecationManager
 *
 * @author Hossein Rafiei <hoseinrafiei@gmail.com>
 * @since  5.0.0.p
 */
class DeprecationManager
{
    /**
     * Load Deprecations
     *
     * @return void
     */
    public static function loadDeprecations(): void
    {
        $files = glob(EE_CORE . 'domain/deprecated/v*.php');
        foreach ($files as $filename) {
            include $filename;
        }
    }
}
