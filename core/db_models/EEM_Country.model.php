<?php
/**
 * Country Model
 *
 * @package         Event Espresso
 * @subpackage  includes/models/
 * @author              Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EEM_Country extends EEM_Base
{

    // private instance of the Attendee object
    protected static $_instance = null;
    // array of all countries
    private static $_all_countries = false;
    // array of all active countries
    private static $_active_countries = false;



    /**
     * Resets the country
     * @return EEM_Country
     */
    public static function reset($timezone = null)
    {
        self::$_active_countries = null;
        self::$_all_countries = null;
        return parent::reset($timezone);
    }

    protected function __construct($timezone = null)
    {
        $this->singular_item = esc_html__('Country', 'event_espresso');
        $this->plural_item = esc_html__('Countries', 'event_espresso');


        $this->_tables = array(
            'Country'=> new EE_Primary_Table('esp_country', 'CNT_ISO')
        );
        $this->_fields = array(
            'Country'=>array(
                'CNT_active' => new EE_Boolean_Field('CNT_active', esc_html__('Country Appears in Dropdown Select Lists', 'event_espresso'), false, true),
                'CNT_ISO'=> new EE_Primary_Key_String_Field('CNT_ISO', esc_html__('Country ISO Code', 'event_espresso')),
                'CNT_ISO3'=>new EE_All_Caps_Text_Field('CNT_ISO3', esc_html__('Country ISO3 Code', 'event_espresso'), false, ''),
                'RGN_ID'=>new EE_Integer_Field('RGN_ID', esc_html__('Region ID', 'event_espresso'), false, 0),// should be a foreign key, but no region table exists yet
                'CNT_name'=>new EE_Plain_Text_Field('CNT_name', esc_html__('Country Name', 'event_espresso'), false, ''),
                'CNT_cur_code'=>new EE_All_Caps_Text_Field('CNT_cur_code', esc_html__('Country Currency Code', 'event_espresso'), false),
                'CNT_cur_single' => new EE_Plain_Text_Field('CNT_cur_single', esc_html__('Currency Name Singular', 'event_espresso'), false),
                'CNT_cur_plural' => new EE_Plain_Text_Field('CNT_cur_plural', esc_html__('Currency Name Plural', 'event_espresso'), false),
                'CNT_cur_sign' => new EE_Plain_Text_Field('CNT_cur_sign', esc_html__('Currency Sign', 'event_espresso'), false),
                'CNT_cur_sign_b4' => new EE_Boolean_Field('CNT_cur_sign_b4', esc_html__('Currency Sign Before Number', 'event_espresso'), false, true),
                'CNT_cur_dec_plc' => new EE_Integer_Field('CNT_cur_dec_plc', esc_html__('Currency Decimal Places', 'event_espresso'), false, 2),
                'CNT_cur_dec_mrk' => new EE_Plain_Text_Field('CNT_cur_dec_mrk', esc_html__('Currency Decimal Mark', 'event_espresso'), false, '.'),
                'CNT_cur_thsnds' => new EE_Plain_Text_Field('CNT_cur_thsnds', esc_html__('Currency Thousands Separator', 'event_espresso'), false, ','),
                'CNT_tel_code' => new EE_Plain_Text_Field('CNT_tel_code', esc_html__('Country Telephone Code', 'event_espresso'), false, ''),
                'CNT_is_EU' => new EE_Boolean_Field('CNT_is_EU', esc_html__('Country is Member of EU', 'event_espresso'), false, false)
            ));
        $this->_model_relations = array(
            'Attendee'=>new EE_Has_Many_Relation(),
            'State'=>new EE_Has_Many_Relation(),
            'Venue'=>new EE_Has_Many_Relation(),
        );
        // only anyone to view, but only those with the default role can do anything
        $this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Public();

        parent::__construct($timezone);
    }




    /**
    *       _get_countries
    *
    *       @access     public
    *       @return         array
    */
    public function get_all_countries()
    {
        if (! self::$_all_countries) {
            self::$_all_countries = $this->get_all(array( 'order_by'=>array('CNT_name'=>'ASC'), 'limit'=> array( 0,99999 )));
        }
        return self::$_all_countries;
    }

    /**
    *       _get_countries
    *       Gets and caches the list of active countries. If you know the list of active countries
    *       has changed during this request, first use EEM_Country::reset() to flush the cache
    *       @access     public
    *       @return         array
    */
    public function get_all_active_countries()
    {
        if (! self::$_active_countries) {
            self::$_active_countries =  $this->get_all(array( array( 'CNT_active' => true ), 'order_by'=>array('CNT_name'=>'ASC'), 'limit'=>array( 0, 99999 )));
        }
        return self::$_active_countries;
    }

    /**
     * Gets the country's name by its ISO
     * @param string $country_ISO
     * @return string
     */
    public function get_country_name_by_ISO($country_ISO)
    {
        if (isset(self::$_all_countries[ $country_ISO ]) &&
                self::$_all_countries[ $country_ISO ] instanceof EE_Country ) {
            return self::$_all_countries[ $country_ISO ]->name();
        }
        $names = $this->get_col(array( array( 'CNT_ISO' => $country_ISO ), 'limit' => 1), 'CNT_name');
        if (is_array($names) && ! empty($names)) {
            return reset($names);
        } else {
            return '';
        }
    }
}
