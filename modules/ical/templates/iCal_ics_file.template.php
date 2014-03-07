<?php
header('Content-type: text/calendar; charset=utf-8');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Cache-Control: private, max-age=0, must-revalidate');
header('Pragma: public');
header('Content-Type: application/octet-stream');
header('Content-Type: application/force-download');
header('Cache-Control: no-cache, must-revalidate'); 
header('Content-Transfer-Encoding: binary');
header('Expires: Sat, 26 Jul 1997 05:00:00 GMT'); // Date in the past
ini_set('zlib.output_compression', '0');
?>
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//<?php echo $organizer; ?>//NONSGML PDA Calendar Version 1.0//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:<?php echo $UID; ?>
ORGANIZER:MAILTO: <?php echo $org_email ?>
DTSTAMP:<?php echo $timestamp; //  dateToCal(time())?>
LOCATION:<?php echo $location // escapeString($address) ?>
SUMMARY:<?php echo $location // escapeString($summary) ?>
DESCRIPTION:<?php echo $location // escapeString($description) ?>
STATUS:<?php echo $status; ?>
CATEGORIES:<?php echo $categories; ?>
URL;VALUE=URI:<?php echo $url // escapeString($uri) ?>
DTSTART:<?php echo $dtt_start // dateToCal($datestart) ?>
DTEND:<?php echo $dtt_end // dateToCal($dateend) ?>
END:VEVENT
END:VCALENDAR