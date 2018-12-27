<?php

/**
 * Class EE_Register_Personal_Data_Eraser
 * Registers additional plugin personal data exporters. Yes, you could manually use the filters
 * but you'd also need to add the logic about when to load the code etc. This way EE core takes care of knowing
 * when to load this class and call it
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.62.p
 */
class EE_Register_Personal_Data_Eraser implements EEI_Plugin_API
{

    /**
     * FQCN for all privacy policy generators
     *
     * @var array keys are plugin_ids, and values are an array of FQCNs or FQCNs
     */
    protected static $erasers = array();


    /*
     * @param string $plugin_id
     * @param array $FQNSs can be the fully qualified namespaces each containing only privacy policies,
     *              OR fully qualified class names of privacy policies
     */
    public static function register($plugin_id = null, $FQCNs = array())
    {
        self::$erasers[ $plugin_id ] = $FQCNs;
        // add to list of modules to be registered
        add_filter(
            'FHEE__EventEspresso_core_services_privacy_erasure_PersonalDataEraserManager__erasers',
            array('EE_Register_Personal_Data_Eraser', 'addErasers')
        );
    }


    /**
     * @param null $ID
     */
    public static function deregister($ID = null)
    {
        unset(self::$erasers[ $ID ]);
    }


    /**
     * Adds our personal data erasers registered by add-ons
     *
     * @param string[] $erasers
     * @return string[]
     */
    public static function addErasers(array $erasers)
    {
        foreach (self::$erasers as $erasers_per_addon) {
            $erasers = array_merge(
                $erasers,
                $erasers_per_addon
            );
        }
        return $erasers;
    }
}
// End of file EE_Register_Personal_Data_Eraser.lib.php
// Location: ${NAMESPACE}/EE_Register_Personal_Data_Eraser.lib.php
