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
    public function __construct($lifespan = 0)
    {
        $lifespan = absint($lifespan);
        $lifespan = $lifespan > 0 ? $lifespan : (int) HOUR_IN_SECONDS;
        $this->setLifespan($lifespan);
    }


    /**
     * @param int $lifespan
     * @throws DomainException
     */
    protected function setLifespan($lifespan)
    {
        if ($lifespan < 60) {
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
    public function inSeconds()
    {
        return $this->lifespan;
    }


    /**
     * @param string $separator
     * @return string
     */
    public function inHoursMinutesSeconds($separator = ':')
    {
        return sprintf(
            '%02d%s%02d%s%02d',
            floor($this->lifespan / 3600),
            $separator,
            ($this->lifespan / 60) % 60,
            $separator,
            $this->lifespan % 60
        );
    }


    /**
     * Returns a timestamp for when the session would expire based on this lifespan
     *
     * @param bool $utc If true, displays expiration in UTC
     *                  If false, displays expiration in local time
     * @return int
     */
    public function expiration($utc = true)
    {
        return (int) current_time('timestamp', $utc) - $this->lifespan;
    }


    /**
     * @return string
     */
    public function __toString()
    {
        return (string) $this->inSeconds();
    }
}
