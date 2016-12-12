$(function (){ 
//Requesting data using jQuery 
var $inventory = $('#inventory'); //Id of html div
var $stock = $('#stock');
var username = localStorage.getItem('username');
var password = localStorage.getItem('password');
     if (username == 'jorass' || username == 'ervtod' || username == 'hirchr' || username == 'saksru' || 
            username == 'svetor') {
         $('bev_admin').show();
         $('users_admin').show();
         
     };
var sum = 0;
$.ajax({
	method: 'GET',
	url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + username + '&password=' + password + '&action=inventory_get',

success: function(inventory) {

	var BevStock = localStorage.getItem("count").split(',');
    var BevPrice = localStorage.getItem("prices").split(',');
    var BevName = localStorage.getItem("names").split(',');
    var NonAlcName = localStorage.getItem("NoAlcName").split(',');
    var NonAlcStock = localStorage.getItem("NoAlcStock").split(',');
    var NonAlcPrice = localStorage.getItem("NoAlcPrices").split(',');
    var beer_count = 0;
    var NonAlc_count = 0;
//loop for all indices of array payload
$.each(inventory.payload, function(i, inv)
{
	if (inv.namn != '' && inv.price != '' && inv.count >= 0)
	{
	$inventory.append('<div id="beer_id" class="' + inv.beer_id + '" value="' + inv.beer_id + '">'+ 
					  '<div id="name" value="' + inv.namn + '">' + inv.namn + '</div>' +
					  '<div id="count" value="' + inv.count + '">(' + inv.count + ')</div>' +
					  '<div id="price" value="' + inv.price + '">' + inv.price + ' :-</div></div>');
	}

	//Vendor List
 	     if ( (BevStock[i] <200 && BevStock[i] > 0) && (BevName[i]!= "")  && (beer_count < 17)) {

        	 if (BevStock[i] > 10) {
             BevStock[i] = 10;
             }

         	$stock.append('<div id="beer_id" class=" value="' + inv.beer_id + '">'+ 
					  '<div id="name" value="' + BevName[i] + '">' + BevName[i] + '</div>' +
					  '<div id="count" value="' + BevStock[i] + '">(' + BevStock[i] + ')</div>' +
					  '<div id="price" value="' + BevPrice[i] + '">' + BevPrice[i] + ' :-</div></div>');

         	beer_count++;
		}

		if (NonAlc_count < 3){
        	if (NonAlcStock[i] > 10) {
            NonAlcStock[i] = 10;
        	}

        	$stock.append('<div id="beer_id" value="' + inv.beer_id + '">'+ 
					  '<div id="name" value="' + NonAlcName[i] + '">' + NonAlcName[i] + '</div>' +
					  '<div id="count" value="' + NonAlcStock[i] + '">(' + NonAlcStock[i] + ')</div>' +
					  '<div id="price" value="' + NonAlcPrice[i] + '">' + NonAlcPrice[i] + ' :-</div></div>');

        	NonAlc_count++;
        }
  });

    $.ajax({
  
	method: 'GET',
	url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + username + '&password=' + password + '&action=iou_get',

success: function(main) {
    var first_name = main.payload[0].first_name;
    var last_name = main.payload[0].last_name;
     document.querySelector('.login_id').innerHTML = first_name //+" "+ last_name;
    //document.querySelector('.login_id').innerHTML = last_name;
    
}
        });

}

});

for (i=1; i<21; i++)
{
	//$stock.append('<div id="beer_id"><div id="name">test' + i + '</div><div id="price"> price test' + i + '</div></div>' );
}

//Activates drag and drop option between inventory and stock
$( function() {
    $( "#inventory, #stock" ).sortable({
      connectWith: "#inventory, #stock"
    }).disableSelection();
  } );

//Clear Button: Clear all items in vendor
$("#clear").click(function() {
    $('#stock').empty();
})


//Update Button
$("#submitStock").click(function() {

	jQuery(function ($) {
    var stockArray = $('#stock #beer_id').map(function () {  //Saves all beer_ids in stock in an array
        return $(this).attr('value')
    }).get();
    var arraySum=0;
    //Check if stock list is empty or more than 20
    if (stockArray.length == 0)
    {alert("The stock is empty");}
	else if (stockArray.length > 20)
	{alert("Stock limit is 20");}
	else{
	    for (i=0; i < stockArray.length; i++)
	    	{
	    		// Get beer information of beer_id in stockArray
	    		$.ajax({
				method: 'GET',
				url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + username + '&password=' + password + '&action=beer_data_get&beer_id=' + stockArray[i],

				success: function(beer) {
				//assuming payload is always = 1
				$.each(beer.payload, function(i, beerstock)
					{
								console.log(beerstock.nr);
						// Submint new stock items to the database
						$.ajax({
							method: 'POST',
							url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + username + '&password=' + password + '&action=inventory_append&beer_id=' +
							beerstock.nr + '&amount=' + beerstock.modul + '&price=' + beerstock.prisinklmoms ,
							//data: { beer_id: beer.payload.beer_id , amount: beer.payload.amount , price: beer.payload.price },

							success: function(correct) {
								arraySum++;
								//confirmation when all submitions are successful
							    if (arraySum == stockArray.length) {alert("Update Complete!");}
								}
							})
					})
				}
				})
	    	}
    }
	})
})

//Search Function for inventory
$( "#search" ).keydown(function() {
  jQuery(function ($) {
    var inventoryArray = $('#inventory #beer_id').map(function () {  //Saves all beer_ids in inventory in an array
        return $(this).attr('value')
    }).get();

    var nameArray = $('#inventory #name').map(function () {  //Saves all beer_ids in inventory in an array
        return $(this).attr('value')
    }).get();

    for (i=0; i < inventoryArray.length; i++)
    {
    	if ($('#search').val() == '')
    	{
    		$('.'+inventoryArray[i]).css("display", "block");
    	}
    	else
    	{

    		if ((inventoryArray[i].toLowerCase()).includes(($('#search').val()).toLowerCase()) || (nameArray[i].toLowerCase()).includes(($('#search').val()).toLowerCase())) {
    			$('.'+inventoryArray[i]).css("display", "block");
    		}
    		else{
    			$('.'+inventoryArray[i]).css("display", "none");
    		}
    	}
    }
})

});


})