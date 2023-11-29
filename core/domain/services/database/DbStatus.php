<?php

namespace EventEspresso\core\domain\services\database;

/**
 * convenience class for setting and checking the current database status
 *
 * @since 5.0.12.p
 */
class DbStatus
{
    /**
     * Database is available for access and models can be used to query
     */
    public const ONLINE = 'ONLINE';

    /**
     * Database is unavailable for access and models cannot be used to query
     */
    public const OFFLINE = 'OFFLINE';

    private static string $status = DbStatus::ONLINE;


    public static function isOnline(): bool
    {
        return DbStatus::$status === DbStatus::ONLINE;
    }


    public static function isOffline(): bool
    {
        return DbStatus::$status === DbStatus::OFFLINE;
    }


    public static function setOnline(): void
    {
        DbStatus::$status = DbStatus::ONLINE;
    }


    public static function setOffline(): void
    {
        DbStatus::$status = DbStatus::OFFLINE;
    }
}
