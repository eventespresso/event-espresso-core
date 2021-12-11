<?php

namespace EventEspresso\core\domain\values\session;

use DomainException;

/**
 * Class SessionLifespan
 * Value Object for storing and sharing session lifespan information.
 * This value is filterable by doing something like the following:
 *      add_filter(
 *          'FHEE__EventEspresso_core_domain_values_session_SessionLifespan__setLifespan___lifespan',
 *          function() { return 15 * MINUTE_IN_SECONDS; }
 *      );
 *
 * @package EventEspresso\core\services\session
 * @author  Brent Christensen
 * @since   4.9.59.p
 */
class SessionLifespan
{
    /**
     * how long an EE session lasts in seconds
     * default session lifespan of 1 hour (for not so instant IPNs)
     *
     * @var int $lifespan
     */
    private $lifespan;


    /**
     * SessionLifespan constructor.
     *
     * @param int $lifespan
     * @throws DomainException
     */
    public function __construct(int $lifespan = DAY_IN_SECONDS)
    {
        $lifespan = absint($lifespan);
        $lifespan = $lifespan > 0 ? $lifespan : (int) HOUR_IN_SECONDS;
        $this->setLifespan($lifespan);
    }


    /**
     * @param int $lifespan
     * @throws DomainException
     */
    protected function setLifespan(int $lifespan)
    {
        if ($lifespan < MINUTE_IN_SECONDS) {
            throw new DomainException(
                esc_html__(
                    'The session lifespan needs to be at least 60 seconds, and even that is extremely short',
                    'event_espresso'
                )
            );
        }
        $this->lifespan = apply_filters(
            'FHEE__EventEspresso_core_domain_values_session_SessionLifespan__setLifespan___lifespan',
            // apply legacy filter for now but add doing it wrong notice in future
            apply_filters(
                'FHEE__EE_Session__construct___lifespan',
                $lifespan
            )
        ) + 1;
    }


    /**
     * @return int
     */
    public function inSeconds(): int
    {
        return $this->lifespan;
    }


    /**
     * @param string $separator
     * @return string
     */
    public function inHoursMinutesSeconds(string $separator = ':'): string
    {
        return sprintf(
            '%02d%s%02d%s%02d',
            floor($this->lifespan / HOUR_IN_SECONDS),
            $separator,
            ($this->lifespan / MINUTE_IN_SECONDS) % MINUTE_IN_SECONDS,
            $separator,
            $this->lifespan % MINUTE_IN_SECONDS
        );
    }


    /**
     * Returns a timestamp for when the session would expire based on this lifespan
     *
     * @param bool $utc If true, displays expiration in UTC
     *                  If false, displays expiration in local time
     * @return int
     */
    public function expiration(bool $utc = true): int
    {
        return (int) current_time('timestamp', $utc) - $this->lifespan;
    }


    /**
     * @return string
     */
    public function __toString(): string
    {
        return (string) $this->inSeconds();
    }
}
