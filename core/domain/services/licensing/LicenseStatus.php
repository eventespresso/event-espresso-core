<?php

namespace EventEspresso\core\domain\services\licensing;

class LicenseStatus
{
    public static function statusNotice(?string $license_status): string
    {
        if (empty($license_status)) {
            return "<span class='ee-status-pill'></span>";
        }
        $class = self::statusClass($license_status);
        $icon = self::statusIcon($license_status);
        $notice = self::statusMessage($license_status);
        return "<span class='ee-status-pill ee-status-bg--$class'><span class='ee-license-status'>$notice</span>&nbsp;&nbsp;<span class='dashicons dashicons-$icon'></span></span>";
    }

    public static function statusMessages(): array
    {
        return [
            "deactivated"           => esc_html__("license key deactivated", 'event_espresso'),
            "disabled"              => esc_html__("license key revoked", 'event_espresso'),
            "expired"               => esc_html__("license has expired", 'event_espresso'),
            "inactive"              => esc_html__("inactive license key", 'event_espresso'),
            "invalid"               => esc_html__("invalid license key", 'event_espresso'),
            "invalid_item_id"       => esc_html__("invalid item ID", 'event_espresso'),
            "item_name_mismatch"    => esc_html__("invalid license for plugin", 'event_espresso'),
            "key_mismatch"          => esc_html__("invalid license for plugin", 'event_espresso'),
            "license_not_activable" => esc_html__("attempting to activate a bundle's parent license", 'event_espresso'),
            "missing"               => esc_html__("no license found", 'event_espresso'),
            "missing_url"           => esc_html__("site URL not found", 'event_espresso'),
            "no_activations_left"   => esc_html__("no activations left", 'event_espresso'),
            "site_inactive"         => esc_html__("site is not active for this license", 'event_espresso'),
            "valid"                 => esc_html__("valid license key", 'event_espresso'),
        ];
    }

    public static function statusMessage(?string $license_status): string
    {
        $license_statuses = self::statusMessages();
        return $license_statuses[ $license_status ] ?? esc_html__("An unknown error occurred", 'event_espresso');
    }


    public static function statusClass(?string $license_status): string
    {
        switch ($license_status) {
            case "valid":
                return "active";

            case "deactivated":
            case "expired":
            case "inactive":
            case "site_inactive":
                return "inactive";

            case "no_activations_left":
                return "attention";

            case "disabled":
            case "revoked":
            case "invalid":
            case "item_name_mismatch":
            case "missing":
            default:
                return "error";
        }
    }


    public static function statusIcon(?string $license_status): string
    {
        switch ($license_status) {
            case "valid":
                return "yes-alt";

            case "expired":
            case "site_inactive":
                return "clock";

            case "disabled":
            case "revoked":
            case "invalid":
            case "item_name_mismatch":
            case "no_activations_left":
                return "warning";

            case "missing":
            default:
                return "editor-help";
        }
    }
}
