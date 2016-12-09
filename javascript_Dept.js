$(function (){ 
//Requesting data using jQuery 
var $dept = $('#dept'); //Id of html div
var username = 'jorass';
var password = 'jorass';
$.ajax({
	method: 'GET',
	url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + username + '&password=' + password + '&action=iou_get',

success: function(dept) {
console.log(dept);

//loop for all indices of array payload
$.each(dept.payload, function(i, asset)
{
	if (asset.assets < 0) {
		$dept.append('<div>You\'re dept is: '+ asset.assets +'</div> ');
	}
	else {
		$dept.append('<div>Congrats!! You don\'t have any dept</div> ');
	};
 
  });

}
});

//---------------------------- Dept View on Click ---------------------//
var viewDept = ("#viewDept");
$(viewDept).click(function () {
  $($dept).slideToggle();
});


})