<?php

namespace EventEspresso\tests\includes;

use EE_NewAddonMock;
use EE_Registry;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\services\activation\ActivationHistory;
use EventEspresso\core\services\activation\RequestType;
use EventEspresso\tests\mocks\core\services\activation\ActivationHistoryExtendedMock;
use EventEspresso\tests\mocks\core\services\request\RequestTypeDetectorExtendedMock;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class ActivationTestsHelper
 *
 * @package       Event Espresso
 * @subpackage    tests
 * @author        Brent Christensen
 * @since         4.9.45
 */
class AddonActivationTestsHelper extends ActivationTestsHelper
{



    /**
     * @return EE_NewAddonMock
     * @throws \EE_Error
     */
    public static function registerAddon()
    {
        // reset activation status to simulate a new activation
        // tests are responsible for faking other activation request types
        delete_option(ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_HISTORY_OPTION_NAME);
        delete_option(ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_INDICATOR_OPTION_NAME);
        require_once EE_TESTS_DIR . 'mocks/addons/EE_NewAddonMock.class.php';
        EE_NewAddonMock::registerWithGivenOptions();
        /** @var EE_NewAddonMock $addon */
        $addon = EE_Registry::instance()->addons->EE_NewAddonMock;
        $addon->setActivationIndicatorOptionName(
            ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_INDICATOR_OPTION_NAME
        );
        $addon->setActivationHistoryOptionName(
            ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_HISTORY_OPTION_NAME
        );
        return $addon;
    }



    /**
     * @param string $current_version
     * @return ActivationHistoryExtendedMock
     * @throws InvalidDataTypeException
     */
    public static function getActivationHistory($current_version = '0.0.1.p')
    {
        return new ActivationHistoryExtendedMock(
            ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_HISTORY_OPTION_NAME,
            ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_INDICATOR_OPTION_NAME,
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
            AddonActivationTestsHelper::getActivationHistory($current_version),
            // version history
            AddonActivationTestsHelper::getVersionHistory(
                $current_version,
                $major,
                $minor,
                $patch
            )
        );
    }
    /**
     * @param ActivationHistory $activation_history
     * @return RequestType
     * @throws InvalidArgumentException
     */
    public static function getAndDetectRequestType(ActivationHistory $activation_history) {
        $detector = new RequestTypeDetectorExtendedMock();
        return $detector->resolveRequestTypeFromActivationHistory($activation_history);
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
        return AddonActivationTestsHelper::getActivationHistory();
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
        list($activation_history, $version_history) = AddonActivationTestsHelper::getActivationAndVersionHistory(
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
        list($activation_history, $version_history) = AddonActivationTestsHelper::getActivationAndVersionHistory(
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
        list($activation_history, $version_history) = AddonActivationTestsHelper::getActivationAndVersionHistory(
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
        list($activation_history, $version_history) = AddonActivationTestsHelper::getActivationAndVersionHistory(
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
        list($activation_history, $version_history) = AddonActivationTestsHelper::getActivationAndVersionHistory(
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
        list($activation_history, $version_history) = AddonActivationTestsHelper::getActivationAndVersionHistory(
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
        list($activation_history, $version_history) = AddonActivationTestsHelper::getActivationAndVersionHistory(
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
        list($activation_history, $version_history) = AddonActivationTestsHelper::getActivationAndVersionHistory(
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
