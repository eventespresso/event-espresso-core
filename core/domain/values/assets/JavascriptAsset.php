<?php

namespace EventEspresso\core\domain\values\assets;

use Closure;
use DomainException;
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
    private bool $load_in_footer = false;

    private bool $requires_translation = false;

    private bool $has_inline_data = false;

    private ?Closure $inline_data_callback = null;


    /**
     * Asset constructor.
     *
     * @param string          $handle
     * @param string          $source
     * @param array           $dependencies
     * @param bool            $load_in_footer
     * @param DomainInterface $domain
     * @param string          $version
     * @throws InvalidDataTypeException
     * @throws DomainException
     */
    public function __construct(
        string $handle,
        string $source,
        array $dependencies,
        bool $load_in_footer,
        DomainInterface $domain,
        string $version = ''
    ) {
        parent::__construct(Asset::TYPE_JS, $handle, $source, $dependencies, $domain, $version);
        $this->setLoadInFooter($load_in_footer);
    }


    /**
     * @return bool
     */
    public function loadInFooter(): bool
    {
        return $this->load_in_footer;
    }


    /**
     * @param bool|int|string $load_in_footer
     */
    private function setLoadInFooter($load_in_footer = true)
    {
        $this->load_in_footer = filter_var($load_in_footer, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @return bool
     */
    public function requiresTranslation(): bool
    {
        return $this->requires_translation;
    }


    /**
     * @return bool
     */
    public function hasInlineData(): bool
    {
        return $this->has_inline_data;
    }


    /**
     * @param bool|int|string $has_inline_data
     * @return JavascriptAsset
     */
    public function setHasInlineData($has_inline_data = true): JavascriptAsset
    {
        $this->has_inline_data = filter_var($has_inline_data, FILTER_VALIDATE_BOOLEAN);
        return $this;
    }


    /**
     * @return Closure
     */
    public function inlineDataCallback(): ?Closure
    {
        return $this->inline_data_callback;
    }


    /**
     * @return bool
     */
    public function hasInlineDataCallback(): bool
    {
        return $this->inline_data_callback instanceof Closure;
    }


    /**
     * @param Closure $inline_data_callback
     * @return JavascriptAsset
     */
    public function setInlineDataCallback(Closure $inline_data_callback): JavascriptAsset
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
        if ($this->source() === '') {
            return;
        }
        $attributes = $this->getAttributes();
        if (! empty($attributes)) {
            add_filter('script_loader_tag', [$this, 'addAttributeTagsToScript'], 10, 2);
        }
        wp_enqueue_script($this->handle());
    }


    public function addAttributeTagsToScript(string $tag, string $handle): string
    {
        if ($handle === $this->handle()) {
            $attributes        = $this->getAttributes();
            $attributes_string = '';
            foreach ($attributes as $key => $value) {
                if (is_int($key)) {
                    $attributes_string .= " $value";
                } else {
                    $attributes_string .= " $key='$value'";
                }
            }
            $tag = str_replace('></script>', $attributes_string . '></script>', $tag);
        }

        return $tag;
    }


    /**
     * @param bool|int|string $requires_translation
     * @return JavascriptAsset
     * @deprecated 5.0.0.p
     */
    public function setRequiresTranslation($requires_translation = true): JavascriptAsset
    {
        $this->requires_translation = filter_var($requires_translation, FILTER_VALIDATE_BOOLEAN);
        return $this;
    }
}
