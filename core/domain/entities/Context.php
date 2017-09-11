<?php

namespace EventEspresso\core\domain\entities;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class Context
 * Simple DTO for conveying the background details about why some other logic is being performed,
 * that can assist with the decision making process or simply enhance logging.
 *
 * @package EventEspresso\core\domain\entities
 * @author  Brent Christensen
 * @since   4.9.46.rc.076
 */
class Context
{

    /**
     * @var string $slug
     */
    private $slug;

    /**
     * @var string $description
     */
    private $description;


    /**
     * Context constructor.
     *
     * @param string $slug
     * @param string $description
     */
    public function __construct($slug, $description)
    {
        $this->setSlug($slug);
        $this->setDescription($description);
    }


    /**
     * @return string
     */
    public function slug()
    {
        return $this->slug;
    }


    /**
     * @param string $slug
     */
    private function setSlug($slug)
    {
        $this->slug = sanitize_key($slug);
    }


    /**
     * @return string
     */
    public function description()
    {
        return $this->description;
    }


    /**
     * @param string $description
     */
    private function setDescription($description)
    {
        $this->description = sanitize_text_field($description);
    }

}
// Location: Context.php
