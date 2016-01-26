// reg admin registrations reports.
google.charts.load('current', {'packages':['corechart', 'bar']});
google.charts.setOnLoadCallback(drawVisualization);

function drawVisualization() {
    regPerEventReport();
    regPerDayReport();
}



function regPerEventReport() {
    if ( regPerEvent.noResults ) {
        document.getElementById(regPerEvent.id).innerHTML = regPerEvent.noRegsMsg;
    } else {
        var data = google.visualization.arrayToDataTable( regPerEvent.regs );
        var options = {
            legend: { position: 'none' },
            chart: {
                title: regPerEvent.title,
                subtitle: regPerEvent.subtitle
            }
        }
        var chart = new google.charts.Bar( document.getElementById( regPerEvent.id ) );
        chart.draw( data, google.charts.Bar.convertOptions( options ) );
    }
}

function regPerDayReport() {
    if ( regPerDay.noResults ) {
        document.getElementById(regPerDay.id).innerHTML = regPerDay.noRegsMsg;
    } else {
        var data = google.visualization.arrayToDataTable( regPerDay.regs );
        var options = {
            legend: { position: 'none' },
            chart: {
                title: regPerDay.title,
                subtitle: regPerDay.subtitle
            }
        }
        var chart = new google.charts.Bar( document.getElementById( regPerDay.id ) );
        chart.draw( data, google.charts.Bar.convertOptions( options ) );
    }
}