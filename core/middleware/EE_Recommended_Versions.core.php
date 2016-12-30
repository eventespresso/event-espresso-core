<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class EE_Recommended_Versions
 * checks required and recommended versions for both WP and PHP
 * terminates the request if minimum required versions are not met
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.8.20
 */
class EE_Recommended_Versions extends EE_Middleware
{


    /**
     * converts a Request to a Response
     *
     * @param    EE_Request  $request
     * @param    EE_Response $response
     * @return    EE_Response
     */
    public function handle_request(EE_Request $request, EE_Response $response)
    {
        $this->_request = $request;
        $this->_response = $response;
        //$this->_response->add_output( "\n\t IN >>  " . __CLASS__ );
        //$this->_response->set_notice( 1, 'hey look at this' );
        // check required WP version
        if ( ! $this->_minimum_wp_version_required()) {
            $this->_request->un_set('activate', true);
            add_action('admin_notices', array($this, 'minimum_wp_version_error'), 1);
            //$this->_response->add_output( "\n<br />" . 'minimum_wp_version_error' );
            $this->_response->terminate_request();
            $this->_response->deactivate_plugin();
        }
        // check recommended PHP version
        if ( ! $this->_minimum_php_version_recommended()) {
            $this->_display_minimum_recommended_php_version_notice();
        }
        $this->_response = $this->process_request_stack($this->_request, $this->_response);
        //$this->_response->add_output( "\n\t OUT << " . __CLASS__ );
        return $this->_response;
    }


    /**
     * Helper method to assess installed wp version against given values.
     * By default this compares the required minimum version of WP for EE against the installed version of WP
     *
     * Note, $wp_version is the first parameter sent into the PHP version_compare function (what is being checked against)
     * so consider that when sending in your values.
     *
     * @param string $version_to_check
     * @param string $operator
     * @return bool
     */
    public static function check_wp_version($version_to_check = EE_MIN_WP_VER_REQUIRED, $operator = '>=')
    {
        global $wp_version;
        return version_compare(
            //first account for wp_version being pre-release (like RC, beta etc which are usually in the format like
            //4.7-RC3-39519
            strpos($wp_version, '-') > 0 ? substr($wp_version, 0, strpos($wp_version, '-')) : $wp_version,
            $version_to_check,
            $operator
        );
    }



    /**
     *    _minimum_wp_version_required
     *
     * @access private
     * @return boolean
     */
    private function _minimum_wp_version_required()
    {
        return self::check_wp_version();
    }



    /**
     *    _check_php_version
     *
     * @access private
     * @param string $min_version
     * @return boolean
     */
    private function _check_php_version($min_version = EE_MIN_PHP_VER_RECOMMENDED)
    {
        return version_compare(PHP_VERSION, $min_version, '>=') ? true : false;
    }



    /**
     *    _minimum_php_version_recommended
     *
     * @access private
     * @return boolean
     */
    private function _minimum_php_version_recommended()
    {
        return $this->_check_php_version(EE_MIN_PHP_VER_RECOMMENDED);
    }



    /**
     *    minimum_wp_version_error
     *
     * @return void
     */
    public function minimum_wp_version_error()
    {
        global $wp_version;
        ?>
        <div class="error">
            <p>
                <?php
                printf(
                        __('We\'re sorry, but Event Espresso requires WordPress version %1$s or greater in order to operate. You are currently running version %2$s.%3$sFor information on how to update your version of WordPress, please go to %4$s.',
                                'event_espresso'),
                        EE_MIN_WP_VER_REQUIRED,
                        $wp_version,
                        '<br/>',
                        '<a href="http://codex.wordpress.org/Updating_WordPress">http://codex.wordpress.org/Updating_WordPress</a>'
                );
                ?>
            </p>
        </div>
        <?php
    }



    /**
     *    _display_minimum_recommended_php_version_notice
     *
     * @access private
     * @return void
     */
    private function _display_minimum_recommended_php_version_notice()
    {
        EE_Error::add_persistent_admin_notice(
                'php_version_' . str_replace('.', '-', EE_MIN_PHP_VER_RECOMMENDED) . '_recommended',
                sprintf(
                        __('Event Espresso recommends PHP version %1$s or greater for optimal performance. You are currently running version %2$s.%3$sIn order to update your version of PHP, you will need to contact your current hosting provider.%3$sFor information on stable PHP versions, please go to %4$s.',
                                'event_espresso'),
                        EE_MIN_PHP_VER_RECOMMENDED,
                        PHP_VERSION,
                        '<br/>',
                        '<a href="http://php.net/downloads.php">http://php.net/downloads.php</a>'
                )
        );
    }


}
// End of file EE_Recommended_Versions.core.php
// Location: /EE_Recommended_Versions.core.php