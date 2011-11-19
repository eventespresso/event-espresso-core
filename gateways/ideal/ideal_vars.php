<?php
global $org_options, $wpdb;
$ideal_mollie_settings = get_option( 'event_espresso_ideal_mollie_settings' );

require_once('ideal.class.php');

if (!isset($attendee_id))
	$attendee_id= $_GET['id'];

$partner_id  = $ideal_mollie_settings['ideal_mollie_partner_id']; // Uw mollie partner ID

$return_url  = home_url().'/?page_id='.$org_options['return_url'].'&id='.$attendee_id; // URL waarnaar de consument teruggestuurd wordt na de betaling
$report_url  = home_url().'/?page_id='.$org_options['notify_url'].'&id='.$attendee_id.'&event_id='.$event_id.'&attendee_action=post_payment&form_action=payment&ideal=1'; // URL die Mollie aanvraagt (op de achtergrond) na de betaling om de status naar op te sturen

//Find the correct amount so that unsavory characters don't change it in the previous form
$sql = "SELECT ea.amount_pd, ed.event_name FROM " . EVENTS_ATTENDEE_TABLE . " ea ";
$sql .= "JOIN " . EVENTS_DETAIL_TABLE . " ed ";
$sql .= "ON ed.id = ea.event_id ";
$sql .= " WHERE registration_id = '" . espresso_registration_id( $attendee_id ) . "' ";
$sql .= " ORDER BY ea.id ASC LIMIT 1";

$r = $wpdb->get_row($sql);

if (!$r || $wpdb->num_rows == 0){

	exit("Looks like something went wrong.  Please try again or notify the website administrator.");

}
//amount needs to be in cents 
$amount	  = (int) ($r->amount_pd * 100);	// Het af te rekenen bedrag in centen (!!!)
$description = stripslashes_deep( $r->event_name ); // Beschrijving die consument op zijn/haar afschrift ziet.

//if (!in_array('ssl', stream_get_transports()))
//{
//	echo "<h1>Foutmelding</h1>";
//	echo "<p>Uw PHP installatie heeft geen SSL ondersteuning. SSL is nodig voor de communicatie met de Mollie iDEAL API.</p>";
//	exit;	
//}

$iDEAL = new iDEAL_Payment ($partner_id);

if ($ideal_mollie_settings['ideal_mollie_use_sandbox'] == 1)
	$iDEAL->setTestMode();

if (isset($_POST['bank_id']) and !empty($_POST['bank_id'])) 
{
	if ($iDEAL->createPayment($_POST['bank_id'], $amount, $description, $return_url, $report_url)) 
	{
		/* Hier kunt u de aangemaakte betaling opslaan in uw database, bijv. met het unieke transactie_id
		   Het transactie_id kunt u aanvragen door $iDEAL->getTransactionId() te gebruiken. Hierna wordt 
		   de consument automatisch doorgestuurd naar de gekozen bank. */
		
		header("Location: " . $iDEAL->getBankURL());
		exit;	
	}
	else 
	{
		/* Er is iets mis gegaan bij het aanmaken bij de betaling. U kunt meer informatie 
		   vinden over waarom het mis is gegaan door $iDEAL->getErrorMessage() en/of 
		   $iDEAL->getErrorCode() te gebruiken. */
		
		echo '<p>De betaling kon niet aangemaakt worden.</p>';
		
		echo '<p><strong>Foutmelding:</strong> ', $iDEAL->getErrorMessage(), '</p>';
		exit;
	}
}
elseif(isset($_POST['bank_id']) && $_POST['bank_id'] == '')
{
	echo "<p>" . __("Please use your browser's back button and select a bank.", 'event_espresso');
	exit;

}


/*
  Hier worden de mogelijke banken opgehaald en getoont aan de consument.
*/

$bank_array = $iDEAL->getBanks();

if ($bank_array == false)
{
	echo '<p>Er is een fout opgetreden bij het ophalen van de banklijst: ', $iDEAL->getErrorMessage(), '</p>';
	exit;
}

?>
<div class="event-display-boxes">
<form id="ideal-mollie-form" class="ee-forms" method="post" action="<?php echo home_url() . '/?page_id=' . $org_options['notify_url']; ?>">
	<select name="bank_id" class="required">
		<option value=''>Kies uw bank</option>
		
<?php foreach ($bank_array as $bank_id => $bank_name) { ?>
		<option value="<?php echo $bank_id ?>"><?php echo $bank_name ?></option>
<?php } ?>

	</select>
	<input name="amount" type="hidden" value="<?php echo $amount; ?>" />
	<input name="ideal" type="hidden" value="1" />
	<input name="id" type="hidden" value="<?php echo $attendee_id; ?>" />
	<input type="submit" class="btn_event_form_submit payment-submit ui-priority-primary ui-state-default ui-state-hover ui-state-focus ui-corner-all" name="submit" value="Betaal via iDEAL" />
</form>
</div>