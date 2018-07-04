<?php

/**
 * Class EE_Register_Privacy_Policy
 * Registers additional plugin privacy policy text. Yes, you could manually call `wp_add_privacy_policy_content`
 * but you'd also need to add the logic about when to load the code etc. This way EE core takes care of knowing
 * when to load this class and call it
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.62.p
 */
class EE_Register_Privacy_Policy implements EEI_Plugin_API
{

    /**
     * FQCN for all privacy policy generators
     *
     * @var array keys are plugin_ids, and values are an array of FQCNs or FQCNs
     */
    protected static $privacy_policies = array();


    /*
     * @param string $plugin_id
     * @param array $FQNSs can be the fully qualified namespaces each containing only privacy policies,
     *              OR fully qualified class names of privacy policies
     */
    public static function register($plugin_id = null, $FQCNs = array())
    {
        self::$privacy_policies[ $plugin_id ] = $FQCNs;
        // add to list of modules to be registered
        add_filter(
            'FHEE__EventEspresso_core_services_privacy_policy_PrivacyPolicyManager__privacy_policies',
            array('EE_Register_Privacy_Policy', 'addPrivacyPolicies')
        );
    }


    /**
     * @param null $ID
     */
    public static function deregister($ID = null)
    {
        unset(self::$privacy_policies[ $ID ]);
    }


    /**
     * Adds our privacy policiy generators registered by add-ons
     *
     * @param string[] $privacy_policies
     * @return string[]
     */
    public static function addPrivacyPolicies(array $privacy_policies)
    {
        foreach (self::$privacy_policies as $privacy_policies_per_addon) {
            $privacy_policies = array_merge(
                $privacy_policies,
                $privacy_policies_per_addon
            );
        }
        return $privacy_policies;
    }
}
// End of file EE_Register_Privacy_Policy.lib.php
// Location: ${NAMESPACE}/EE_Register_Privacy_Policy.lib.php
