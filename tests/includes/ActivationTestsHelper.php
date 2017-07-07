<?php

namespace EventEspresso\tests\includes;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\services\activation\ActivationHistory;
use EventEspresso\core\services\activation\RequestType;
use EventEspresso\tests\mocks\core\services\activation\ActivationHistoryExtendedMock;
use EventEspresso\tests\mocks\core\services\request\RequestTypeDetectorExtendedMock;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;


class ActivationTestsHelper
{



    /**
     * @param string $current_version
     * @return ActivationHistoryExtendedMock
     * @throws InvalidDataTypeException
     */
    public static function getActivationHistory($current_version = '0.0.1.p')
    {
        return new ActivationHistoryExtendedMock(
            ActivationHistoryExtendedMock::EE_ACTIVATION_HISTORY_OPTION_NAME,
            ActivationHistoryExtendedMock::EE_ACTIVATION_INDICATOR_OPTION_NAME,
            $current_version
        );
    }



    /**
     * @param string $current_version
     * @param int    $major
     * @param int    $minor
     * @param int    $patch
     * @return array
     */
    public static function getVersionHistory($current_version = '0.0.1.p', $major = 1, $minor = 0, $patch = 0)
    {
        return ActivationTestsHelper::versionHistoryBuilder(
            $current_version,
            $major,
            $minor,
            $patch
        );
    }



    /**
     * @param string $current_version
     * @param int    $major
     * @param int    $minor
     * @param int    $patch
     * @return array
     * @throws InvalidDataTypeException
     */
    public static function getActivationAndVersionHistory(
        $current_version = '0.0.1.p',
        $major = 1,
        $minor = 0,
        $patch = 0
    ) {
        return array(
            // activation history
            ActivationTestsHelper::getActivationHistory($current_version),
            // version history
            ActivationTestsHelper::getVersionHistory(
                $current_version,
                $major,
                $minor,
                $patch
            )
        );
    }



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



    /**
     * @param ActivationHistory $activation_history
     * @return RequestType
     * @throws InvalidArgumentException
     */
    public static function getAndDetectRequestType(ActivationHistory $activation_history) {
        $detector = new RequestTypeDetectorExtendedMock($activation_history);
        $detector->resolveFromActivationHistory();
        return $detector->getRequestType();
    }



    /**
     * No version history exists in the database
     * ie: No version has EVER been previously activated
     * Activation indicator is NOT set
     *
     * @return ActivationHistoryExtendedMock
     * @throws InvalidDataTypeException
     */
    public static function getActivationHistoryForNewActivation()
    {
        return ActivationTestsHelper::getActivationHistory();
    }



    /**
     * Current version matches last activated version
     * Activation indicator is NOT set
     * Current version has been previously activated
     *
     * @param string $current_version
     * @return ActivationHistoryExtendedMock
     * @throws InvalidDataTypeException
     */
    public static function getActivationHistoryForNormalRequest($current_version = '1.5.0.p')
    {
        /** @var ActivationHistoryExtendedMock $activation_history */
        list($activation_history, $version_history) = ActivationTestsHelper::getActivationAndVersionHistory(
            $current_version
        );
        $activation_history->updateActivationHistory(
            $version_history,
            $current_version
        );
        return $activation_history;
    }



    /**
     * Current version higher than last activated version
     * Activation indicator is NOT set
     * Current version has been previously activated
     *
     * @param string $current_version
     * @return ActivationHistoryExtendedMock
     * @throws InvalidDataTypeException
     */
    public static function getActivationHistoryForUpgradeRequest($current_version = '1.5.0.p')
    {
        /** @var ActivationHistoryExtendedMock $activation_history */
        list($activation_history, $version_history) = ActivationTestsHelper::getActivationAndVersionHistory(
            $current_version
        );
        $activation_history->setMockVersionHistory($version_history);
        return $activation_history;
    }



    /**
     * Current version lower than last activated version
     * Activation indicator is NOT set
     * Current version has been previously activated
     *
     * @param string $current_version
     * @param string $prev_version
     * @return ActivationHistoryExtendedMock
     * @throws InvalidDataTypeException
     */
    public static function getActivationHistoryForDowngradeRequest(
        $current_version = '1.4.9.p',
        $prev_version = '1.5.0.p'
    ) {
        /** @var ActivationHistoryExtendedMock $activation_history */
        list($activation_history, $version_history) = ActivationTestsHelper::getActivationAndVersionHistory(
            $prev_version
        );
        $activation_history->updateActivationHistory($version_history, $prev_version);
        $activation_history->setCurrentVersion($current_version);
        return $activation_history;
    }



    /**
     * Current version higher matches last activated version
     * Activation indicator IS set
     * Current version has been previously activated
     *
     * @param string $current_version
     * @return ActivationHistoryExtendedMock
     * @throws InvalidDataTypeException
     */
    public static function getActivationHistoryForReActivation($current_version = '1.5.0.p')
    {
        /** @var ActivationHistoryExtendedMock $activation_history */
        list($activation_history, $version_history) = ActivationTestsHelper::getActivationAndVersionHistory(
            $current_version
        );
        $activation_history->updateActivationHistory($version_history, $current_version);
        $activation_history->setActivationIndicator();
        return $activation_history;
    }



    /**
     * Current version higher than last activated version
     * Activation indicator IS set
     * Current version has been previously activated
     *
     * @param string $current_version
     * @return ActivationHistoryExtendedMock
     * @throws InvalidDataTypeException
     */
    public static function getActivationHistoryForUpgradeActivation($current_version = '1.5.0.p')
    {
        /** @var ActivationHistoryExtendedMock $activation_history */
        list($activation_history, $version_history) = ActivationTestsHelper::getActivationAndVersionHistory(
            $current_version
        );
        $activation_history->setMockVersionHistory($version_history);
        $activation_history->setActivationIndicator();
        return $activation_history;
    }



    /**
     * Current version lower than last activated version
     * Activation indicator IS set
     * Current version has been previously activated
     *
     * @param string $current_version
     * @param string $prev_version
     * @return ActivationHistoryExtendedMock
     * @throws InvalidDataTypeException
     */
    public static function getActivationHistoryForDowngradeActivation(
        $current_version = '1.4.9.p',
        $prev_version = '1.5.0.p'
    ) {
        /** @var ActivationHistoryExtendedMock $activation_history */
        list($activation_history, $version_history) = ActivationTestsHelper::getActivationAndVersionHistory(
            $prev_version
        );
        $activation_history->updateActivationHistory($version_history, $prev_version);
        $activation_history->setActivationIndicator();
        $activation_history->setCurrentVersion($current_version);
        return $activation_history;
    }



    /**
     * Current version higher than last activated version
     * Activation indicator is NOT set
     * Current version has NEVER been previously activated, therefore  may require DMS
     *
     * @param string $current_version
     * @param string $prev_version
     * @return ActivationHistoryExtendedMock
     * @throws InvalidDataTypeException
     */
    public static function getActivationHistoryForNewVersionUpgrade(
        $current_version = '1.5.1.p',
        $prev_version = '1.5.0.p'
    ) {
        /** @var ActivationHistoryExtendedMock $activation_history */
        list($activation_history, $version_history) = ActivationTestsHelper::getActivationAndVersionHistory(
            $prev_version
        );
        $activation_history->setMockVersionHistory($version_history);
        $activation_history->setCurrentVersion($current_version);
        return $activation_history;
    }



    /**
     * Current version lower than last activated version
     * Activation indicator is NOT set
     * Current version has NEVER been previously activated, therefore  may require DMS
     *
     * @param string $current_version
     * @return ActivationHistoryExtendedMock
     * @throws InvalidDataTypeException
     */
    public static function getActivationHistoryForNewVersionDowngrade($current_version = '1.5.0.p') {
        /** @var ActivationHistoryExtendedMock $activation_history */
        list($activation_history, $version_history) = ActivationTestsHelper::getActivationAndVersionHistory(
            $current_version
        );
        // go to end of history array
        end($version_history);
        // then jump back to the previous version activated
        prev($version_history);
        // prev($version_history);
        $old_version = key($version_history);
        unset($version_history[$old_version]);
        $activation_history->updateActivationHistory($version_history, $current_version);
        $activation_history->setCurrentVersion($old_version);
        return $activation_history;
    }



}
