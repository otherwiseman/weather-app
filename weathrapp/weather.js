var baseYahooURL = "https://query.yahooapis.com/v1/public/yql?q="
var selectedCity = "95616";
var placeholder = "";
var unit = "f"
init();

function init(){
    getIDfromZip(selectedCity);

    $('#zip').keypress(function(event) {
    	if ( event.which == 13 ) { /* 13 tells jquery its the enter key*/
	    selectedCity =  $('#zip').val();
	    getIDfromZip(selectedCity);
	    $('#zip').blur();
	  }
	});

	$('#btn').click(function() {
	  if($('#btn').html() == "F")
	  {
	  	unit = "c";
	  }
	  else unit = "f";
	  $('#btn').html(unit.toUpperCase());
	  getIDfromZip(selectedCity);
	})

	$('#zip').focus(function(event) {
		placeholder = $("#zip").val();
		$("#zip").val("");
	});

	$('#zip').blur(function(event) {
		if($("#zip").val() == "")
		{
		    $("#zip").val(placeholder);
		}
	});
}

function getIDfromZip(zip){
	var woeidYQL = 'select woeid from geo.placefinder where text="'+ zip +'"&format=json';
	var jsonURL = baseYahooURL + woeidYQL;
	$.getJSON(jsonURL, IDfromZip);
}

function IDfromZip(data){
	var woeid = null;
	if(data.query.count <= 0)
	{
		$('#zip').val("No city found");
		$('#deg').html("");
		$('#condition').html("");
		changeImage(999, $("#big")[0]);
		for(var i = 0; i <= 3;i++)
		{
			$('#forecast'+i).html("");
			changeImage(999, $("#forecastimg" + i)[0]);
			$('#forecastdeg' + i).html("");
			$('#forecastcondition' + i).html("");
		}
		return;
	}
	else if(data.query.count == 1){
		woeid = data.query.results.Result.woeid;
	}
	else
	{
		woeid = data.query.results.Result[0].woeid;
	}
	getWeatherInfo(woeid);
}

function getWeatherInfo(woeid){
 var weatherYQL = 'select * from weather.forecast where woeid=' + woeid + ' and u = "'+unit+'" &format=json';
 var jsonURL = baseYahooURL + weatherYQL
 $.getJSON(jsonURL, callbackWeather);
}

function callbackWeather(data){
	$('#zip').val(data.query.results.channel.location.city);
	$('#deg').html(data.query.results.channel.item.condition.temp + "°" + unit.toUpperCase());
	$('#condition').html(data.query.results.channel.item.condition.text);
	changeImage(data.query.results.channel.item.condition.code, $('#big')[0]);
	for(var i = 0; i <= 3;i++)
	{
		var fc = data.query.results.channel.item.forecast[i];
		$('#forecast'+i).html(fc.day);
		changeImage(fc.code, $("#forecastimg" + i)[0]);
		$('#forecastdeg' + i).html((parseInt(fc.low) + parseInt(fc.high)) / 2 + " °" + unit.toUpperCase());
		$('#forecastcondition' + i).html(fc.text);
	}
}

function changeImage(code, image){
	image.src = "http://student.howest.be/enzo.eghermanne/codepen/";
	switch(parseInt(code))
	{
		case 0:
			image.src += "images/icons/Tornado.svg"
			break;
		case 1:
			image.src += "images/icons/Cloud-Lightning.svg"
			break;
		case 2:
			image.src += "images/icons/Wind.svg"
			break;
		case 3:
			image.src += "images/icons/Cloud-Lightning.svg"
			break;
		case 4:
			image.src += "images/icons/Cloud-Lightning.svg"
			break;
		case 5:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 6:
			image.src += "images/icons/Cloud-Rain-Alt.svg"
			break;
		case 7:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 8:
			image.src += "images/icons/Cloud-Drizzle-Alt.svg"
			break;
		case 9:
			image.src += "images/icons/Cloud-Drizzle-Alt.svg"
			break;
		case 10:
			image.src += "images/icons/Cloud-Drizzle-Alt.svg"
			break;
		case 11:
			image.src += "images/icons/Cloud-Drizzle-Alt.svg"
			break;
		case 12:
			image.src += "images/icons/Cloud-Drizzle-Alt.svg"
			break;
		case 13:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 14:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 15:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 16:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 17:
			image.src += "images/icons/Cloud-Hail-Alt.svg"
			break;
		case 18:
			image.src += "images/icons/Cloud-Hail-Alt.svg"
			break;
		case 19:
			image.src += "images/icons/Cloud-Hail-Alt.svg"
			break;
		case 20:
			image.src += "images/icons/Cloud-Fog.svg"
			break;
		case 21:
			image.src += "images/icons/Cloud-Fog.svg"
			break;
		case 22:
			image.src += "images/icons/Cloud-Fog.svg"
			break;
		case 23:
			image.src += "images/icons/Cloud-Fog.svg"
			break;
		case 24:
			image.src += "images/icons/Wind.svg"
			break;
		case 25:
			image.src += "images/icons/Thermometer-Zero"
			break;
		case 26:
			image.src += "images/icons/Cloud.svg"
			break;
		case 27:
			image.src += "images/icons/Cloud-Moon.svg"
			break;
		case 28:
			image.src += "images/icons/Cloud.svg"
			break;
		case 29:
			image.src += "images/icons/Cloud-Moon.svg"
			break;
		case 30:
			image.src += "images/icons/Cloud-Sun.svg"
			break;
		case 31:
			image.src += "images/icons/Moon.svg"
			break;
		case 32:
			image.src += "images/icons/Sun.svg"
			break;
		case 33:
			image.src += "images/icons/Moon.svg"
			break;
		case 34:
			image.src += "images/icons/Sun.svg"
			break;
		case 35:
			image.src += "images/icons/Cloud-Hail-Alt.svg"
			break;
		case 36:
			image.src += "images/icons/Sun.svg"
			break;
		case 37:
			image.src += "images/icons/Cloud-Lightning.svg"
			break;
		case 38:
			image.src += "images/icons/Cloud-Lightning.svg"
			break;
		case 39:
			image.src += "images/icons/Cloud-Lightning.svg"
			break;
		case 40:
			image.src += "images/icons/Cloud-Rain.svg"
			break;
		case 41:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 42:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 43:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 44:
			image.src += "images/icons/Cloud.svg"
			break;
		case 45:
			image.src += "images/icons/Cloud-Lightning.svg"
			break;
		case 46:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 47:
			image.src += "images/icons/Cloud-Lightning.svg"
			break;
		case 3200:
			image.src += "images/icons/Moon-New.svg"
			break;
		case 999:
			image.src += "images/icons/Compass.svg"
			break;
		default:
			image.src += "images/icons/Moon-New.svg"
			break;
	}
}