<h1>Welcome to the Pretend Offsite Page.</h1>
<p>This page is actually hosted locally, just not accessed through Wordpress (it's a static php file).</p>
<p>If you are making your own offsite payment gateway integration you obviously dont need this file and should delete it.</p>
<form method="post" action="<?php echo $_REQUEST['return_url'];?>">
	<label for='status'>Payment Status</label>
	<select id='status' name='status'>
		<option value='PAP'>Approved</option>
		<option value='PPN'>Pending</option>
		<option value='PCN'>Cancelled</option>
		<option value='PDC'>Declined</option>
		<option value='PFL'>Failed</option>
	</select><br>
	<label for='gateway_txn_id'>Gateway Transaction ID</label>
	<input id='gateway_txn_id' name='gateway_txn_id' value='<?php echo $_REQUEST['gateway_txn_id'];?>'><br>
	<button>Return Event Espresso</button> (<?php echo $_REQUEST['return_url'];?>)
</form>