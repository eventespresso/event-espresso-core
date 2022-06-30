<?php

namespace EventEspresso\core\domain\values\session;

use EventEspresso\core\services\database\WordPressOption;

/**
 * Class SessionLifespanOption
 * @todo description
 *
 * @package EventEspresso\core\services\session
 * @author  Hossein Rafiei
 * @since   $VID:$
 */
class SessionLifespanOption extends WordPressOption
{
    const DEFAULT_LIFE_SPAN = (int) HOUR_IN_SECONDS;

    const OPTION_NAME       = 'ee-session-life-span';


    /**
     * SessionLifespanOption constructor.
     */
    public function __construct()
    {
        parent::__construct(
            SessionLifespanOption::OPTION_NAME,
            SessionLifespanOption::DEFAULT_LIFE_SPAN,
            false
        );
    }


    /**
     * @return false|mixed|void
     */
    public function getSessionLifeSpan()
    {
        return $this->loadOption();
    }

    /**
     * @param int $value
     * @return false|mixed|void
     */
    public function setSessionLifeSpan(int $value)
    {
        if ($value <= 0) $value = SessionLifespanOption::DEFAULT_LIFE_SPAN;
        return $this->updateOption($value);
    }
}
