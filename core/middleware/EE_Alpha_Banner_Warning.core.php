<?php

/**
 * Class EE_Alpha_Banner_Warning
 * Displays a warning banner if an ALPHA version of EE is being run
 *
 * @deprecated
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.8.20
 */
class EE_Alpha_Banner_Warning extends EE_Middleware
{


    /**
     * @deprecated 4.9.53
     * @param    EE_Request  $request
     * @param    EE_Response $response
     * @return    EE_Response
     */
    public function handle_request(EE_Request $request, EE_Response $response)
    {
        $this->_request = $request;
        $this->_response = $response;
        $this->display_alpha_banner_warning();
        $this->_response = $this->process_request_stack($this->_request, $this->_response);
        return $this->_response;
    }


    /**
     * @deprecated
     * @return    string
     */
    public function display_alpha_banner_warning()
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__(
                    'This method is deprecated. Please use %1$s instead. All Event Espresso request stack classes have been moved to %2$s and are now under the %3$s namespace',
                    'event_espresso'
                ),
                'EventEspresso\core\services\request\middleware\PreProductionVersionWarning::displayPreProductionVersionWarning()',
                '\core\services\request',
                'EventEspresso\core\services\request'
            ),
            '4.9.52',
            '4.10.0'
        );
    }


    /**
     * @deprecated
     * @return void
     */
    public function alpha_banner_admin_notice()
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__(
                    'This method is deprecated. Please use %1$s instead. All Event Espresso request stack classes have been moved to %2$s and are now under the %3$s namespace',
                    'event_espresso'
                ),
                'EventEspresso\core\services\request\middleware\PreProductionVersionWarning::preProductionVersionAdminNotice()',
                '\core\services\request',
                'EventEspresso\core\services\request'
            ),
            '4.9.52',
            '4.10.0'
        );
    }


    /**
     * @deprecated
     * @return void
     */
    public function alpha_banner_warning_notice()
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__(
                    'This method is deprecated. Please use %1$s instead. All Event Espresso request stack classes have been moved to %2$s and are now under the %3$s namespace',
                    'event_espresso'
                ),
                'EventEspresso\core\services\request\middleware\PreProductionVersionWarning::preProductionVersionWarningNotice()',
                '\core\services\request',
                'EventEspresso\core\services\request'
            ),
            '4.9.52',
            '4.10.0'
        );
    }
}
