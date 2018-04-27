<?php

namespace EventEspresso\core\domain\values\assets;

use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\exceptions\InvalidDataTypeException;

/**
 * Class StylesheetAsset
 * Details for a Cascading Stylesheet asset
 *
 * @package EventEspresso\core\domain\values\assets
 * @author  Brent Christensen
 * @since   $VID:$
 */
class StylesheetAsset extends BrowserAsset
{

    /**
     * @var string $media
     */
    private $media;


    /**
     * CssFile constructor.
     *
     * @param                 $handle
     * @param string          $source
     * @param array           $dependencies
     * @param                 $media
     * @param DomainInterface $domain
     * @throws InvalidDataTypeException
     */
    public function __construct($handle, $source, array $dependencies, $media, DomainInterface $domain)
    {
        parent::__construct(Asset::TYPE_CSS, $handle, $source, $dependencies, $domain);
        $this->setMedia($media);
    }


    /**
     * @return string
     */
    public function media()
    {
        return $this->media;
    }


    /**
     * @param string $media
     * @throws InvalidDataTypeException
     */
    private function setMedia($media)
    {
        if (! is_string($media)) {
            throw new InvalidDataTypeException(
                '$media',
                $media,
                'string'
            );
        }
        $this->media = $media;
    }
}
