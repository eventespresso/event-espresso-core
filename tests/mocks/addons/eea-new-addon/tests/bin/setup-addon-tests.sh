#!/usr/bin/env bash

## if there is a BUILD_BRANCH build environment variable then we use that for what branch of
## ee core to checkout, otherwise master.
if [ -n "$RELEASE_BUILD" ]; then
    CORE_TAG=$RELEASE_BUILD
else
    CORE_TAG="master"
fi

# EE_VERSION is used in travis and should override what may be set for CORE_TAG
if [ -n "$EE_VERSION" ]; then
    CORE_TAG=$EE_VERSION
fi

#Make sure directory vars are set
if [ -z "$plugin_loc" ]; then
    EE_TESTS_DIR="/tmp/event-espresso-core/tests"
fi

if [ -z "$event_espresso_core_dir" ]; then
    event_espresso_core_dir="/tmp/event-espresso-core"
fi

# commands taking care of WordPress setup
function wpCoreSetup {
    ## only run this is in circle env.
    if [ -z "$CIRCLE_ENV" ]; then
        return
    fi
    git clone git://develop.git.wordpress.org/ $WP_CORE_DIR
    cd $WP_CORE_DIR
    cp wp-tests-config-sample.php wp-tests-config.php
    sed -i "s/youremptytestdbnamehere/wordpress_test/" wp-tests-config.php
    sed -i "s/yourusernamehere/root/" wp-tests-config.php
    sed -i "s/yourpasswordhere//" wp-tests-config.php
}

# commands taking care of ee core setup
# receives an argument indicating what branch to checkout.
function eeCoreSetup {
    local BRANCH=$1
    git clone https://github.com/eventespresso/event-espresso-core.git $event_espresso_core_dir
    cd $event_espresso_core_dir/tests
    if [ "$BRANCH" = "master" ]; then
        git checkout master
    else
        git fetch --tags
        git checkout tags/$BRANCH -b $BRANCH
    fi
    #back to previous directory
    cd -
    echo "Building against EE core" $BRANCH
}

# commands taking care of addon setup
function addOnSetup {
    ## only run this is in circle env.
    if [ -z "$CIRCLE_ENV" ]; then
        return
    fi
    mv $plugin_loc $plugin_dir
}

# commands taking care of creating the WordPress test db.
function createDB {
    ## only run this is in circle env.
    if [ -z "$CIRCLE_ENV" ]; then
        return
    fi
    mysql -e 'CREATE DATABASE wordpress_test;' -uroot;
}

# commands taking care of setting up phpunit
function setupPhpUnit {
    ## no need to setup if not on circle
    if [ -z "$CIRCLE_ENV" ]; then
        return
    fi
    wget --no-check-certificate https://phar.phpunit.de/phpunit-old.phar
    chmod +x phpunit-old.phar
    mv phpunit-old.phar /home/ubuntu/.phpenv/shims/phpunit
}

wpCoreSetup
eeCoreSetup $CORE_TAG
addOnSetup
createDB
setupPhpUnit