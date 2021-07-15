<?php

/**
 * State Model
 *
 * @package     Event Espresso
 * @subpackage  includes/models/
 * @author      Brent Christensen
 */
class EEM_State extends EEM_Base
{

    /**
     * @var EEM_State
     */
    protected static $_instance;

    /**
     * @var EE_State[]
     */
    private static $_all_states;

    /**
     * @var EE_State[]
     */
    private static $_active_states;


    protected function __construct(string $timezone = '')
    {
        $this->singular_item = esc_html__('State/Province', 'event_espresso');
        $this->plural_item   = esc_html__('States/Provinces', 'event_espresso');

        $this->_tables = [
            'State' => new EE_Primary_Table('esp_state', 'STA_ID'),
        ];

        $this->_fields          = [
            'State' => [
                'STA_ID'     => new EE_Primary_Key_Int_Field(
                    'STA_ID',
                    esc_html__('State ID', 'event_espresso')
                ),
                'CNT_ISO'    => new EE_Foreign_Key_String_Field(
                    'CNT_ISO',
                    esc_html__('Country ISO Code', 'event_espresso'),
                    false,
                    null,
                    'Country'
                ),
                'STA_abbrev' => new EE_Plain_Text_Field(
                    'STA_abbrev',
                    esc_html__('State Abbreviation', 'event_espresso'),
                    false,
                    ''
                ),
                'STA_name'   => new EE_Plain_Text_Field(
                    'STA_name',
                    esc_html__('State Name', 'event_espresso'),
                    false,
                    ''
                ),
                'STA_active' => new EE_Boolean_Field(
                    'STA_active',
                    esc_html__('State Active Flag', 'event_espresso'),
                    false,
                    false
                ),
            ],
        ];
        $this->_model_relations = [
            'Attendee' => new EE_Has_Many_Relation(),
            'Country'  => new EE_Belongs_To_Relation(),
            'Venue'    => new EE_Has_Many_Relation(),
        ];
        // this model is generally available for reading
        $this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Public();
        // @todo: only show STA_active
        parent::__construct($timezone);
    }


    /**
     * reset_cached_states
     *
     * @return void
     */
    public function reset_cached_states()
    {
        EEM_State::$_active_states = null;
        EEM_State::$_all_states    = null;
    }


    /**
     * _get_states
     *
     * @return EE_State[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_states(): array
    {
        if (self::$_all_states === null) {
            self::$_all_states = $this->get_all(['order_by' => ['STA_name' => 'ASC'], 'limit' => [0, 99999]]);
        }
        return self::$_all_states;
    }


    /**
     * @param EE_Country[] $countries
     * @param bool         $flush_cache
     * @return EE_State[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_active_states(array $countries = [], bool $flush_cache = false): array
    {
        if (! self::$_active_states || $flush_cache) {
            $countries            = ! empty($countries) && is_array($countries)
                ? $countries
                : EEM_Country::instance()->get_all_active_countries();
            self::$_active_states = $this->get_all(
                [
                    [
                        'STA_active' => true,
                        'CNT_ISO'    => ['IN', array_keys($countries)],
                    ],
                    'order_by'   => ['STA_name' => 'ASC'],
                    'limit'      => [0, 99999],
                    'force_join' => ['Country'],
                ]
            );
        }
        return self::$_active_states;
    }


    /**
     *  get_all_states_of_active_countries
     *
     * @return EE_State[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_states_of_active_countries(): array
    {
        return $this->get_all(
            [
                ['Country.CNT_active' => true, 'STA_active' => true],
                'order_by' => ['Country.CNT_name' => 'ASC', 'STA_name' => 'ASC'],
            ]
        );
    }


    /**
     *  get_all_states_of_active_countries
     *
     * @param $countries
     * @return EE_State[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_active_states_for_these_countries($countries): array
    {
        if (! $countries) {
            return [];
        }
        return $this->get_all(
            [
                ['Country.CNT_ISO' => ['IN', array_keys($countries)], 'STA_active' => true],
                'order_by' => ['Country.CNT_name' => 'ASC', 'STA_name' => 'ASC'],
            ]
        );
    }


    /**
     *  get_all_states_of_active_countries
     *
     * @param $countries
     * @return EE_State[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_states_for_these_countries($countries): array
    {
        if (! $countries) {
            return [];
        }
        return $this->get_all(
            [
                ['Country.CNT_ISO' => ['IN', array_keys($countries)]],
                'order_by' => ['Country.CNT_name' => 'ASC', 'STA_name' => 'ASC'],
            ]
        );
    }


    /**
     * Gets the state's name by its ID
     *
     * @param string $state_ID
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_state_name_by_ID(string $state_ID): string
    {
        if (
            isset(self::$_all_states[ $state_ID ]) && self::$_all_states[ $state_ID ] instanceof EE_State
        ) {
            return self::$_all_states[ $state_ID ]->name();
        }
        $names = $this->get_col([['STA_ID' => $state_ID], 'limit' => 1], 'STA_name');
        return is_array($names) && ! empty($names)
            ? reset($names)
            : '';
    }
}
