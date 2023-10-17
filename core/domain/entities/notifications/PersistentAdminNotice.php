<?php

namespace EventEspresso\core\domain\entities\notifications;

use DomainException;
use EventEspresso\core\domain\services\capabilities\CapCheck;
use EventEspresso\core\domain\services\capabilities\CapCheckInterface;
use EventEspresso\core\domain\services\capabilities\RequiresCapCheckInterface;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\collections\Collection;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;
use EventEspresso\core\services\notifications\PersistentAdminNoticeManager;
use EventEspresso\core\services\request\sanitizers\AllowedTags;
use Exception;

/**
 * Class PersistentAdminNotice
 * A DTO for recording details about a type of admin notice
 * that needs to be displayed repeatedly to an admin until dismissed
 *
 * @package Event Espresso
 * @author  Brent Christensen
 * @since   4.9.27
 */
class PersistentAdminNotice implements RequiresCapCheckInterface
{
    protected string $name = '';

    protected string $message = '';

    protected bool $force_update = false;

    protected string $capability = 'manage_options';

    protected string $cap_context = 'view persistent admin notice';

    protected bool $dismissed = false;

    protected ?CapCheckInterface $cap_check = null;

    /**
     * if true, then this notice will be deleted from the database
     *
     * @var boolean $purge
     */
    protected bool $purge = false;

    /**
     * gets set to true if notice is successfully registered with the PersistentAdminNoticeManager
     * if false, and WP_DEBUG is on, then an exception will be thrown in the admin footer
     *
     * @var boolean $registered
     */
    private bool $registered = false;


    /**
     * PersistentAdminNotice constructor
     *
     * @param string $name         [required] the name, or key of the Persistent Admin Notice to be stored
     * @param string $message      [required] the message to be stored persistently until dismissed
     * @param bool   $force_update enforce the reappearance of a persistent message
     * @param string $capability   user capability required to view this notice
     * @param string $cap_context  description for why the cap check is being performed
     * @param bool   $dismissed    whether the user has already dismissed/viewed this notice
     */
    public function __construct(
        string $name,
        string $message,
        bool $force_update = false,
        string $capability = 'manage_options',
        string $cap_context = 'view persistent admin notice',
        bool $dismissed = false
    ) {
        $this->setName($name);
        $this->setMessage($message);
        $this->setForceUpdate($force_update);
        $this->setCapability($capability);
        $this->setCapContext($cap_context);
        $this->setDismissed($dismissed);
        add_action(
            'AHEE__EventEspresso_core_services_notifications_PersistentAdminNoticeManager__registerNotices',
            [$this, 'registerPersistentAdminNotice']
        );
        add_action('shutdown', [$this, 'confirmRegistered'], 999);
    }


    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }


    /**
     * @param string $name
     */
    private function setName(string $name)
    {
        $this->name = sanitize_key($name);
    }


    /**
     * @return string
     */
    public function getMessage(): string
    {
        return $this->message;
    }


    /**
     * @param string $message
     */
    private function setMessage(string $message)
    {
        $allowedtags   = AllowedTags::getAllowedTags();
        $this->message = wp_kses($message, $allowedtags);
    }


    /**
     * @return bool
     */
    public function getForceUpdate(): bool
    {
        return $this->force_update;
    }


    /**
     * @param bool|int|string $force_update
     */
    private function setForceUpdate($force_update)
    {
        $this->force_update = filter_var($force_update, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @return string
     */
    public function getCapability(): string
    {
        return $this->capability;
    }


    /**
     * @param string $capability
     */
    private function setCapability(string $capability)
    {
        $this->capability = ! empty($capability) ? $capability : 'manage_options';
    }


    /**
     * @return string
     */
    public function getCapContext(): string
    {
        return $this->cap_context;
    }


    /**
     * @param string $cap_context
     */
    private function setCapContext(string $cap_context)
    {
        $this->cap_context = ! empty($cap_context) ? $cap_context : 'view persistent admin notice';
    }


    /**
     * @return bool
     */
    public function getDismissed(): bool
    {
        return $this->dismissed;
    }


    /**
     * @param bool|int|string $dismissed
     */
    public function setDismissed($dismissed)
    {
        $this->dismissed = filter_var($dismissed, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @return CapCheckInterface
     */
    public function getCapCheck(): ?CapCheckInterface
    {
        if (! $this->cap_check instanceof CapCheckInterface) {
            $this->setCapCheck(new CapCheck($this->capability, $this->cap_context));
        }
        return $this->cap_check;
    }


    /**
     * @param CapCheckInterface $cap_check
     */
    private function setCapCheck(CapCheckInterface $cap_check)
    {
        $this->cap_check = $cap_check;
    }


    /**
     * @return bool
     */
    public function getPurge(): bool
    {
        return $this->purge;
    }


    /**
     * @param bool|int|string $purge
     */
    public function setPurge($purge)
    {
        $this->purge = filter_var($purge, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * given a valid PersistentAdminNotice Collection,
     * this notice will be added if it is not already found in the collection (using its name as the identifier)
     * if an existing notice is found that has already been dismissed,
     * but we are overriding with a forced update, then we will toggle its dismissed state,
     * so that the notice is displayed again
     *
     * @param Collection $persistent_admin_notice_collection
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     */
    public function registerPersistentAdminNotice(Collection $persistent_admin_notice_collection)
    {
        if ($this->registered) {
            return;
        }
        // first check if this notice has already been added to the collection
        if ($persistent_admin_notice_collection->has($this->name)) {
            /** @var PersistentAdminNotice $existing */
            $existing = $persistent_admin_notice_collection->get($this->name);
            // we don't need to add it again (we can't actually)
            // but if it has already been dismissed, and we are overriding with a forced update
            if ($existing->getDismissed() && $this->getForceUpdate()) {
                // then toggle the notice's dismissed state to true
                // so that it gets displayed again
                $existing->setDismissed(false);
                // and make sure the message is set
                $existing->setMessage($this->message);
            }
        } else {
            $persistent_admin_notice_collection->add($this, $this->name);
        }
        $this->registered = true;
    }


    /**
     * @throws Exception
     */
    public function confirmRegistered()
    {
        if (! apply_filters('PersistentAdminNoticeManager__registerAndSaveNotices__complete', false)) {
            PersistentAdminNoticeManager::loadRegisterAndSaveNotices();
        }
        if (! $this->registered && WP_DEBUG) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'The "%1$s" PersistentAdminNotice was not successfully registered. Please ensure that it is being created prior to either the "admin_notices" or "network_admin_notices" hooks being triggered.',
                        'event_espresso'
                    ),
                    $this->name
                )
            );
        }
    }
}
