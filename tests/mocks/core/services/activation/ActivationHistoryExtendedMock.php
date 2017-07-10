<?php

namespace EventEspresso\tests\mocks\core\services\activation;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\services\activation\ActivationHistory;

class ActivationHistoryExtendedMock extends ActivationHistory
{

    const EE_ACTIVATION_HISTORY_OPTION_NAME = 'ee_test_history_option_name';

    const EE_ACTIVATION_INDICATOR_OPTION_NAME = 'ee_test_activation_option_name';

    const EE_ADDON_ACTIVATION_HISTORY_OPTION_NAME = 'ee_addon_test_history_option_name';

    const EE_ADDON_ACTIVATION_INDICATOR_OPTION_NAME = 'ee_addon_test_activation_option_name';



    /**
     * @param array $version_history
     * @return string
     */
    public function getLastVersionFromHistoryArray(array $version_history)
    {
        end($version_history);
        return key($version_history);
    }



    /**
     * @param array|bool $version_history
     */
    public function setMockVersionHistory($version_history)
    {
        $this->version_history = $version_history;
    }



    /**
     * @param string $current_version
     * @throws InvalidDataTypeException
     */
    public function setCurrentVersion($current_version)
    {
        parent::setCurrentVersion($current_version);
    }


    /**
     * @return string
     */
    public function getActivationHistoryOptionName()
    {
        return $this->activation_history_option_name;
    }



    /**
     * @return string
     */
    public function getActivationIndicatorOptionName()
    {
        return $this->activation_indicator_option_name;
    }

}
