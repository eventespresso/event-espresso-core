<?php

namespace EventEspresso\core\services\assets;

use DomainException;
use Exception;

/**
 * Class AssetManifestException
 * thrown when an error occurs while accessing data within an asset manifest file
 *
 * @package EventEspresso\core\services\assets
 */
class AssetManifestException extends DomainException
{
    /**
     * AssetManifestException constructor
     *
     * @param string    $entry
     * @param string    $key
     * @param string    $message
     * @param int       $code
     * @param Exception $previous
     */
    public function __construct($entry, $key = '', $message = '', $code = 0, Exception $previous = null)
    {
        if (empty($message)) {
            switch($key) {
                case AssetManifest::KEY_DEPENDENCIES:
                    $key = 'dependency';
                    break;
                case AssetManifest::KEY_FILES:
                    $key = 'file';
                    break;
                case AssetManifest::KEY_VERSION:
                    $key = 'version';
                    break;
                case AssetManifest::KEY_ENTRY_POINTS:
                    $key = 'entry point';
                    break;
                default:
                    $key = 'key';
            }
            $message =
                sprintf(
                    esc_html__(
                        'The "%1$s" %2$s was not found in the assets manifest file.',
                        'event_espresso'
                    ),
                    $entry,
                    $key
                );
        }
        parent::__construct($message, $code, $previous);
    }

}
