<?php
  
if (isset($_GET['transaction_id'])) {
  /*
	Via report.php heeft Mollie de betaling al gemeld, en in dat script heeft bij Mollie gecontroleerd 
	wat de betaalstatus is. Deze betaalstatus is in report.php ergens opgeslagen in het systeem (bijv. 
	in de database).
   
	De klant komt bij dit script terug na de betaling. Hier kan dan met behulp van het 'transaction_id' 
	de status van de betaling uit de database gehaald worden en de klant de relevante informatie tonen.
  */

  echo 'Bedankt voor uw betaling.';
}
else {
  echo 'Er is geen transaction_id meegegeven.';   
}

