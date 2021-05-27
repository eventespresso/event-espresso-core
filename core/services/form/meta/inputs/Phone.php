<?php

namespace EventEspresso\core\services\form\meta\inputs;

class Phone
{

    /**
     * indicates that the HTML input type is 'tel'
     */
    public const INPUT_TYPE = 'tel';

    /**
     * indicates that the 'tel' input regex pattern is for a US formatted phone number, examples:
     *      ##########
     *      ###-###-####
     *      ### ### ####
     *      (###)-###-####
     *      (###) ###-####
     *
     * captures the intl code to the first group (+1) and the rest of the number to group 2
     *      +1 (###) ###-####
     */
    public const PATTERN_US = '(\+?\d{1,3})?[\ \-]?(\(?\d{3}\)?[\ \-]?\d{3}[\ \-]?\d{4})';

    /**
     * indicates that the 'tel' input regex pattern is for a UK formatted phone number, examples:
     *      (###) #### ####
     *      (####) ### ####
     *      (#####) ## ####
     *
     * captures the intl code to the first group (+44) and the rest of the number to group 2
     *      +44 (###) #### ####
     */
    public const PATTERN_UK = '(\+?44)?[\ ]?(\(?(?:(?:\d{3,5})|(?:\d{4} \d{2}))\)?[\-\ ]?\d{2,4}[\-\ ]?\d{2,4})';

    /**
     * indicates that the 'tel' input regex pattern is for a France formatted phone number, examples:
     *      0# ## ## ## ##
     *      0### ## ## ##
     *
     * captures the intl code to the first group (+33) and the rest of the number to group 2
     *      +33 # ## ## ## ##
     *      0033 # ## ## ## ##
     */
    public const PATTERN_FR = '((?:\+|00)33)?[\ \.\-]*((?:(?:\(0\)[\ \.\-]{0,3})?|0)[1-9](?:(?:[\ \.\-]?\d{2}){4}|\d{2}(?:[\ \.\-]?\d{3}){2}))';

    /**
     * indicates that the 'tel' input regex pattern is for a German formatted phone number, examples:
     *      (0##) ####-####
     *      (0###) ####-####
     *      (0####) ###-####
     *      (03####) ##-####
     *
     * captures the intl code to the first group (+49) and the rest of the number to group 2
     *      +49 (0##) ####-####
     */
    public const PATTERN_DE = '(\+?49)?[\ \.\-]?(\(?(?:[\d \-\)\–\/\(]+){6,}\)?(?:[\ \.\-–\/]?)(?:[\d]+))';

    /**
     * @var array
     */
    private $regex_patterns;

    /**
     * @var array
     */
    private $valid_type_options;


    /**
     * Phone constructor.
     */
    public function __construct()
    {
        $this->regex_patterns     = (array) apply_filters(
            'FHEE__EventEspresso_core_services_form_meta_inputs_Phone__regex_patterns',
            [
                'de_DE' => Phone::PATTERN_DE,
                'fr_FR' => Phone::PATTERN_FR,
                'en_UK' => Phone::PATTERN_UK,
                'en_US' => Phone::PATTERN_US,
            ]
        );
        $this->valid_type_options = apply_filters(
            'FHEE__EventEspresso_core_services_form_meta_inputs_Phone__valid_type_options',
            [
                Phone::INPUT_TYPE => esc_html__('Phone Number', 'event_espresso'),
            ]
        );
    }


    /**
     * @return array
     */
    public function regexPatterns(): array
    {
        return $this->regex_patterns;
    }


    /**
     * @param bool $constants_only
     * @return array
     */
    public function validTypeOptions(bool $constants_only = false): array
    {
        return $constants_only
            ? array_keys($this->valid_type_options)
            : $this->valid_type_options;
    }
}
