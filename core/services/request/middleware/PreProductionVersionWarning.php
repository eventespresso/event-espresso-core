<?php

namespace EventEspresso\core\services\request\middleware;

use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\ResponseInterface;
use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\exceptions\InvalidDataTypeException;

/**
 * Class NonProductionReadyVersionWarning
 * Displays a warning banner if a non-production version of EE is being run
 *
 * @package EventEspresso\core\services\request\middleware
 * @author  Brent Christensen
 * @since   4.9.52
 */
class PreProductionVersionWarning extends Middleware
{

    /**
     * converts a Request to a Response
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @return ResponseInterface
     */
    public function handleRequest(RequestInterface $request, ResponseInterface $response)
    {
        $this->request = $request;
        $this->response = $response;
        $this->displayPreProductionVersionWarning();
        $this->response = $this->processRequestStack($this->request, $this->response);
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
        if ($this->request->isAjax()) {
            return;
        }
        // skip stable releases
        if (substr(EVENT_ESPRESSO_VERSION, -5) !== '.beta') {
            return;
        }
        // site admin has authorized use of non-stable release candidate for production
        if (defined('ALLOW_NON_STABLE_RELEASE_ON_LIVE_SITE') && ALLOW_NON_STABLE_RELEASE_ON_LIVE_SITE) {
            return;
        }
        // post release candidate warning
        if ($this->request->isAdmin()) {
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
        new PersistentAdminNotice(
            'preProductionVersionAdminNotice_' . EVENT_ESPRESSO_VERSION,
            $this->warningNotice()
        );
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
