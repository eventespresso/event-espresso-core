<?php
namespace EventEspresso\core\services\notices;

use EEH_URL;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\route\RouteMatcher;
use InvalidArgumentException;

/**
 * NoticeManager
 * Loaded on every request and takes care of the processing of notices.
 *
 * @package EventEspresso\core\services\notices
 * @author  Darren Ethier
 * @since   4.9.53.rc
 */
class NoticeManager
{
    /**
     * @var NoticesContainerInterface
     */
    private $notices_container;


    /**
     * @var PersistentNoticeDataAccess;
     */
    private $persistent_notice_data_access;


    /**
     * @var NextRequestNoticeDataAccess
     */
    private $next_request_notice_data_access;


    /**
     * @var RequestInterface
     */
    private $request;


    /**
     * @var RouteMatcher
     */
    private $route_matcher;


    /**
     * NoticeManager constructor.
     *
     * @param NoticesContainerInterface   $notices_container
     * @param RequestInterface            $request
     * @param PersistentNoticeDataAccess  $persistent_notice_data_access
     * @param NextRequestNoticeDataAccess $next_request_notice_data_access
     * @param RouteMatcher                $route_matcher
     */
    public function __construct(
        NoticesContainerInterface $notices_container,
        RequestInterface $request,
        PersistentNoticeDataAccess $persistent_notice_data_access,
        NextRequestNoticeDataAccess $next_request_notice_data_access,
        RouteMatcher $route_matcher
    ) {
        $this->notices_container               = $notices_container;
        $this->request                         = $request;
        $this->persistent_notice_data_access   = $persistent_notice_data_access;
        $this->next_request_notice_data_access = $next_request_notice_data_access;
        $this->route_matcher                   = $route_matcher;
        $this->initializePersistentNotices();
    }




    /**
     *  This takes care of determining whether to enqueue any assets for admin notices and makes sure the ajax
     *  callback for dismissing a notice is set.
     */
    private function initializePersistentNotices()
    {
        add_action('wp_ajax_dismiss_ee_nag_notice', array($this, 'dismissPersistentNotice'));
        // setup up notices at priority 9 because `EE_Admin::display_admin_notices()` runs at priority 10,
        // and we want to retrieve and generate any nag notices at the last possible moment
        add_action('admin_notices', array($this, 'maybeEnqueueAssets'), 9);
        add_action('shutdown', array($this, 'noticeCleanup'), 998);
    }


    /**
     * Handles dismissing a persistent notice.
     * @param string $notice_identifier
     * @param bool   $purge
     * @param bool   $return
     */
    public function dismissPersistentNotice($notice_identifier = '', $purge = false, $return = false)
    {
        $notice_identifier = $this->request->getRequestParam('ee_nag_notice', $notice_identifier);
        $notice = $notice_identifier ? $this->notices_container->getNotice($notice_identifier) : null;
        if ($notice instanceof NoticeInterface) {
            $notice->setDismissed(true);
            $notice->setPurge($purge);
            $this->persistent_notice_data_access->saveNotices();
        }
        if ($return) {
            return;
        }
        if ($this->request->isAjax()) {
            // grab any notices and concatenate into string
            echo $this->notices_container->convertNotices(
                NoticeConverterManager::CONVERTER_JSON,
                $this->notices_container->getError()
            );
            exit();
        }
        wp_safe_redirect(
            urldecode(
                $this->request->getRequestParam('return_url', '')
            )
        );
    }


    /**
     *  This conditionally enqueues any assets needed for persistent notice handling depending on whether
     *  there are any persistent notices for this request.
     *
     * @throws InvalidArgumentException
     */
    public function maybeEnqueueAssets()
    {
        $queue_assets = false;
        foreach ($this->notices_container->getPersistentNotices() as $notice) {
            if ($this->route_matcher->isOnRoute($notice->getRouteMatchConfigIdentifier())) {
                $queue_assets = true;
            }
        }
        if ($queue_assets) {
            //scripts have already been registered so just need to do localize_script for back compat
            //@todo update this and anything dependent on it so the localize script can be just using our assets\Registry
            //class
            wp_localize_script(
                'ee_error_js',
                'ee_dismiss',
                array(
                    'return_url'    => urlencode(
                        EEH_URL::current_url()
                    ),
                    'ajax_url'      => WP_AJAX_URL,
                    'unknown_error' => esc_html__(
                        'An unknown error has occurred on the server while attempting to dismiss this notice.',
                        'event_espresso'
                    ),
                )
            );
            wp_enqueue_script('ee_error_js');
        }
    }


    /**
     * Runs on shutdown and persists any notices needing persisted to the db.
     */
    public function noticeCleanup()
    {
        //save persistent notices
        $this->persistent_notice_data_access->saveNotices();
        $this->next_request_notice_data_access->saveNotices();
    }
}
