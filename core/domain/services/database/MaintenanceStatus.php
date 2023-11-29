<?php

namespace EventEspresso\core\domain\services\database;

/**
 * convenience class for setting and checking the current maintenance mode status
 *
 * @since 5.0.12.p
 */
class MaintenanceStatus
{
    /**
     * Entire site is in maintenance mode
     */
    public const FULL_SITE = 'FULL_SITE';

    /**
     * Frontend is in maintenance mode, but admin is available
     */
    public const PUBLIC_ONLY = 'PUBLIC_ONLY';

    /**
     * Maintenance mode is disabled
     */
    public const DISABLED = 'DISABLED';


    private static string $status = MaintenanceStatus::DISABLED;


    public static function isFullSite(): bool
    {
        return MaintenanceStatus::$status === MaintenanceStatus::FULL_SITE;
    }

    public static function isNotFullSite(): bool
    {
        return MaintenanceStatus::$status !== MaintenanceStatus::FULL_SITE;
    }

    public static function isPublicOnly(): bool
    {
        return MaintenanceStatus::$status === MaintenanceStatus::PUBLIC_ONLY;
    }

    public static function isDisabled(): bool
    {
        return MaintenanceStatus::$status === MaintenanceStatus::DISABLED;
    }

    public static function isNotDisabled(): bool
    {
        return MaintenanceStatus::$status !== MaintenanceStatus::DISABLED;
    }

    public static function setFullSiteMaintenanceMode(): void
    {
        MaintenanceStatus::$status = MaintenanceStatus::FULL_SITE;
    }

    public static function setPublicOnlyMaintenanceMode(): void
    {
        MaintenanceStatus::$status = MaintenanceStatus::PUBLIC_ONLY;
    }

    public static function disableMaintenanceMode(): void
    {
        MaintenanceStatus::$status = MaintenanceStatus::DISABLED;
    }
}
