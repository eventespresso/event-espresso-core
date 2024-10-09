<?php

namespace EventEspresso\core\services\notifications;

use DomainException;
use EE_Error;
use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\domain\services\capabilities\CapabilitiesChecker;
use EventEspresso\core\exceptions\InsufficientPermissionsException;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;
use Exception;
use InvalidArgumentException;

// phpcs:disable PEAR.Functions.ValidDefaultValue.NotAtEnd

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

    private CapabilitiesChecker $capabilities_checker;

    private RequestInterface $request;

    /**
     * @var Collection|PersistentAdminNotice[]|null $notice_collection
     */
    private ?Collection $notice_collection = null;

    /**
     * if AJAX is not enabled, then the return URL will be used for redirecting back to the admin page where the
     * persistent admin notice was displayed, and ultimately dismissed from.
     *
     * @var string $return_url
     */
    private string $return_url;


    /**
     * PersistentAdminNoticeManager constructor
     *
     * @param CapabilitiesChecker $capabilities_checker
     * @param RequestInterface    $request
     * @param string              $return_url where to  redirect to after dismissing notices
     */
    public function __construct(
        CapabilitiesChecker $capabilities_checker,
        RequestInterface $request,
        string $return_url = ''
    ) {
        $this->capabilities_checker = $capabilities_checker;
        $this->request              = $request;
        $this->setReturnUrl($return_url);
        add_action('wp_ajax_dismiss_ee_nag_notice', [$this, 'dismissNotice']);
        add_action('shutdown', [$this, 'registerAndSaveNotices'], 998);
    }


    public function loadAdminNotices()
    {
        // setup up notices at priority 9 because `EE_Admin::display_admin_notices()` runs at priority 10,
        // and we want to retrieve and generate any nag notices at the last possible moment
        add_action('admin_notices', [$this, 'displayNotices'], 9);
        add_action('network_admin_notices', [$this, 'displayNotices'], 9);
    }


    /**
     * @param string $return_url
     */
    public function setReturnUrl(string $return_url)
    {
        $this->return_url = $return_url;
    }


    /**
     * @return Collection
     * @throws InvalidEntityException
     * @throws InvalidInterfaceException
     * @throws DomainException
     * @throws DuplicateCollectionIdentifierException
     */
    protected function getPersistentAdminNoticeCollection(): Collection
    {
        if (! $this->notice_collection instanceof Collection) {
            $this->notice_collection = new Collection(
                'EventEspresso\core\domain\entities\notifications\PersistentAdminNotice'
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
     * @throws InvalidEntityException
     * @throws DomainException
     * @throws DuplicateCollectionIdentifierException
     */
    protected function retrieveStoredNotices()
    {
        $persistent_admin_notices = get_option(PersistentAdminNoticeManager::WP_OPTION_KEY, []);
        if (! empty($persistent_admin_notices)) {
            foreach ($persistent_admin_notices as $name => $details) {
                if (is_array($details)) {
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
                    $notice = new PersistentAdminNotice(
                        (string) $name,
                        (string) $details['message'],
                        (bool) ($details['force_update'] ?? false),
                        (string) $details['capability'],
                        (string) $details['cap_context'],
                        (bool) $details['dismissed'],
                        (string) ($details['type'] ?? 'info'),
                        (string) ($details['extra_css'] ?? '')
                    );
                    // new format for nag notices
                    $this->notice_collection->add($notice, sanitize_key($name));
                } else {
                    try {
                        // old nag notices, that we want to convert to the new format
                        $this->notice_collection->add(
                            new PersistentAdminNotice(
                                (string) $name,
                                (string) $details,
                                false,
                                '',
                                '',
                                empty($details)
                            ),
                            sanitize_key($name)
                        );
                    } catch (Exception $e) {
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
    protected function registerNotices()
    {
        do_action(
            'AHEE__EventEspresso_core_services_notifications_PersistentAdminNoticeManager__registerNotices',
            $this->notice_collection
        );
    }


    /**
     * @throws DomainException
     * @throws InvalidClassException
     * @throws InvalidInterfaceException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     */
    public function displayNotices()
    {
        $this->notice_collection = $this->getPersistentAdminNoticeCollection();
        if ($this->notice_collection->hasObjects()) {
            $enqueue_assets = false;
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
                if ($persistent_admin_notice->getMessage() === '') {
                    continue;
                }
                $this->displayPersistentAdminNotice($persistent_admin_notice);
                $enqueue_assets = true;
            }
            if ($enqueue_assets) {
                $this->enqueueAssets();
            }
        }
    }


    /**
     * does what it's named
     *
     * @return void
     */
    public function enqueueAssets()
    {
        wp_register_script(
            'espresso_core',
            EE_GLOBAL_ASSETS_URL . 'scripts/espresso_core.js',
            ['jquery'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_register_script(
            'ee_error_js',
            EE_GLOBAL_ASSETS_URL . 'scripts/EE_Error.js',
            ['espresso_core'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_localize_script(
            'ee_error_js',
            'ee_dismiss',
            [
                'return_url'    => urlencode($this->return_url),
                'ajax_url'      => WP_AJAX_URL,
                'unknown_error' => wp_strip_all_tags(
                    __(
                        'An unknown error has occurred on the server while attempting to dismiss this notice.',
                        'event_espresso'
                    )
                ),
            ]
        );
        wp_enqueue_script('ee_error_js');
    }


    /**
     * displayPersistentAdminNoticeHtml
     *
     * @param PersistentAdminNotice $persistent_admin_notice
     */
    protected function displayPersistentAdminNotice(PersistentAdminNotice $persistent_admin_notice)
    {
        // used in template
        $persistent_admin_notice_name    = $persistent_admin_notice->getName();
        $persistent_admin_notice_message = $persistent_admin_notice->getMessage();
        $persistent_admin_notice_type    = $persistent_admin_notice->getType();
        $persistent_admin_notice_css     = $persistent_admin_notice->extraCss();
        $is_dismissible                  = $persistent_admin_notice->getForceUpdate() !== true;
        require EE_TEMPLATES . '/notifications/persistent_admin_notice.template.php';
    }


    /**
     * dismissNotice
     *
     * @param string $pan_name the name, or key of the Persistent Admin Notice to be dismissed
     * @param bool   $purge    if true, then delete it from the db
     * @param bool   $return   forget all of this AJAX or redirect nonsense, and just return
     * @return void
     * @throws InvalidEntityException
     * @throws InvalidInterfaceException
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws InvalidArgumentException
     * @throws InvalidArgumentException
     * @throws InvalidArgumentException
     * @throws DuplicateCollectionIdentifierException
     */
    public function dismissNotice(string $pan_name = '', bool $purge = false, bool $return = false)
    {
        $pan_name                = $this->request->getRequestParam('ee_nag_notice', $pan_name);
        $this->notice_collection = $this->getPersistentAdminNoticeCollection();
        if (! empty($pan_name) && $this->notice_collection->has($pan_name)) {
            /** @var PersistentAdminNotice $persistent_admin_notice */
            $persistent_admin_notice = $this->notice_collection->get($pan_name);
            try {
                $this->capabilities_checker->processCapCheck(
                    $persistent_admin_notice->getCapCheck()
                );
            } catch (InsufficientPermissionsException $e) {
                // user does not have required cap, so just eat the exception - nom nom nom nom
                return;
            }
            $persistent_admin_notice->setDismissed(true);
            $persistent_admin_notice->setPurge($purge);
            $this->saveNotices();
        }
        if ($return) {
            return;
        }
        if ($this->request->isAjax()) {
            // grab any notices and concatenate into string
            echo wp_json_encode(
                [
                    'errors' => implode('<br />', EE_Error::get_notices(false)),
                ]
            );
            exit();
        }
        // save errors to a transient to be displayed on next request (after redirect)
        EE_Error::get_notices(false, true);
        wp_safe_redirect(
            urldecode(
                $this->request->getRequestParam('return_url', '')
            )
        );
    }


    /**
     * saveNotices
     *
     * @throws DomainException
     * @throws InvalidInterfaceException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     */
    public function saveNotices()
    {
        $this->notice_collection = $this->getPersistentAdminNoticeCollection();
        if ($this->notice_collection->hasObjects()) {
            $persistent_admin_notices = get_option(PersistentAdminNoticeManager::WP_OPTION_KEY, []);
            // maybe initialize persistent_admin_notices
            if (empty($persistent_admin_notices)) {
                add_option(PersistentAdminNoticeManager::WP_OPTION_KEY, [], '', 'no');
            }
            $new_notices_array = [];
            foreach ($this->notice_collection as $persistent_admin_notice) {
                // remove this notice ?
                if ($persistent_admin_notice->getPurge()) {
                    continue;
                }
                /** @var PersistentAdminNotice $persistent_admin_notice */
                $new_notices_array[ $persistent_admin_notice->getName() ] = [
                    'message'      => $persistent_admin_notice->getMessage(),
                    'capability'   => $persistent_admin_notice->getCapability(),
                    'cap_context'  => $persistent_admin_notice->getCapContext(),
                    'dismissed'    => $persistent_admin_notice->getDismissed(),
                    'force_update' => $persistent_admin_notice->getForceUpdate(),
                    'type'         => $persistent_admin_notice->getType(),
                    'extra_css'    => $persistent_admin_notice->extraCss(),
                ];
            }
            update_option(PersistentAdminNoticeManager::WP_OPTION_KEY, $new_notices_array);
        }
    }


    /**
     * @throws DomainException
     * @throws InvalidEntityException
     * @throws InvalidInterfaceException
     * @throws DuplicateCollectionIdentifierException
     */
    public function registerAndSaveNotices()
    {
        $this->getPersistentAdminNoticeCollection();
        $this->registerNotices();
        $this->saveNotices();
        add_filter(
            'PersistentAdminNoticeManager__registerAndSaveNotices__complete',
            '__return_true'
        );
    }


    /**
     * @throws DomainException
     * @throws InvalidEntityException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws DuplicateCollectionIdentifierException
     */
    public static function loadRegisterAndSaveNotices()
    {
        /** @var PersistentAdminNoticeManager $persistent_admin_notice_manager */
        $persistent_admin_notice_manager = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\notifications\PersistentAdminNoticeManager'
        );
        // if shutdown has already run, then call registerAndSaveNotices() manually
        if (did_action('shutdown')) {
            $persistent_admin_notice_manager->registerAndSaveNotices();
        }
    }


    public static function dismissPersistentAdminNotice(string $notice_name)
    {
        /** @var PersistentAdminNoticeManager $persistent_admin_notice_manager */
        $persistent_admin_notice_manager = LoaderFactory::getLoader()->getShared(PersistentAdminNoticeManager::class);
        $persistent_admin_notice_manager->dismissNotice(sanitize_key($notice_name), true, true);
    }


    public static function deletePersistentAdminNotice(string $notice_name)
    {
        /** @var PersistentAdminNoticeManager $persistent_admin_notice_manager */
        $persistent_admin_notice_manager = LoaderFactory::getLoader()->getShared(PersistentAdminNoticeManager::class);
        $persistent_admin_notice_manager->getPersistentAdminNoticeCollection();
        $notice = $persistent_admin_notice_manager->notice_collection->get(sanitize_key($notice_name));
        if ($notice) {
            $notice->setPurge(true);
            $persistent_admin_notice_manager->notice_collection->remove($notice);
            $persistent_admin_notice_manager->saveNotices();
        }
    }
}
