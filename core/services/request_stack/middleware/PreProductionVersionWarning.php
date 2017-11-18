<?php

namespace EventEspresso\core\services\request_stack\middleware;

use EE_Request;
use EE_Response;
use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\exceptions\InvalidDataTypeException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class NonProductionReadyVersionWarning
 * Displays a warning banner if a non-production version of EE is being run
 *
 * @package EventEspresso\core\services\request_stack\middleware
 * @author  Brent Christensen
 * @since   4.9.52
 */
class PreProductionVersionWarning extends Middleware
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
        $this->request  = $request;
        $this->response = $response;
        $this->displayPreProductionVersionWarning();
        $this->response = $this->process_request_stack($this->request, $this->response);
        return $this->response;
    }



    /**
     * displays message on frontend of site notifying admin that EE has been temporarily placed into maintenance mode
     *
     * @return void
     */
    public function displayPreProductionVersionWarning()
    {
        // skip AJAX requests
        if (defined('DOING_AJAX') && DOING_AJAX) {
            return;
        }
        // skip stable releases
        if (substr(EVENT_ESPRESSO_VERSION, -2) === '.p') {
            return;
        }
        // site admin has authorized use of non-stable release candidate for production
        if (defined('ALLOW_NON_STABLE_RELEASE_ON_LIVE_SITE') && ALLOW_NON_STABLE_RELEASE_ON_LIVE_SITE) {
            return;
        }
        // post release candidate warning
        if (is_admin()) {
            add_action('admin_notices', array($this, 'preProductionVersionAdminNotice'), -999);
        } else {
            add_action('shutdown', array($this, 'preProductionVersionWarningNotice'), 10);
        }
    }



    /**
     * displays admin notice that current version of EE is not a stable release
     *
     * @return void
     * @throws InvalidDataTypeException
     */
    public function preProductionVersionAdminNotice()
    {
        if ($this->request->isAdmin()) {
            new PersistentAdminNotice(
                'preProductionVersionAdminNotice_' . EVENT_ESPRESSO_VERSION,
                $this->warningNotice()
            );
        }
    }


    /**
     * displays message on frontend of site notifying admin that current version of EE is not a stable release
     *
     * @return void
     */
    public function preProductionVersionWarningNotice()
    {
        echo '<div id="ee-release-candidate-notice-dv" class="ee-really-important-notice-dv"><p>';
        echo $this->warningNotice();
        echo '</p></div>';
    }


    /**
     * @return string
     */
    private function warningNotice()
    {
        return sprintf(
            esc_html__(
                'This version of Event Espresso is for testing and/or evaluation purposes only. It is %1$snot%2$s considered a stable release and should therefore %1$snot%2$s be activated on a live or production website.',
                'event_espresso'
            ),
            '<strong>',
            '</strong>'
        );
    }

}
// Location: NonProductionReadyVersionWarning.php
