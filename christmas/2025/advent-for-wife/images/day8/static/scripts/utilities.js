// Float comparisson function
function floatsAreEqual(a, b, treshold){
    return Math.abs(a - b) <= treshold;
}

function getUrlParameter(sParam, default_value){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }

    return default_value;
}