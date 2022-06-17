<?php

namespace PluginUpdateEngine;

use stdClass;

/**
 * A simple container class for holding information about an available update.
 *
 * @version 1.1
 */
class PluginUpdateUtility
{
    public         $id         = 0;

    public         $slug;

    public         $version;

    public         $homepage;

    public         $download_url;

    public         $sections   = [];

    public         $upgrade_notice;

    private static $copyFields = [
        'id',
        'slug',
        'version',
        'homepage',
        'download_url',
        'upgrade_notice',
        'sections',
    ];


    /**
     * Create a new instance of PluginUpdateUtility from its JSON-encoded representation.
     *
     * @param string $json
     * @return PluginUpdateUtility
     */
    public static function fromJson(string $json): ?PluginUpdateUtility
    {
        //Since update-related information is simply a subset of the full plugin info,
        //we can parse the update JSON as if it was a plugin info string, then copy over
        //the parts that we care about.
        $pluginInfo = PluginInfo::fromJson($json);
        if ($pluginInfo !== null) {
            return self::fromPluginInfo($pluginInfo);
        }
        return null;
    }


    /**
     * Create a new instance of PluginUpdateUtility based on an instance of PluginInfo.
     * Basically, this just copies a subset of fields from one object to another.
     *
     * @param PluginInfo $info
     * @return PluginUpdateUtility
     */
    public static function fromPluginInfo(PluginInfo $info): PluginUpdateUtility
    {
        $update = new self();
        foreach (self::$copyFields as $field) {
            $update->{$field} = $info->{$field};
        }
        return $update;
    }


    /**
     * Transform the update into the format used by WordPress native plugin API.
     *
     * @return stdClass
     */
    public function toWpFormat(): StdClass
    {
        $update              = new StdClass();
        $update->id          = $this->id;
        $update->slug        = $this->slug;
        $update->new_version = $this->version;
        $update->url         = $this->homepage;
        $update->package     = $this->download_url;
        if (! empty($this->upgrade_notice)) {
            $update->upgrade_notice = $this->upgrade_notice;
        }

        return $update;
    }
}
