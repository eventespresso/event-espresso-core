<?php

/**
 * Config class for storing info on the Organization
 */
class EE_Organization_Config extends EE_Config_Base
{
    /**
     * @var string $name
     * eg EE4.1
     */
    public $name;

    /**
     * @var string $address_1
     * eg 123 Onna Road
     */
    public $address_1 = '';

    /**
     * @var string $address_2
     * eg PO Box 123
     */
    public $address_2 = '';

    /**
     * @var string $city
     * eg Inna City
     */
    public $city = '';

    /**
     * @var int $STA_ID
     * eg 4
     */
    public $STA_ID = 0;

    /**
     * @var string $CNT_ISO
     * eg US
     */
    public $CNT_ISO = 'US';

    /**
     * @var string $zip
     * eg 12345  or V1A 2B3
     */
    public $zip = '';

    /**
     * @var string $email
     * eg support@eventespresso.com
     */
    public $email;

    /**
     * @var string $phone
     * eg. 111-111-1111
     */
    public $phone = '';

    /**
     * @var string $vat
     * VAT/Tax Number
     */
    public $vat = '';

    /**
     * @var string $logo_url
     * eg https://www.somedomain.com/wp-content/uploads/kittehs.jpg
     */
    public $logo_url = '';

    /**
     * The below are all various properties for holding links to organization social network profiles
     */

    /**
     * facebook (facebook.com/profile.name)
     *
     * @var string
     */
    public $facebook = '';

    /**
     * twitter (twitter.com/twitter_handle)
     *
     * @var string
     */
    public $twitter = '';

    /**
     * linkedin (linkedin.com/in/profile_name)
     *
     * @var string
     */
    public $linkedin = '';

    /**
     * pinterest (www.pinterest.com/profile_name)
     *
     * @var string
     */
    public $pinterest = '';

    /**
     * google+ (google.com/+profileName)
     *
     * @var string
     */
    public $google = '';

    /**
     * instagram (instagram.com/handle)
     *
     * @var string
     */
    public $instagram = '';


    public function __construct()
    {
        // set default organization settings
        // decode HTML entities from the WP blogname, because it's stored in the DB with HTML entities encoded
        $this->name = wp_specialchars_decode(get_bloginfo('name'), ENT_QUOTES);
        $this->email = get_bloginfo('admin_email');
    }
}
