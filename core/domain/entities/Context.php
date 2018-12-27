<?php

namespace EventEspresso\core\domain\entities;

use EventEspresso\core\domain\entities\contexts\ContextInterface;

/**
 * Class Context
 * NAMESPACE MOVED : PLZ USE : \EventEspresso\core\domain\entities\contexts\Context
 *
 * @deprecated 4.9.54
 */
class Context implements ContextInterface
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
