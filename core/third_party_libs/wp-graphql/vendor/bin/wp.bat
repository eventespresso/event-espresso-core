@ECHO OFF
setlocal DISABLEDELAYEDEXPANSION
SET BIN_TARGET=%~dp0/../wp-cli/wp-cli/bin/wp
sh "%BIN_TARGET%" %*
