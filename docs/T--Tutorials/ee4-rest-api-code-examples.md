# EE4 REST API Code Samples

Wanting to use the EE4 REST API included in EE4 since version 4.8.29? Here are some simple code snippets that you can use from sites NOT running Event Espresso 4 or Wordpress to fetch and display event data FROM your Event Espresso site.

The code for both these samples as part of the [EE4 JSON REST API Client repository](https://github.com/eventespresso/eea-rest-api-client), in the ["standalone-scripts" folder](https://github.com/eventespresso/eea-rest-api-client/tree/master/standalone-scripts).

## Display Upcoming Events Snippet using PHP

The first example is server-side PHP code that can be run from anywhere. The only requirement is that the PHP function `file_get_contents` needs to work on the server. It fetches the list of upcoming events and displays some select information from them.

```php
<?php
//this script is meant to be ran outside of WP


$curdate_utc = date("Y-m-d H:i:s");

//Retrieve the upcoming events and their related datetimes
$data_url = "https://demoee.org/use-cases/wp-json/ee/v4.8.36/events?calculate=image_medium_large&include=Datetime&where[Datetime.DTT_EVT_end][]=>&where[Datetime.DTT_EVT_end][]=" . urlencode($curdate_utc);

$json = file_get_contents($data_url, true); //getting the file content
$events = json_decode($json, true); //getting the file content as array
$count = count( $events ); //counting the number of results

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>EE4 JSON REST API - Upcoming Events</title>
</head>

<body>
<h1>Upcoming Events</h1>
<div id="events">
<?php
if ($count > 0){
 foreach ($events as $event){
 echo '<div class="event">';
 $featured_image_url = $event['_calculated_fields']['image_medium_large']['url'];
 echo $featured_image_url ? '<a href="' . $event['link'] . '"><img src="' . $featured_image_url . '" /></a>' : '';
 echo '<a href="' . $event[ 'link' ] . '">' . $event[ 'EVT_name' ] . '</a><ul>';
 $i = 0;
 foreach( $event[ 'datetimes' ] as $datetime ) {
 echo '<li>' . date( 'l, jS \o\f F Y \a\t h:i a',strtotime( $event[ 'datetimes' ][ $i ][ 'DTT_EVT_start' ] ) ).'</li>';
 $i++;
 }
 echo '</ul></div>';
 }
}
?>
</div>
<div id="footer"><p>Showing <strong><?php echo $count ?></strong> events, that start after <strong><?php echo date('l jS \o\f F Y h:i:s A', strtotime($curdate_utc)) ?> UTC</strong>, using this url:<br />
<a href="<?php echo $data_url ?>" target="_blank" rel="noopener noreferrer"><?php echo $data_url ?></a></p>
</body>
</html>
```



## Display Events in a Calendar using Javascript

This next example can be run from any site as it only uses javascript.

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<link rel='stylesheet' type='text/css' href='ee-events-calendar-includes/cupertino/jquery-ui.min.css' />
<meta charset='utf-8' />
<link href='ee-events-calendar-includes/fullcalendar.min.css' rel='stylesheet' />
<link href='ee-events-calendar-includes/fullcalendar.print.css' rel='stylesheet' media='print' />
<script src='ee-events-calendar-includes/moment.min.js'></script>
<script src='ee-events-calendar-includes/jquery.min.js'></script>
<script src='ee-events-calendar-includes/fullcalendar.min.js'></script>
<script type="text/javascript">

  $(document).ready(function() {

		$('#calendar').fullCalendar({
			events: function( start, end, timezone, callback ){
				var objectdata = {
                        where:{
                            'Datetime.DTT_EVT_end':[
                                '>',start.format()
                            ],
                            'Datetime.DTT_EVT_start':[
                                '<', end.format()
                            ]
                        },
						"include": 'Datetime.*'
					};
				$.ajax({
					url: 'https://demoee.org/use-cases/wp-json/ee/v4.8.29/events',
					dataType: 'json',
//					crossDomain:true,
//					mimeType:'json',
					data: objectdata ,
					success: function(doc) {
						var events = [];
						$(doc).each(function() {
							//only add events to the calendar if they have a datetime (they all should)
							if( this.datetimes[0] ){
								events.push({
									title: this.EVT_name,
									start: this.datetimes[0].DTT_EVT_start // will be parsed
								});
							}
						});
						callback(events);
					},
					error: function( xhr, status, error ) {
						alert('error communicating with server ' + status );
					}
				});
			},
			theme: true,
			cache: false,
			lazyFetching: true,
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			loading: function(bool) {
				if (bool) $('#loading').show();
				else $('#loading').hide();
			}

		});

	});

</script>
<style type='text/css'>

	body {
		margin-top: 40px;
		text-align: center;
		font-size: 14px;
		font-family: "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
		}

	#loading {
		position: absolute;
		top: 5px;
		right: 5px;
		}

	#calendar {
		width: 900px;
		margin: 0 auto;
		}


</style>
</head>
<body>
<div id='loading' style='display:none'>loading...</div>
<div id='calendar'></div>
<p>This page is using the Event Espresso API</p>

<p>If you are making a request from a different domain, you will probably need to <a href='https://github.com/thenbrent/WP-API-CORS/blob/master/wp-api-cors.php'>install and activate the WP API CORS addon</a>, which is however currently in BETA.</p>
</body>
</html>
```


As you can see, this example using the [FullCalendar library](http://fullcalendar.io/) for displaying the calendar, which itself requires [jQuery](https://jquery.com/) and [moment.js](http://momentjs.com/). It simply initializes the calendar, and fetches event data from the EE4 JSON REST API in order to populate the calendar. Note this is just a sample usage of the EE4 JSON REST API, it is by no means a replacement for the [EE4 Calendar Addon](https://eventespresso.com/product/ee4-events-calendar/).

However, the server that is running the EE4 JSON REST API will probably also need to be using the [WP API CORS addon](https://github.com/thenbrent/WP-API-CORS), which isn't currently ready for use on live sites.

## Conclusion

You may also be interested in the tutorial on how to create an addon that uses [Angular.js to fetch data from the EE4 JSON REST API](building-an-ee4-addon-that-uses-angular-js-and-the-ee4-json-rest-api.md).

Hopefully these two simple examples give you an idea of how to use the EE4 JSON REST API. If you'd like to submit another example, please open a [pull request on the EE4 JSON REST API Client repository](https://github.com/eventespresso/eea-rest-api-client).

For more detailed information, please refer to our [EE4 REST API documentation](../C--REST-API).