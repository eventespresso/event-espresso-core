<?php
namespace EventEspresso\core\services\notifications;

use DomainException;
use EE_Error;
use EE_Request;
use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\domain\services\capabilities\CapabilitiesChecker;
use EventEspresso\core\exceptions\InsufficientPermissionsException;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class PersistentAdminNoticeManager
 * class for managing the loading, display, and storage of PersistentAdminNotice objects
 *
 * @package Event Espresso
 * @author  Brent Christensen
 * @since   4.9.27
 */
class PersistentAdminNoticeManager
{

    const WP_OPTION_KEY = 'ee_pers_admin_notices';

    /**
     * @var Collection|PersistentAdminNotice[] $notice_collection
     */
    private $notice_collection;

    /**
     * @type string $return_url
     */
    private $return_url;

    /**
     * @type CapabilitiesChecker $capabilities_checker
     */
    private $capabilities_checker;

    /**
     * @type EE_Request $request
     */
    private $request;



    /**
     * CapChecker constructor
     *
     * @param string $return_url
     * @param CapabilitiesChecker $capabilities_checker
     * @param EE_Request          $request
     * @throws InvalidDataTypeException
     */
    public function __construct($return_url = '', CapabilitiesChecker $capabilities_checker, EE_Request $request)
    {
        $this->setReturnUrl($return_url);
        $this->capabilities_checker = $capabilities_checker;
        $this->request = $request;
        //ok so we want to enable the entire admin
        add_action('admin_notices', array($this, 'displayNotices'), 9);
        add_action('network_admin_notices', array($this, 'displayNotices'), 9);
        add_action('wp_ajax_dismiss_ee_nag_notice', array($this, 'dismissNotice'));
        add_action('shutdown', array($this, 'saveNotices'));
    }



    /**
     * @param string $return_url
     * @throws InvalidDataTypeException
     */
    private function setReturnUrl($return_url)
    {
        if ( ! is_string($return_url)) {
            throw new InvalidDataTypeException('$return_url', $return_url, 'string');
        }
        $this->return_url = $return_url;
    }



    /**
     * @return Collection
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws DomainException
     */
    protected function getPersistentAdminNoticeCollection()
    {
        if ( ! $this->notice_collection instanceof Collection) {
            $this->notice_collection = new Collection(
                '\EventEspresso\core\domain\entities\notifications\PersistentAdminNotice'
            );
            $this->retrieveStoredNotices();
            $this->registerNotices();
        }
        return $this->notice_collection;
    }



    /**
     * generates PersistentAdminNotice objects for all non-dismissed notices saved to the db
     *
     * @return void
     * @throws DomainException
     * @throws InvalidDataTypeException
     */
    public function retrieveStoredNotices()
    {
        $persistent_admin_notices = get_option(PersistentAdminNoticeManager::WP_OPTION_KEY, array());
        // \EEH_Debug_Tools::printr($persistent_admin_notices, '$persistent_admin_notices', __FILE__, __LINE__);
        if ( ! empty($persistent_admin_notices)) {
            foreach ($persistent_admin_notices as $name => $details) {
                if (is_array($details)){
                    if (
                        ! isset(
                            $details['message'],
                            $details['capability'],
                            $details['cap_context'],
                            $details['dismissed']
                        )
                    ) {
                        throw new DomainException(
                            sprintf(
                                esc_html__(
                                    'The "%1$s" PersistentAdminNotice could not be retrieved from the database.',
                                    'event_espresso'
                                ),
                                $name
                            )
                        );
                    }
                    // new format for nag notices
                    new PersistentAdminNotice(
                        $name,
                        $details['message'],
                        false,
                        $details['capability'],
                        $details['cap_context'],
                        $details['dismissed']
                    );
                } else {
                    try {
                        // old nag notices, that we want to convert to the new format
                        new PersistentAdminNotice(
                            $name,
                            (string)$details,
                            false,
                            '',
                            '',
                            empty($details)
                        );
                    } catch (\Exception $e) {
                        EE_Error::add_error($e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
                    }
                }
                // each notice will self register when the action hook in registerNotices is triggered
            }
        }
    }



    /**
     * exposes the Persistent Admin Notice Collection via an action
     * so that PersistentAdminNotice objects can be added and/or removed
     * without compromising the actual collection like a filter would
     */
    public function registerNotices()
    {
        do_action(
            'AHEE__EventEspresso_core_services_notifications_PersistentAdminNoticeManager__registerNotices',
            $this->notice_collection
        );
    }



    /**
     * @throws DomainException
     * @throws InvalidClassException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function displayNotices()
    {
        $this->notice_collection = $this->getPersistentAdminNoticeCollection();
        if ($this->notice_collection->hasObjects()) {
            // and display notices
            foreach ($this->notice_collection as $persistent_admin_notice) {
                /** @var PersistentAdminNotice $persistent_admin_notice */
                // don't display notices that have already been dismissed
                if ($persistent_admin_notice->getDismissed()) {
                    continue;
                }
                try {
                    $this->capabilities_checker->processCapCheck(
                        $persistent_admin_notice->getCapCheck()
                    );
                } catch (InsufficientPermissionsException $e) {
                    // user does not have required cap, so skip to next notice
                    // and just eat the exception - nom nom nom nom
                    continue;
                }
                $this->displayPersistentAdminNotice($persistent_admin_notice);
            }
        }
    }



    /**
     * does what it's named
     *
     * @return bool
     */
    public function enqueueAssets()
    {
        static $print_scripts = true;
        if (! $print_scripts) {
            return $print_scripts;
        }
        wp_register_script(
            'espresso_core',
            EE_GLOBAL_ASSETS_URL . 'scripts/espresso_core.js',
            array('jquery'),
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_register_script(
            'ee_error_js',
            EE_GLOBAL_ASSETS_URL . 'scripts/EE_Error.js',
            array('espresso_core'),
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_enqueue_script('ee_error_js');
        $print_scripts = true;
        return $print_scripts;
    }




    /**
     * displayPersistentAdminNoticeHtml
     *
     * @param  PersistentAdminNotice $persistent_admin_notice
     */
    public function displayPersistentAdminNotice(PersistentAdminNotice $persistent_admin_notice)
    {
        // used in template for printing css
        $print_styles = $this->enqueueAssets();
        wp_localize_script(
            'espresso_core',
            'ee_dismiss',
            array(
                'nag_notice'    => $persistent_admin_notice->getName(),
                'return_url'    => urlencode($this->return_url),
                'ajax_url'      => WP_AJAX_URL,
                'unknown_error' => esc_html__(
                    'An unknown error has occurred on the server while attempting to dismiss this notice.',
                    'event_espresso'
                )
            )
        );
        // used in template
        $persistent_admin_notice_name = $persistent_admin_notice->getName();
        $persistent_admin_notice_message = $persistent_admin_notice->getMessage();
        require EE_TEMPLATES . DS . 'notifications' . DS . 'persistent_admin_notice.template.php';
    }



    /**
     * dismissNotice
     *
     * @param string $pan_name the name, or key of the Persistent Admin Notice to be dismissed
     * @param bool   $purge    if true, then delete it from the db
     * @param bool   $return   forget all of this AJAX or redirect nonsense, and just return
     * @return void
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws DomainException
     */
    public function dismissNotice($pan_name = '', $purge = false, $return = false)
    {
        $pan_name = $this->request->get('ee_nag_notice', $pan_name);
        $this->notice_collection = $this->getPersistentAdminNoticeCollection();
        if ( ! empty($pan_name) && $this->notice_collection->has($pan_name)){
            /** @var PersistentAdminNotice $persistent_admin_notice */
            $persistent_admin_notice = $this->notice_collection->get($pan_name);
            $persistent_admin_notice->setDismissed(true);
            $persistent_admin_notice->setPurge($purge);
            $this->saveNotices();
        }
        if ($return) {
            return;
        }
        if ($this->request->ajax) {
            // grab any notices and concatenate into string
            echo wp_json_encode(
                array(
                    'errors' => implode('<br />', EE_Error::get_notices(false))
                )
            );
            exit();
        }
        // save errors to a transient to be displayed on next request (after redirect)
        EE_Error::get_notices(false, true);
        wp_safe_redirect(
            urldecode(
                $this->request->get('return_url', '')
            )
        );
    }



    /**
     * saveNotices
     *
     * @throws DomainException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function saveNotices()
    {
        $this->notice_collection = $this->getPersistentAdminNoticeCollection();
        if ($this->notice_collection->hasObjects()) {
            $persistent_admin_notices = get_option(PersistentAdminNoticeManager::WP_OPTION_KEY, array());
            //maybe initialize persistent_admin_notices
            if (empty($persistent_admin_notices)) {
                add_option(PersistentAdminNoticeManager::WP_OPTION_KEY, array(), '', 'no');
            }
            foreach ($this->notice_collection as $persistent_admin_notice) {
                // are we deleting this notice ?
                if ($persistent_admin_notice->getPurge()) {
                    unset($persistent_admin_notices[$persistent_admin_notice->getName()]);
                } else {
                    /** @var PersistentAdminNotice $persistent_admin_notice */
                    $persistent_admin_notices[$persistent_admin_notice->getName()] = array(
                        'message'     => $persistent_admin_notice->getMessage(),
                        'capability'  => $persistent_admin_notice->getCapability(),
                        'cap_context' => $persistent_admin_notice->getCapContext(),
                        'dismissed'   => $persistent_admin_notice->getDismissed(),
                    );
                }
            }
            update_option(PersistentAdminNoticeManager::WP_OPTION_KEY, $persistent_admin_notices);
        }
    }



}
// End of file PersistentAdminNoticeManager.php
// Location: EventEspresso\core\services\notifications/PersistentAdminNoticeManager.php
