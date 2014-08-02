#!/bin/bash
TARGETDIR="${basedir}/wordpress-develop/src/wp-content/plugins"
mkdir $TARGETDIR/EE4
for file in *
do test "$file" != "wordpress-develop" && cp -r "$file" "$TARGETDIR/EE4/"
done
