<?php
$name = "hello.ical";
$output = "Hello World!";
if (ob_get_length())
	$this->Error('Some data has already been output, can\'t send PDF file');
header('Content-Type: application/x-download');
if (headers_sent())
	$this->Error('Some data has already been output, can\'t send PDF file');
header('Content-Length: ' . strlen($output));
header('Content-Disposition: attachment; filename="' . $name . '"');
header('Cache-Control: private, max-age=0, must-revalidate');
header('Pragma: public');
header('Content-Type: application/octet-stream');
header('Content-Type: application/force-download');
header('Content-type: application/pdf');
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Content-Transfer-Encoding: binary");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
ini_set('zlib.output_compression', '0');
echo $output;
die();
?>
