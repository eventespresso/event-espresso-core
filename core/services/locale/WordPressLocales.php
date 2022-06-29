<?php

namespace EventEspresso\core\services\locale;

/**
 * Class WordPressLocales
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\locale
 * @since   $VID:$
 */
class WordPressLocales
{
    /**
     * Some of the WordPress languages
     * (as represented in the WPLANG dropdown on the WP Settings admin page)
     * are not valid Locale codes;
     * for example: 'uk' instead of 'uk_UA' for Ukrainian (Ukraine) Слава Україні!
     * This array maps WordPress languages to valid locale codes
     *
     * @var string[]
     */
    private static $valid_locales = [
        'af'             => 'af_ZA',
        'am'             => 'am_ET',
        'arg'            => 'an_ES',
        'ary'            => 'ar_MA',
        'as'             => 'as_IN',
        'azb'            => 'az_AZ',
        'be'             => 'be_BY',
        'bo'             => 'bo_IN',
        'ceb'            => 'tl_PH',
        'cy'             => 'cy_GB',
        'de_CH_informal' => 'de_CH',
        'de_DE_formal'   => 'de_DE',
        'dsb'            => 'dsb_DE',
        'dzo'            => 'dz_BT',
        'et'             => 'et_EE',
        'eu'             => 'eu_ES',
        'fi'             => 'fi_FI',
        'fur'            => 'fur_IT',
        'gd'             => 'gd_GB',
        'gu'             => 'gu_IN',
        'haz'            => 'ps_AF', // Hazāragi هزاره گی
        'hr'             => 'hr_HR',
        'hsb'            => 'hsb_DE',
        'hy'             => 'hy_AM',
        'ja'             => 'ja_JP',
        'kab'            => 'kab_DZ',
        'kk'             => 'kk_KZ',
        'km'             => 'km_KH',
        'kn'             => 'kn_IN',
        'ckb'            => 'ckb_IQ',
        'lo'             => 'lo_LA',
        'lv'             => 'lv_LV',
        'mn'             => 'mn_MN',
        'mr'             => 'mr_IN',
        'nl_NL_formal'   => 'nl_NL',
        'oci'            => 'oc_FR',
        'ps'             => 'ps_AF',
        'pt_PT_ao90'     => 'pt_PT',
        'sah'            => 'sah_RU',
        'snd'            => 'sd_IN',
        'skr'            => 'pa_PK',
        'sq'             => 'sq_AL',
        'szl'            => 'szl_PL',
        'te'             => 'te_IN',
        'th'             => 'th_TH',
        'tl'             => 'tl_PH',
        'uk'             => 'uk_UA',
        'vi'             => 'vi_VN',
    ];


    /**
     * Some of the WordPress languages
     * (as represented in the WPLANG dropdown on the WP Settings admin page)
     * have multiple locales that those languages are used within;
     * for example: Urdu (lang code: 'ur') is spoken in both India ('ur_IN') and Pakistan ('ur_PK')
     * This array maps WordPress languages to additional locale data
     *
     * @var string[][]
     */
    private static $extra_locales = [
        'ar' => [
            'ar_AE' => 'العربية (الإمارات العربية المتحدة)', // Arabic United Arab Emirates
            'ar_BH' => 'العربية (البحرين)', // Arabic Bahrain
            'ar_DZ' => 'عربي (الجزائر)', // Arabic Algeria
            'ar_EG' => 'عربي (مصر)', // Arabic Egypt
            'ar_IN' => 'عربي (الهند)', // Arabic India
            'ar_IQ' => 'عربي (العراق)', // Arabic Iraq
            'ar_JO' => 'عربي (الاردن)', // Arabic Jordan
            'ar_KW' => 'عربي (الكويت)', // Arabic Kuwait
            'ar_LB' => 'عربي (لبنان)', // Arabic Lebanon
            'ar_LY' => 'عربي (الجماهيرية العربية الليبية)', // Arabic Libyan Arab Jamahiriya
            'ar_OM' => 'عربي (عمان)', // Arabic Oman
            'ar_QA' => 'عربي (قطر)', // Arabic Qatar
            'ar_SA' => 'عربي (السعودية)', // Arabic Saudi Arabia
            'ar_SD' => 'عربي (السودان)', // Arabic Sudan
            'ar_SS' => 'العربية (جنوب السودان)', // Arabic South Soudan
            'ar_SY' => 'عربي (الجمهورية العربية السورية)', // Arabic Syrian Arab Republic
            'ar_TN' => 'عربي (تونس)', // Arabic Tunisia
            'ar_YE' => 'عربي (اليمن)', // Arabic Yemen
        ],
        'ca' => [
            'ca_AD' => 'Català (Andorra)', // Catalan Andorra
            'ca_ES' => 'Català (Espanya)', // Catalan Spain
            'ca_FR' => 'Català (França)', // Catalan France
            'ca_IT' => 'Català (Itàliay)', // Catalan Italy
        ],
        'el' => [
            'el_CY' => 'Ελληνικά (Κύπρος)', // Greek Cyprus
            'el_GR' => 'Ελληνικά (Ελλάδα)', // Greek Greece
        ],
        'sw' => [
            'sw_KE' => 'Kiswahili (Kenya)', // Swahili Kenya
            'sw_TZ' => 'Kiswahili (Tanzania)', // Swahili Tanzania
        ],
        'ur' => [
            'ur_IN' => 'اردو (ہندوستان)', // Urdu India
            'ur_PK' => 'اردو (پاکستان)', // Urdu Pakistan
        ],
    ];


    /**
     * returns valid Locale code like 'uk_UA' for the provided WordPress language code or null if nothing found
     *
     * @param string $language  WordPress language option like 'uk'
     * @return string|null
     */
    public static function getLocaleForLanguage(string $language): ?string
    {
        return WordPressLocales::$valid_locales[ $language ] ?? null;
    }


    /**
     * returns true if a valid locale code was found for the provided WordPress language code
     *
     * @param string $language WordPress language option like 'uk'
     * @return bool
     */
    public static function hasLocaleForLanguage(string $language): bool
    {
        return  isset(WordPressLocales::$valid_locales[ $language ]);
    }


    /**
     * returns array of locale options for the provided WordPress language code or null if nothing found
     *
     * @param string $language  WordPress language option like 'ur'
     * @return string[]|null
     */
    public static function getExtraLocalesForLanguage(string $language): ?array
    {
        return WordPressLocales::$extra_locales[ $language ] ?? null;
    }


    /**
     * returns true if a additional locale data was found for the provided WordPress language code
     *
     * @param string $language  WordPress language option like 'ur'
     * @return bool
     */
    public static function hasExtraLocalesForLanguage(string $language): bool
    {
        return isset(WordPressLocales::$extra_locales[ $language ]);
    }
}
