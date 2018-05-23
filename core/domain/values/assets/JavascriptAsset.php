<?php

namespace EventEspresso\core\domain\values\assets;

use Closure;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\exceptions\InvalidDataTypeException;

/**
 * Class JavascriptAsset
 * Details for a Javascript asset
 *
 * @package EventEspresso\core\domain\values\assets
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class JavascriptAsset extends BrowserAsset
{

    /**
     * @var boolean $load_in_footer
     */
    private $load_in_footer = false;

    /**
     * @var boolean $requires_translation
     */
    private $requires_translation = false;

    /**
     * @var boolean $has_inline_data
     */
    private $has_inline_data = false;

    /**
     * @var Closure $inline_data_callback
     */
    private $inline_data_callback;


    /**
     * Asset constructor.
     *
     * @param string          $handle
     * @param string          $source
     * @param array           $dependencies
     * @param bool            $load_in_footer
     * @param DomainInterface $domain
     * @throws InvalidDataTypeException
     */
    public function __construct(
        $handle,
        $source,
        array $dependencies,
        $load_in_footer,
        DomainInterface $domain
    ) {
        parent::__construct(Asset::TYPE_JS, $handle, $source, $dependencies, $domain);
        $this->setLoadInFooter($load_in_footer);
    }


    /**
     * @return bool
     */
    public function loadInFooter()
    {
        return $this->load_in_footer;
    }


    /**
     * @param bool $load_in_footer
     */
    private function setLoadInFooter($load_in_footer = true)
    {
        $this->load_in_footer = filter_var($load_in_footer, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @return bool
     */
    public function requiresTranslation()
    {
        return $this->requires_translation;
    }


    /**
     * @param bool $requires_translation
     * @return JavascriptAsset
     */
    public function setRequiresTranslation($requires_translation = true)
    {
        $this->requires_translation = filter_var($requires_translation, FILTER_VALIDATE_BOOLEAN);
        return $this;
    }


    /**
     * @return bool
     */
    public function hasInlineData()
    {
        return $this->has_inline_data;
    }


    /**
     * @param bool $has_inline_data
     * @return JavascriptAsset
     */
    public function setHasInlineData($has_inline_data = true)
    {
        $this->has_inline_data = filter_var($has_inline_data, FILTER_VALIDATE_BOOLEAN);
        return $this;
    }


    /**
     * @return Closure
     */
    public function inlineDataCallback()
    {
        return $this->inline_data_callback;
    }


    /**
     * @return bool
     */
    public function hasInlineDataCallback()
    {
        return $this->inline_data_callback instanceof Closure;
    }


    /**
     * @param Closure $inline_data_callback
     * @return JavascriptAsset
     */
    public function setInlineDataCallback(Closure $inline_data_callback)
    {
        $this->inline_data_callback = $inline_data_callback;
        $this->setHasInlineData();
        return $this;
    }


    /**
     * @since 4.9.62.p
     */
    public function enqueueAsset()
    {
        wp_enqueue_script($this->handle());
    }
}
