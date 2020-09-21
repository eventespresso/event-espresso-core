<?php

namespace EventEspresso\core\services\assets;

use EventEspresso\core\domain\Domain;
use EventEspresso\core\domain\DomainInterface;

/**
 * @package EventEspresso\core\services\assets
 * @author  Darren Ethier
 * @since   4.9.62.p
 * @deprecated $VID:$
 */
class I18nRegistry
{
    /**
     * @var DomainInterface
     */
    private $domain;

    /**
     * @var JedLocaleData $jed_locale
     */
    private $jed_locale;

    /**
     * I18nRegistry constructor.
     *
     * @param DomainInterface $domain
     * @param JedLocaleData $jed_locale
     * @param array() $i18n_map
     * @deprecated $VID:$
     */
    public function __construct(DomainInterface $domain, JedLocaleData $jed_locale, array $i18n_map = [])
    {
        $this->domain = $domain;
        $this->jed_locale = $jed_locale;
    }

    /**
     * @param string $handle The script handle reference.
     * @param string $domain The i18n domain for the strings.
     * @deprecated $VID:$
     */
    public function registerScriptI18n($handle, $domain = Domain::TEXT_DOMAIN)
    {
    }

    /**
     * @param array $handles Array of registered script handles.
     * @return array
     * @deprecated $VID:$
     */
    public function queueI18n(array $handles)
    {
        return $handles;
    }
}
