<?php

namespace EventEspresso\core\domain\values\assets;

use DomainException;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\exceptions\InvalidDataTypeException;

/**
 * Class StylesheetAsset
 * Details for a Cascading Stylesheet asset
 *
 * @package EventEspresso\core\domain\values\assets
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class StylesheetAsset extends BrowserAsset
{
    private string $media;


    /**
     * CssFile constructor.
     *
     * @param string          $handle
     * @param string          $source
     * @param array           $dependencies
     * @param DomainInterface $domain
     * @param string          $media
     * @param string          $version
     * @throws InvalidDataTypeException
     * @throws DomainException
     */
    public function __construct(
        string $handle,
        string $source,
        array $dependencies,
        DomainInterface $domain,
        string $media = 'all',
        string $version = ''
    ) {
        parent::__construct(Asset::TYPE_CSS, $handle, $source, $dependencies, $domain, $version);
        $this->setMedia($media);
    }


    /**
     * @return string
     */
    public function media(): string
    {
        return $this->media;
    }


    /**
     * @param string $media
     * @throws InvalidDataTypeException
     */
    private function setMedia(string $media)
    {
        $this->media = $media;
    }


    /**
     * @since 4.9.62.p
     */
    public function enqueueAsset()
    {
        if ($this->source() === '') {
            return;
        }
        wp_enqueue_style($this->handle());
    }
}
