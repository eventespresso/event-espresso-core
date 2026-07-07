<?php

namespace EventEspresso\core\domain\services\licensing\entitlement;

/**
 * EntitlementChecker
 *
 * Generic, add-on agnostic facade that maps a resolved {@see EntitlementState} into the
 * execution decisions a licensed add-on needs: whether gated functionality may run, and
 * whether read-only history remains visible. It wraps any concrete
 * {@see EntitlementStateResolver} and exposes the state, label, and description for display.
 *
 * A single add-on supplies one EntitlementStateResolver subclass; this checker is reused
 * across all add-ons unchanged. Because it is a thin, stateless facade over the (shared,
 * memoizing) resolver, callers may instantiate it on demand rather than registering it as
 * a shared service.
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\domain\services\licensing\entitlement
 * @since       5.0.57
 */
class EntitlementChecker
{
    private EntitlementStateResolver $resolver;


    public function __construct(EntitlementStateResolver $resolver)
    {
        $this->resolver = $resolver;
    }


    public function currentState(): string
    {
        return $this->resolver->currentState();
    }


    public function isBlocked(): bool
    {
        return $this->currentState() === EntitlementState::BLOCKED;
    }


    /**
     * Whether gated functionality (delivery, management, test sends, replay) may run.
     * Everything except the BLOCKED state is permitted, including the provisional
     * VERIFICATION_UNAVAILABLE state.
     */
    public function canExecute(): bool
    {
        return ! $this->isBlocked();
    }


    /**
     * Historical/read-only data remains visible in every state, even when execution is blocked.
     */
    public function canViewHistory(): bool
    {
        return true;
    }


    public function currentStateLabel(): string
    {
        return $this->resolver->currentStateLabel();
    }


    public function currentStateDescription(): string
    {
        return $this->resolver->currentStateDescription();
    }
}
