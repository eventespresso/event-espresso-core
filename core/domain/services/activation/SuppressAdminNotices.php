<?php

namespace EventEspresso\core\domain\services\activation;

class SuppressAdminNotices
{
    public static function suppressWpGraphQlTracking()
    {
        [$client_slug] = explode('/', EE_PLUGIN_BASENAME);
        if ($client_slug) {
            update_option("{$client_slug}_tracking_notice", 'hide');
        }
    }
}
