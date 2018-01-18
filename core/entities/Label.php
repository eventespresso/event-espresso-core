<?php

namespace EventEspresso\core\entities;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class Label
 * super simple DTO for standardizing naming of things
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class Label
{

    /**
     * @var string $singular
     */
    public $singular;

    /**
     * @var string $plural
     */
    public $plural;



    /**
     * Label constructor.
     *
     * @param string $singular
     * @param string $plural
     */
    public function __construct($singular, $plural)
    {
        $this->singular = $singular;
        $this->plural = $plural;
    }



    /**
     * @return string
     */
    public function singular()
    {
        return $this->singular;
    }



    /**
     * @return string
     */
    public function plural()
    {
        return $this->plural;
    }



}
// End of file Label.php
// Location: core/entities/Label.php