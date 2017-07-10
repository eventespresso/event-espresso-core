<?php

namespace EventEspresso\tests\includes;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\tests\mocks\core\services\activation\ActivationHistoryExtendedMock;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class CoreActivationTestsHelper
 * Description
 *
 * @package EventEspresso\tests\includes
 * @author  Brent Christensen
 * @since   $VID:$
 */
class CoreActivationTestsHelper extends ActivationTestsHelper
{



    /**
     * @param string $current_version
     * @return ActivationHistoryExtendedMock
     * @throws InvalidDataTypeException
     */
    public static function getActivationHistory($current_version = '1.2.3.p')
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

}
// Location: CoreActivationTestsHelper.php
