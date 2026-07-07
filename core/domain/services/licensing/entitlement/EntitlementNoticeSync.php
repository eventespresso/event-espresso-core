<?php

namespace EventEspresso\core\domain\services\licensing\entitlement;

use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\services\notifications\PersistentAdminNoticeManager;

/**
 * EntitlementNoticeSync
 *
 * Keeps a single persistent admin notice in sync with an add-on's entitlement state: it
 * shows a warning while the add-on is BLOCKED and removes it otherwise. The notice id and
 * required capability are supplied by the add-on so the same generic service serves any
 * licensed add-on.
 *
 * This class registers no hooks of its own; the owning add-on decides when to call
 * {@see EntitlementNoticeSync::syncBlockedNotice()} (typically on `admin_init`).
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\domain\services\licensing\entitlement
 * @since       5.0.57
 */
class EntitlementNoticeSync
{
    private EntitlementChecker $checker;

    private string $notice_id;

    private string $capability;

    private string $context;


    public function __construct(
        EntitlementChecker $checker,
        string $notice_id,
        string $capability,
        string $context = 'view entitlement notice'
    ) {
        $this->checker    = $checker;
        $this->notice_id  = $notice_id;
        $this->capability = $capability;
        $this->context    = $context;
    }


    public function syncBlockedNotice(): void
    {
        if ($this->checker->isBlocked()) {
            new PersistentAdminNotice(
                $this->notice_id,
                $this->checker->currentStateDescription(),
                true,
                $this->capability,
                $this->context,
                false,
                PersistentAdminNotice::TYPE_WARNING
            );
            return;
        }

        PersistentAdminNoticeManager::deletePersistentAdminNotice($this->notice_id);
    }
}
