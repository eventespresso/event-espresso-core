<?php

/**
 * EE_Restriction_Generator_Public
 * Generates cap restrictions array that essentially makes this model
 * controlled by the 'manage_event/venue_categories' permissions
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Mike Nelson
 */
class EE_Restriction_Generator_Taxonomy_Protected
    extends EE_Restriction_Generator_Base
{

    /**
     * Model chain/path to taxonomy model,
     * including the term_taxonomy model itself
     *
     * @var string
     */
    protected $_path_to_taxonomy_model;


    /**
     * @param string $path_to_taxonomy_model Model chain/path to taxonomy
     *                                       model, including the term_taxonomy
     *                                       model itself
     */
    public function __construct(string $path_to_taxonomy_model)
    {
        if (
            $path_to_taxonomy_model !== '' &&
            substr($path_to_taxonomy_model, -1, 1) != '.'
        ) {
            $path_to_taxonomy_model .= '.';
        }
        $this->_path_to_taxonomy_model = $path_to_taxonomy_model;
    }


    /**
     * @return EE_Default_Where_Conditions[]|EE_Return_None_Where_Conditions[]
     * @throws EE_Error
     */
    protected function _generate_restrictions(): array
    {
        // if there are no standard caps for this model, then allow full access
        if (! $this->model()->cap_slug()) {
            return [];
        }

        return [
            'ee_manage_event_categories' => new EE_Default_Where_Conditions(
                [
                    $this->_path_to_taxonomy_model .
                    'taxonomy*no_ee_manage_event_categories' => [
                        '!=',
                        'espresso_event_categories',
                    ],
                ]
            ),
            'ee_manage_venue_categories' => new EE_Default_Where_Conditions(
                [
                    $this->_path_to_taxonomy_model .
                    'taxonomy*no_ee_manage_venue_categories' => [
                        '!=',
                        'espresso_venue_categories',
                    ],
                ]
            ),
            'ee_manage_event_types'      => new EE_Default_Where_Conditions(
                [
                    $this->_path_to_taxonomy_model .
                    'taxonomy*ee_manage_event_types' => [
                        '!=',
                        'espresso_event_types'
                    ]
                ]
            ),
        ];
    }
}
