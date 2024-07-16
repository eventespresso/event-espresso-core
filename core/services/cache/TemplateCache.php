<?php

namespace EventEspresso\core\services\cache;

use Closure;
use EE_Config;
use EE_Template_Config;
use EEH_Array;

/**
 * TemplateCache
 *
 * Responsible for caching templates.
 * The cache is stored both locally for fast retrieval,
 * and in transient storage for persistence.
 * Transient storage is automatically cleared after a predefined time.
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\services\cache
 * @author      Brent Christensen
 * @since       5.0.21.p
 */
class TemplateCache
{
    private const CACHE_PREFIX = 'ee_template_cache_';

    private static array $cached_templates = [];

    private static ?EE_Template_Config $template_config = null;

    private static ?TransientCacheStorage $transient_cache_storage = null;


    private static function getTemplateConfig(): EE_Template_Config
    {
        if (self::$template_config === null) {
            $template_config       = EE_Config::instance()->template_settings;
            self::$template_config = $template_config instanceof EE_Template_Config
                ? $template_config
                : new EE_Template_Config();
        }
        return self::$template_config;
    }


    private static function getTransientCacheStorage(): TransientCacheStorage
    {
        if (self::$transient_cache_storage === null) {
            self::$transient_cache_storage = new TransientCacheStorage(TransientCacheStorage::FREQUENCY_5_MINUTES);
        }
        return self::$transient_cache_storage;
    }


    private static function cachingEnabled(): bool
    {
        $template_config = self::getTemplateConfig();
        return $template_config->templateCachingEnabled() && ! is_admin();
    }


    public static function clearCache()
    {
        $transient_cache_storage = self::getTransientCacheStorage();
        $transient_cache_storage->deleteMany([self::CACHE_PREFIX]);
    }


    public static function generateCacheID(string $func, array $args): string
    {
        // remove any closures and objects from the args array because they may not be serializable
        $primitives_only = EEH_Array::arrayFilterRecursive(
            $args,
            function ($arg) {
                return ! $arg instanceof Closure && ! is_object($arg);
            }
        );
        return self::CACHE_PREFIX . md5($func . serialize($primitives_only));
    }


    public static function get(string $cache_id): string
    {
        // do nothing if caching is disabled or we're in the admin
        if (! self::cachingEnabled()) {
            return '';
        }
        // check local cache first
        if (isset(self::$cached_templates[ $cache_id ])) {
            return self::$cached_templates[ $cache_id ];
        }
        $transient_cache_storage = self::getTransientCacheStorage();
        $template_path           = (string) $transient_cache_storage->get($cache_id);
        if (! empty($template_path)) {
            self::$cached_templates[ $cache_id ] = $template_path;
        }
        return $template_path;
    }


    public static function set(string $cache_id, string $template_path): void
    {
        // do nothing if caching is disabled or we're in the admin
        if (! self::cachingEnabled()) {
            return;
        }
        self::$cached_templates[ $cache_id ] = $template_path;
        $transient_cache_storage             = self::getTransientCacheStorage();
        $transient_cache_storage->add($cache_id, $template_path, 300);
    }
}
