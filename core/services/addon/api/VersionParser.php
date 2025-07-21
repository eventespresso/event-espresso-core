<?php

namespace EventEspresso\core\services\addon\api;

use RuntimeException;

/**
 * VersionParser
 * Attempts to read the version of an add-on from its main file or a VERSION file,
 * but if that fails, will attempt to parse the version from the main file's header comments.
 * If all attempts fail, it throws an exception.
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\services\addon\api
 * @author      Brent Christensen
 * @since       5.0.42
 */
class VersionParser
{
    public static function getAddonVersion(string $main_file): string
    {
        $version = VersionParser::read(dirname($main_file) . '/VERSION');
        $version = trim($version);
        if (! empty($version)) {
            return $version;
        }
        return VersionParser::getVersionFromMainfile($main_file);
    }


    private static function getVersionFromMainfile(string $main_file): string
    {
        $matches       = [];
        $file_contents = VersionParser::read($main_file, true);
        preg_match('~[/*#@]*Version:\s*(?<version>\S*)~', $file_contents, $matches);
        if (isset($matches['version'])) {
            $currentVersion = trim($matches['version']);
            if (! empty($currentVersion)) {
                return $currentVersion;
            }
        }
        throw new RuntimeException(
            sprintf(
                esc_html__('Could not parse version from main file: %s', 'event_espresso'),
                $main_file
            )
        );
    }


    /**
     * Checks if a file exists.
     * If $throw_exception is true, then throws exception if file does not exist.
     *
     * @param string $file_path
     * @param bool   $throw_exception
     * @return bool
     * @throws RuntimeException
     */
    private static function exists(string $file_path, bool $throw_exception = false): bool
    {
        if (! file_exists($file_path)) {
            if ($throw_exception) {
                throw new RuntimeException(
                    sprintf(
                        esc_html__('File does not exist: %s', 'event_espresso'),
                        $file_path
                    )
                );
            }
            return false;
        }
        return true;
    }


    /**
     * Checks if a file is readable.
     * If $throw_exception is true, then throws exception if file is not readable.
     *
     * @param string $file_path
     * @param bool   $throw_exception
     * @return bool
     * @throws RuntimeException
     */
    private static function isReadable(string $file_path, bool $throw_exception = false): bool
    {
        if (! is_readable($file_path)) {
            if ($throw_exception) {
                throw new RuntimeException(
                    sprintf(
                        esc_html__('File is not readable: %s', 'event_espresso'),
                        $file_path
                    )
                );
            }
            return false;
        }
        return true;
    }


    /**
     * Reads and returns file contents.
     * If $throw_exception is true, then throws exception if there is an error reading the file.
     *
     * @param string $file_path
     * @param bool   $throw_exception
     * @return string
     * @throws RuntimeException
     */
    private static function read(string $file_path, bool $throw_exception = false): string
    {
        if (
            VersionParser::exists($file_path, $throw_exception)
            && VersionParser::isReadable($file_path, $throw_exception)
        ) {
            $file_contents = file_get_contents($file_path);
            if ($file_contents !== false) {
                return $file_contents;
            }
        }
        if ($throw_exception) {
            throw new RuntimeException(
                sprintf(
                    esc_html__('Error reading file: %s', 'event_espresso'),
                    $file_path
                )
            );
        }
        return '';
    }
}
