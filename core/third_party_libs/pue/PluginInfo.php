<?php

namespace PluginUpdateEngine;

use stdClass;

/**
 * A container class for holding and transforming various plugin metadata.
 *
 * @version 1.1
 */
class PluginInfo
{
    //Most fields map directly to the contents of the plugin's info.json file.

    public $name;

    public $slug;

    public $version;

    public $homepage;

    public $sections;

    public $download_url;

    public $author;

    public $author_homepage;

    public $requires;

    public $tested;

    public $upgrade_notice;

    public $rating;

    public $num_ratings;

    public $downloaded;

    public $last_updated;

    public $render_pass;

    public $api_invalid;

    public $api_invalid_message;

    public $new_install_key;

    public $id = 0; //The native WP.org API returns numeric plugin IDs, but they're not used for anything.

    private static $sameFormat = [
        'name',
        'slug',
        'version',
        'requires',
        'tested',
        'rating',
        'upgrade_notice',
        'num_ratings',
        'downloaded',
        'homepage',
        'last_updated',
    ];

    /**
     * Create a new instance of PluginInfo from JSON-encoded plugin info
     * returned by an external update API.
     *
     * @param string $json Valid JSON string representing plugin info.
     * @return PluginInfo New instance of PluginInfo, or NULL on error.
     */
    public static function fromJson(string $json, $object = false): ?PluginInfo
    {
        $apiResponse = (! $object) ? json_decode($json) : $json;
        if (empty($apiResponse) || ! is_object($apiResponse)) {
            return null;
        }

        //Very, very basic validation.
        if (
            empty($apiResponse->name)
            || empty($apiResponse->version)
            || ! isset($apiResponse->api_invalid)
            || ! isset($apiResponse->no_api)
        ) {
            return null;
        }

        $info = new self();

        foreach (get_object_vars($apiResponse) as $key => $value) {
            // let's strip out the "plugin_" prefix we've added in plugin-updater-classes.
            $key          = str_replace('plugin_', '', $key);
            $info->{$key} = $value;
        }

        return $info;
    }


    /**
     * Transform plugin info into the format used by the native WordPress.org API
     *
     * @return stdClass
     */
    public function toWpFormat(): stdClass
    {
        $info = new StdClass();

        //The custom update API is built so that many fields have the same name and format
        //as those returned by the native WordPress.org API. These can be assigned directly.

        foreach (self::$sameFormat as $field) {
            if (isset($this->{$field})) {
                $info->{$field} = $this->{$field};
            } else {
                $info->{$field} = '';
            }
        }

        //Other fields need to be renamed and/or transformed.
        $info->download_link = $this->download_url;

        if (! empty($this->author_homepage)) {
            $info->author = sprintf(
                '<a href="%s">%s</a>',
                $this->author_homepage,
                $this->author
            );
        } else {
            $info->author = $this->author;
        }

        if (is_object($this->sections)) {
            $info->sections = get_object_vars($this->sections);
        } elseif (is_array($this->sections)) {
            $info->sections = $this->sections;
        } else {
            $info->sections = ['description' => ''];
        }

        $this->slug = ! empty($this->slug) ? $this->slug : '';

        return $info;
    }
}
