<?php

namespace EventEspresso\core\domain\services\admin\ajax;

use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class WordpressHeartbeat
 * Directs WordPress Heartbeat AJAX requests to the appropriate handler
 *
 * @package EventEspresso\core\domain\services\admin\ajax
 * @author  Brent Christensen
 * @since   4.9.76.p
 */
class WordpressHeartbeat
{

    /**
     * @var LoaderInterface $loader
     */
    protected $loader;

    /**
     * @var RequestInterface $request
     */
    protected $request;


    /**
     * WordpressHeartbeat constructor.
     *
     * @param LoaderInterface  $loader
     * @param RequestInterface $request
     */
    public function __construct(
        LoaderInterface $loader,
        RequestInterface $request
    ) {
        $this->loader = $loader;
        $this->request = $request;
        do_action('AHEE__EventEspresso_core_domain_services_admin_ajax_WordpressHeartbeat__constructor', $this);
        add_action('AHEE__EE_System__core_loaded_and_ready', array($this, 'resolveRoutes'));
    }


    /**
     * @since 4.9.76.p
     * @throws InvalidClassException
     */
    public function resolveRoutes()
    {
        $screenID = $this->request->getRequestParam('screen_id');
        $heartbeat_data = $this->request->getRequestParam('data', []);
        if ($screenID === 'espresso_events') {
            $this->loader->getShared(
                'EventEspresso\core\domain\services\admin\ajax\EventEditorHeartbeat'
            );
        } elseif ($screenID === 'front' && ! empty($heartbeat_data['espresso_thank_you_page'])) {
            $this->loader->getShared(
                'EventEspresso\core\domain\services\admin\ajax\ThankYouPageIpnMonitor'
            );
        }
    }
}
