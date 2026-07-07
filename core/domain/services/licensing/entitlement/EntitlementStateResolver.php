<?php

namespace EventEspresso\core\domain\services\licensing\entitlement;

use EventEspresso\core\domain\services\licensing\LicenseStatus;
use EventEspresso\core\services\licensing\LicenseKeyData;
use stdClass;

/**
 * EntitlementStateResolver
 *
 * Resolves a licensed add-on's cached license data into an execution-oriented entitlement
 * state (see {@see EntitlementState}). The state machine is add-on agnostic: concrete
 * subclasses supply the license slug, the two grace-window option names, the default grace
 * period length, and a human readable product label used in blocked-state explanations.
 *
 * Two independent grace windows are tracked:
 *  - the initial window, for sites that have never been licensed for the add-on, and
 *  - the post-entitlement-loss window, for sites whose license has expired.
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\domain\services\licensing\entitlement
 * @since       5.0.57
 */
abstract class EntitlementStateResolver
{
    private LicenseKeyData $license_key_data;

    private ?string $memoized_state = null;

    private ?stdClass $memoized_license = null;


    public function __construct(LicenseKeyData $license_key_data)
    {
        $this->license_key_data = $license_key_data;
    }


    /**
     * The LicenseKeyData option key this add-on's license is stored under.
     */
    abstract protected function licenseSlug(): string;


    /**
     * Option name persisting the start of the initial (never-licensed) grace window.
     */
    abstract protected function initialGraceOption(): string;


    /**
     * Option name persisting the start of the post-entitlement-loss grace window.
     */
    abstract protected function postLossGraceOption(): string;


    /**
     * Default grace period length, in days, before a filter is applied.
     */
    abstract protected function defaultGraceDays(): int;


    /**
     * Human readable add-on name used in blocked-state explanations, e.g. "Automation / Webhooks".
     */
    abstract protected function productLabel(): string;


    public function currentState(): string
    {
        if ($this->memoized_state === null) {
            $this->memoized_state = $this->resolveState();
        }
        return $this->memoized_state;
    }


    /**
     * Short, human readable label for the current entitlement state. Add-on agnostic by
     * default; subclasses may override to provide product-specific wording.
     */
    public function currentStateLabel(): string
    {
        switch ($this->currentState()) {
            case EntitlementState::ACTIVE:
                return esc_html__('Active', 'event_espresso');
            case EntitlementState::INITIAL_GRACE:
                return esc_html__('Initial Grace', 'event_espresso');
            case EntitlementState::EXPIRED_GRACE:
                return esc_html__('Post-Entitlement Grace', 'event_espresso');
            case EntitlementState::BLOCKED:
                return esc_html__('Blocked', 'event_espresso');
            default:
                return esc_html__('Verification Unavailable', 'event_espresso');
        }
    }


    /**
     * Full explanation of the current entitlement state for admin display. Uses the product
     * label so the generic copy reads sensibly; subclasses may override to describe the
     * specific gated features (e.g. feed management, test sends).
     */
    public function currentStateDescription(): string
    {
        switch ($this->currentState()) {
            case EntitlementState::ACTIVE:
                return esc_html__('This add-on is fully licensed and available.', 'event_espresso');
            case EntitlementState::INITIAL_GRACE:
                return esc_html__(
                    'The add-on is running within its initial grace period and remains available.',
                    'event_espresso'
                );
            case EntitlementState::EXPIRED_GRACE:
                return esc_html__(
                    'The last known entitlement expired, but the add-on remains available during the post-entitlement grace period.',
                    'event_espresso'
                );
            case EntitlementState::BLOCKED:
                return sprintf(
                    /* translators: 1: add-on product name, 2: specific reason the license check failed */
                    esc_html__(
                        'Access is blocked by the %1$s license check. %2$s Review Event Espresso > License Keys for this add-on.',
                        'event_espresso'
                    ),
                    $this->productLabel(),
                    $this->blockedDescription()
                );
            default:
                return esc_html__(
                    'Cached license verification is unavailable. Existing setup remains visible while access stays provisionally allowed.',
                    'event_espresso'
                );
        }
    }


    /**
     * Returns the most specific explanation available for a blocked entitlement state.
     */
    public function blockedDescription(): string
    {
        if ($this->currentState() !== EntitlementState::BLOCKED) {
            return '';
        }

        $license = $this->cachedLicenseData();
        $status  = strtolower((string) ($license->license ?? ''));

        switch ($status) {
            case LicenseStatus::INVALID:
                return sprintf(
                    /* translators: %s: add-on product name */
                    esc_html__('The stored %1$s license key is invalid.', 'event_espresso'),
                    $this->productLabel()
                );
            case LicenseStatus::DISABLED:
                return sprintf(
                    /* translators: %s: add-on product name */
                    esc_html__('The stored %1$s license key is disabled.', 'event_espresso'),
                    $this->productLabel()
                );
            case LicenseStatus::REVOKED:
                return sprintf(
                    /* translators: %s: add-on product name */
                    esc_html__('The stored %1$s license key has been revoked.', 'event_espresso'),
                    $this->productLabel()
                );
            case LicenseStatus::SITE_INACTIVE:
                return sprintf(
                    /* translators: %s: add-on product name */
                    esc_html__('The stored %1$s license key is not activated for this site.', 'event_espresso'),
                    $this->productLabel()
                );
            case LicenseStatus::EXPIRED:
                return sprintf(
                    /* translators: 1: add-on product name, 2: grace period length in days */
                    esc_html__(
                        'The stored %1$s license expired and the post-entitlement %2$d-day grace period has ended.',
                        'event_espresso'
                    ),
                    $this->productLabel(),
                    $this->graceDays()
                );
            case LicenseStatus::NONE:
                return $this->missingLicenseDescription();
            case '':
                if (! $this->hasCachedLicenseSignal($license)) {
                    return $this->missingLicenseDescription();
                }
                // VERIFICATION_UNAVAILABLE, not BLOCKED — unreachable per state machine
                return '';
        }

        return sprintf(
            /* translators: 1: add-on product name, 2: raw license status string returned by the check */
            esc_html__('The stored %1$s license check returned the status "%2$s".', 'event_espresso'),
            $this->productLabel(),
            $status
        );
    }


    protected function missingLicenseDescription(): string
    {
        return sprintf(
            /* translators: 1: add-on product name, 2: grace period length in days */
            esc_html__(
                'No stored %1$s license key was found for this site, and the initial %2$d-day grace period has ended.',
                'event_espresso'
            ),
            $this->productLabel(),
            $this->graceDays()
        );
    }


    protected function cachedLicenseData(): stdClass
    {
        if ($this->memoized_license === null) {
            $this->memoized_license = $this->licenseData()->getLicenseDataForPlugin($this->licenseSlug());
        }
        return $this->memoized_license;
    }


    protected function resolveState(): string
    {
        $license = $this->cachedLicenseData();
        $status  = strtolower((string) ($license->license ?? ''));

        if (in_array($status, [LicenseStatus::VALID, LicenseStatus::ACTIVE], true)) {
            $this->resetGraceWindows();
            return EntitlementState::ACTIVE;
        }

        if (in_array(
            $status,
            [LicenseStatus::DISABLED, LicenseStatus::INVALID, LicenseStatus::REVOKED, LicenseStatus::SITE_INACTIVE],
            true
        )) {
            return EntitlementState::BLOCKED;
        }

        if ($status === LicenseStatus::EXPIRED) {
            delete_option($this->initialGraceOption());
            return $this->postEntitlementLossGraceState();
        }

        if ($status === LicenseStatus::NONE || ($status === '' && ! $this->hasCachedLicenseSignal($license))) {
            delete_option($this->postLossGraceOption());
            return $this->initialGraceState();
        }

        // a license key is cached but verification produced no verdict (e.g. licensing API unreachable)
        if ($status === '') {
            return EntitlementState::VERIFICATION_UNAVAILABLE;
        }

        // any other non-empty status is an unrecognized but definitive negative verdict,
        // whether or not any license signal is cached alongside it
        return EntitlementState::BLOCKED;
    }


    protected function hasCachedLicenseSignal(stdClass $license): bool
    {
        return ! empty($license->item_id)
               || ! empty($license->item_name)
               || ! empty($license->license_key);
    }


    protected function initialGraceState(): string
    {
        $started = (int) get_option($this->initialGraceOption(), 0);
        if (! $started) {
            $started = time();
            update_option($this->initialGraceOption(), $started, false);
        }

        return time() - $started <= $this->gracePeriodSeconds()
            ? EntitlementState::INITIAL_GRACE
            : EntitlementState::BLOCKED;
    }


    protected function postEntitlementLossGraceState(): string
    {
        $started = (int) get_option($this->postLossGraceOption(), 0);
        if (! $started) {
            $started = time();
            update_option($this->postLossGraceOption(), $started, false);
        }

        return time() - $started <= $this->gracePeriodSeconds()
            ? EntitlementState::EXPIRED_GRACE
            : EntitlementState::BLOCKED;
    }


    /**
     * The effective grace period length, in days, after the grace-days filter is applied
     * and clamped to a sane minimum. Both enforcement and the blocked-state messaging
     * use this so the quoted day count always matches the window actually enforced.
     */
    protected function graceDays(): int
    {
        $days = (int) apply_filters(
            'FHEE__' . str_replace('\\', '_', static::class) . '__grace_days',
            $this->defaultGraceDays()
        );
        return max(1, $days);
    }


    protected function gracePeriodSeconds(): int
    {
        return DAY_IN_SECONDS * $this->graceDays();
    }


    protected function licenseData(): LicenseKeyData
    {
        return $this->license_key_data;
    }


    protected function resetGraceWindows(): void
    {
        delete_option($this->initialGraceOption());
        delete_option($this->postLossGraceOption());
    }
}
