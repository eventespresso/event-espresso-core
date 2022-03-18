#!/bin/bash
#
# Generate WooCommerce stubs.
#

###
### Ready-to-use stubs: https://github.com/php-stubs/woocommerce-stubs
###

PLUGIN_VERSION="3.7.0"

GENERATE_STUBS_COMMAND="vendor/bin/generate-stubs"

Get_legacy_classes()
{
    cat <<"EOF"
class WC_API_Authentication
class WC_API_Coupons
class WC_API_Customers
class WC_API_Exception
class WC_API_JSON_Handler
class WC_API_Orders
class WC_API_Products
class WC_API_Reports
class WC_API_Resource
class WC_API_Server
class WC_API_Webhooks
interface WC_API_Handler
EOF
}

Get_legacy_files()
{
    # Class files
    while read -r CLASS; do
        grep -r -l "^${CLASS}"
    done < <(Get_legacy_classes)
}

Get_problematic_files()
{
    # Globals
    echo "includes/shipping/flat-rate/includes/settings-flat-rate.php"
    echo "includes/shipping/legacy-flat-rate/includes/settings-flat-rate.php"
    # WP-CLI
    echo "includes/libraries/action-scheduler/classes/ActionScheduler_WPCLI_Scheduler_command.php"
}

# Check plugin
if ! grep -q 'Plugin Name:\s\+WooCommerce' ./woocommerce.php 2>/dev/null; then
    echo "Please extract WooCommerce into the current directory!" 1>&2
    echo "wget https://downloads.wordpress.org/plugin/woocommerce.${PLUGIN_VERSION}.zip && unzip woocommerce.${PLUGIN_VERSION}.zip" 1>&2
    exit 10
fi

# Delete files
Get_legacy_files | sort -u | grep '^includes/legacy/api/v[12]/' | xargs -r -- rm -v
Get_problematic_files | xargs -r -- rm -v

# Generate stubs
if hash generate-stubs 2>/dev/null; then
    GENERATE_STUBS_COMMAND="generate-stubs"
elif hash generate-stubs.phar 2>/dev/null; then
    GENERATE_STUBS_COMMAND="generate-stubs.phar"
elif [ ! -x vendor/bin/generate-stubs ]; then
    composer require --no-interaction --update-no-dev --prefer-dist giacocorsiglia/stubs-generator
fi
"$GENERATE_STUBS_COMMAND" --functions --classes --interfaces --traits --out=woocommerce-stubs-${PLUGIN_VERSION}.php \
    ./woocommerce.php ./includes/ ./packages/*/src/
