var username = localStorage.getItem('userID');
var password = localStorage.getItem('password');
/*---history ---*/
$(function (){ 
//Requesting data using jQuery 
var $history = $('#history'); //Id of html div

    
   if ( (username != 'jorass') && (username != 'ervtod') && (username != 'hirchr') && (username != 'saksru') && (username != 'svetor')) {
       
         document.getElementById('admin_buttons').style.visibility = 'hidden';
        
         
     }

   
$.ajax({
	method: 'GET',
	url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + username + '&password=' + password + '&action=purchases_get',

success: function(history) {
      $(function() {
        $.ajax({
  
	method: 'GET',
	url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + username + '&password=' + password + '&action=iou_get',

success: function(main) {
    var first_name = main.payload[0].first_name;
    var last_name = main.payload[0].last_name;
     document.querySelector('.login_id').innerHTML = first_name +" "+ last_name;
    
    
}
        });
    });
//console.log(history);

//loop for all indices of array payload
$.each(history.payload, function(i, his)
{
$history.append('<div class="row">' +
 			'<div class="col">'+ his.timestamp +'</div> ' +
 			'<div class="col">'+ his.namn +'</div> ' +  	
 			'<div class="col">'+ his.price +'</div> ' + 
			'</div> '); 
  });
}
});
});
