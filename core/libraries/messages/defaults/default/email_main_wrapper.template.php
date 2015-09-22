<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<!-- If you delete this meta tag, Half Life 3 will never be released. -->
	<meta name="viewport" content="width=device-width" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<!-- Facebook sharing information tags -->
	<meta property="og:title" content="<?php echo $subject; ?>" />
	<title><?php echo $subject; ?></title>
	<?php do_action( 'AHEE__EE_Email_Messenger_main_wrapper_template_head', $message_type, $subject, $from, $main_body ); ?>
</head>
<?php do_action( 'AHEE__EE_Email_Messenger_main_wrapper_template_header', $message_type, $subject, $from, $main_body ); ?>
<body bgcolor="#FFFFFF" topmargin="0" leftmargin="0" marginheight="0" marginwidth="0">
<?php do_action( 'AHEE__EE_Email_Messenger_main_wrapper_template_before_main_body', $message_type, $subject, $from, $main_body ); ?>
<?php echo $main_body; ?>
<?php do_action( 'AHEE__EE_Email_Messenger_main_wrapper_template_after_main_body', $message_type, $subject, $from, $main_body ); ?>
</body>
<?php do_action( 'AHEE__EE_Email_Messenger_main_wrapper_template_footer', $message_type, $subject, $from, $main_body ); ?>
</html>