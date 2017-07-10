<?php

namespace EventEspresso\tests\includes;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class ActivationTestsHelper
 * Description
 *
 * @package EventEspresso\tests\includes\scenarios
 * @author  Brent Christensen
 * @since   $VID:$
 */
class ActivationTestsHelper
{



    /**
     * @param string $current_version
     * @param int    $major_start
     * @param int    $minor_start
     * @param int    $patch_start
     * @return array
     */
    public static function versionHistoryBuilder($current_version, $major_start = 1, $minor_start = 0, $patch_start = 0)
    {
        $now = time();
        $timestamp = $now - mt_rand(YEAR_IN_SECONDS * 2, YEAR_IN_SECONDS * 4);
        $version_history = array();
        $major_versions = $major_start + 10;
        for ($major = $major_start; $major <= $major_versions; $major++) {
            $minor_versions = ActivationTestsHelper::getLogOf(mt_rand(1, 100000)) + mt_rand(0, 3) + $minor_start;
            for ($minor = $minor_start; $minor <= $minor_versions; $minor++) {
                $patch_versions = ActivationTestsHelper::getLogOf(mt_rand(1, 1000000000)) + mt_rand(0, 12);
                for ($patch = $patch_start; $patch <= $patch_versions; $patch++) {
                    $version_string = "{$major}.{$minor}.{$patch}.p";
                    // return version history if next generated version matches current version
                    if (version_compare($version_string, $current_version, '>=')) {
                        return $version_history;
                    }
                    $activations = ActivationTestsHelper::getLogOf(mt_rand(1, 1000)) - mt_rand(0, 4);
                    if ($activations > 1) {
                        for ($f = 0; $f <= $activations; $f++) {
                            if (empty($version_history[$version_string])) {
                                $version_history[$version_string] = array();
                            }
                            $version_history[$version_string][$f] = ActivationTestsHelper::getActivationDate(
                                $timestamp
                            );
                            // don't allow timestamps to exceed NOW
                            if ($timestamp >= $now) {
                                unset($version_history[$version_string][$f]);
                                if (empty($version_history[$version_string])) {
                                    unset($version_history[$version_string]);
                                }
                                return $version_history;
                            }
                        }
                    } else {
                        $version_history[$version_string] = mt_rand(1, 10) === 1
                            ? ActivationTestsHelper::getActivationDate($timestamp)
                            : array(ActivationTestsHelper::getActivationDate($timestamp));
                        // don't allow timestamps to exceed NOW
                        if ($timestamp >= $now) {
                            unset($version_history[$version_string]);
                            return $version_history;
                        }
                    }
                    if (empty($version_history[$version_string])) {
                        unset($version_history[$version_string]);
                    }
                }
                $patch_start = 0;
            }
            $minor_start = 0;
        }
        return $version_history;
    }



    /**
     * @param int $number
     * @return int
     */
    public static function getLogOf($number)
    {
        $number = (int)ceil(log10($number));
        return $number >= 1
            ? $number
            : 1;
    }



    /**
     * @param int $timestamp
     * @return false|string
     */
    public static function getActivationDate(&$timestamp)
    {
        $timestamp += mt_rand(HOUR_IN_SECONDS, WEEK_IN_SECONDS);
        return date('Y-m-d H:i:s', $timestamp);
    }



    /**
     * @param array  $version_history
     * @param string $version_string
     * @return array
     */
    public static function addVersion(array $version_history, $version_string = '')
    {
        $version_history[$version_string] = array(current_time('mysql'));
        return $version_history;
    }



}
// Location: ActivationTestsHelper.php
