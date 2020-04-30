<?php

namespace EventEspresso\core\services\assets;

use EEH_DTT_Helper;

/**
 * Class JedLocaleData
 * Description
 *
 * @package EventEspresso\core\services\assets
 * @author  Brent Christensen
 * @since   $VID:$
 */
class JedLocaleData
{

    /**
     * Returns Jed-formatted localization data.
     *
     * @param string $domain Translation domain.
     * @return array
     */
    public function getData($domain)
    {
        $translations = get_translations_for_domain($domain);

        $locale = [
            '' => [
                'domain' => $domain,
                'lang'   => is_admin() ? EEH_DTT_Helper::get_user_locale() : get_locale()
            ],
        ];

        if (! empty($translations->headers['Plural-Forms'])) {
            $locale['']['plural_forms'] = $translations->headers['Plural-Forms'];
        }

        foreach ($translations->entries as $id => $entry) {
            $locale[ $id ] = $entry->translations;
        }

        return $locale;
    }
}