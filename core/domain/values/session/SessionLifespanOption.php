<?php

namespace EventEspresso\core\domain\values\session;

use EventEspresso\core\services\database\WordPressOption;

/**
 * Class SessionLifespanOption
 * Use this class to access and update session life span
 *
 * @package EventEspresso\core\services\session
 * @author  Hossein Rafiei
 * @since   5.0.0.p
 */
class SessionLifespanOption extends WordPressOption
{
    const DEFAULT_LIFESPAN  = HOUR_IN_SECONDS;

    const OPTION_NAME       = 'ee-session-lifespan';


    /**
     * SessionLifespanOption constructor.
     */
    public function __construct()
    {
        parent::__construct(
            SessionLifespanOption::OPTION_NAME,
            SessionLifespanOption::DEFAULT_LIFESPAN,
            false
        );
    }


    /**
     * @return false|mixed|void
     */
    public function getSessionLifespan()
    {
        return $this->loadOption();
    }

    /**
     * @param int $value
     * @return int
     */
    public function setSessionLifespan(int $value): int
    {
        if ($value <= 0) {
            $value = SessionLifespanOption::DEFAULT_LIFESPAN;
        }
        return $this->updateOption($value);
    }
}
