<h1>Welcome to the Pretend Offsite Page.</h1>
<p>This page is actually hosted locally, just not accessed through Wordpress (it's a static php file).</p>
<p>If you are making your own offsite payment gateway integration you obviously dont need this file and should delete it.</p>
<?php if( $_REQUEST[ 'uses_separate_IPN_request' ] ) {
	//they setup the payment method to use separate IPNs, so allow them to send an IPN and then return separately
	$form_url = $_REQUEST[ 'ipn_url'];
	$return_url = $_REQUEST[ 'return_url' ];
} else {
	//they setup the payment to NOT use separate IPN, so just provide the option to send payment data and return together
	$form_url = $return_url = $_REQUEST[ 'return_url' ];
}
?>
<form method="post" action="<?php echo $form_url;?>">
	<label for='status'>Payment Status</label>
	<select id='status' name='status'>
		<option value='PAP'>Approved</option>
		<option value='PPN'>Pending</option>
		<option value='PCN'>Cancelled</option>
		<option value='PDC'>Declined</option>
		<option value='PFL'>Failed</option>
	</select><br>
	<input id='gateway_txn_id' name='gateway_txn_id' type='hidden' value='<?php echo $_REQUEST['gateway_txn_id'];?>'><br>
	<?php if( $_REQUEST[ 'uses_separate_IPN_request' ] ) {?>
	<button>Send IPN Now</button> (then press back in your browser and return to this page, and then <a href='<?php echo $return_url;?>'>Return to Event Espresso to view your transaction</a>)
	<?php } else { ?>
		<button>Make payment and return to Event Espresso</button>																		 
	<?php } ?>
</form>