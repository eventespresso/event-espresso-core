<?php

/**
 * Class EE_Register_Personal_Data_Exporter
 * Registers additional plugin personal data exporters. Yes, you could manually use the filters
 * but you'd also need to add the logic about when to load the code etc. This way EE core takes care of knowing
 * when to load this class and call it
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.62.p
 */
class EE_Register_Personal_Data_Exporter implements EEI_Plugin_API
{

    /**
     * FQCN for all privacy policy generators
     *
     * @var array keys are plugin_ids, and values are an array of FQCNs or FQCNs
     */
    protected static $exporters = array();


    /*
     * @param string $plugin_id
     * @param array $FQNSs can be the fully qualified namespaces each containing only privacy policies,
     *              OR fully qualified class names of privacy policies
     */
    public static function register($plugin_id = null, $FQCNs = array())
    {
        self::$exporters[ $plugin_id ] = $FQCNs;
        // add to list of modules to be registered
        add_filter(
            'FHEE__EventEspresso_core_services_privacy_export_PersonalDataExporterManager__exporters',
            array('EE_Register_Personal_Data_Exporter', 'addExporters')
        );
    }


    /**
     * @param null $ID
     */
    public static function deregister($ID = null)
    {
        unset(self::$exporters[ $ID ]);
    }


    /**
     * Adds our personal data exporters registered by add-ons
     *
     * @param string[] $exporters
     * @return string[]
     */
    public static function addExporters(array $exporters)
    {
        foreach (self::$exporters as $exporters_per_addon) {
            $exporters = array_merge(
                $exporters,
                $exporters_per_addon
            );
        }
        return $exporters;
    }
}
// End of file EE_Register_Personal_Data_Exporter.lib.php
// Location: ${NAMESPACE}/EE_Register_Personal_Data_Exporter.lib.php
