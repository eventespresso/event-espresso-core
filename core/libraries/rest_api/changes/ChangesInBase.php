<?php

namespace EventEspresso\core\libraries\rest_api\changes;

use EE_Error;

/*
 * Class for tracking what changes are made to the API and when. It's almost like
 * on-the-fly-migrations.
 * This class' name indicates what requested versions it applies to.
 * For example, if its name is "In_4_8_33" then it relates to changes made in 4.8.33.
 * So if a request comes in for 4.8.29, this class adds hooks and filters will take
 * care of altering the 4.8.33 endpoints/contents/functionality
 * to behave like it did in 4.8.29.
 * For example, if 4.8.33 adds a new endpoint called "/registrations/{id}/datetimes/{id}"
 * then this class will enqueue a filter to remove that endpoint (and remember this c
 * class is only loaded for requests to 4.8.29 and lower).
 * If an endpoint's response had a new field added in 4.8.33, then this would
 * also enqueue a filter to change that endpoint's response to remove it from
 * requests to the 4.9.29 version of that endpoint. Etc.
 * Note that this is different than the Model_Version_Info class. That class just
 * tracks changes made in EE core's models. This tracks changes just made in the REST API.
 * They have the same purpose though: provide backwards compatibility so that
 * the EE4 REST API behaves the same regardless of what version of EE is running
 * behind the scenes.
 * Note: this class is loaded on every rest api request, and its filters get
 * added too, so its up to its filters and action callbacks to determine if they should
 * apply or not. They should probably use the Changes_In_Base::applies_to_version()
 * helper method to determine whether to perform their action or not.
 * Also note that children of this class should be in the same folder and be
 * named like "Changes_In_{MajorVersion}_{MinorVersion}_{MicroVersion}",
 * eg "Changes_In_4_8_33", and they should be the namespace "EventEspresso\core\libraries\rest_api\changes".
 * If so, they will be automatically loaded on all rest api requests, and their
 * "set_hooks" method will be called automatically during "rest_api_init"
 */

abstract class ChangesInBase
{
    /**
     * The version that these changes happened
     *
     * @var string
     */
    protected $version = null;


    /**
     * Called when an EE4 REST API request is made to an earlier version than
     * what is indicated in this class' name.
     * Uses WordPress' add_filter and add_action to modify the EE4 REST API's response
     * so that regardless of what version of EE4 core is running, API clients
     * will have a consistent response
     *
     * @return void
     */
    abstract public function setHooks();


    /**
     * Returns whether or not this class' name indicates its hooks should
     * apply when a request comes in for $requested_version. A class can use
     * other conditions when determining whether to perform their callbacks or not,
     * but this will typically be enough
     *
     * @param string $requested_version eg "4.8.33"
     * @return boolean true: this class' name indicates its filters and actions
     *                                  should take effect. False: this class' name indicates it shouldn't do anything
     */
    public function appliesToVersion($requested_version)
    {
        if ($this->version() > $requested_version) {
            return true;
        }
        return false;
    }


    /**
     * Gets the EE core version when this changes were made to the rest api.
     * Any requests to earlier versions should have modifications made to them
     * by the callbacks of this class.
     *
     * @return string eg "4.8.33"
     * @throws EE_Error
     */
    public function version()
    {
        if ($this->version === null) {
            $matches = array();
            $regex = '~ChangesIn(\d)(\d\d)(\d\d)$~';
            $success = preg_match(
                $regex,
                get_class($this),
                $matches
            );
            if (! $success) {
                throw new EE_Error(
                    sprintf(
                        esc_html__('The class %1$s was misnamed. It name should match the regex "%2$s"', 'event_espresso'),
                        get_class($this),
                        $regex
                    )
                );
            }
            $this->version = (int) $matches[1] . '.' . (int) $matches[2] . '.' . (int) $matches[3];
        }
        return $this->version;
    }
}
