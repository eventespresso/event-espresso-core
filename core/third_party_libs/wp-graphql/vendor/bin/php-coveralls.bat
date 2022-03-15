@ECHO OFF
setlocal DISABLEDELAYEDEXPANSION
SET BIN_TARGET=%~dp0/../simpod/php-coveralls-mirror/bin/php-coveralls
php "%BIN_TARGET%" %*
