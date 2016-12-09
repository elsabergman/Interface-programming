$(function (){ 
//Requesting data using jQuery 
var $inventory = $('#inventory'); //Id of html div
var $stock = $('#stock');
var username = 'jorass';
var password = 'jorass';
var sum = 0;
$.ajax({
	method: 'GET',
	url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + username + '&password=' + password + '&action=inventory_get',

success: function(inventory) {

//loop for all indices of array payload
$.each(inventory.payload, function(i, inv)
{
	if (inv.namn != '' && inv.price != '')
	{
	$inventory.append('<div id="beer_id" class="' + inv.beer_id + '" value="' + inv.beer_id + '">'+ 
					  '<div id="name" value="' + inv.namn + '">' + inv.namn + '</div>' +
					  '<div id="price" value="' + inv.price + '">' + inv.price + ' :-</div></div>');
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



//jQuery.getJSON( url [, data ] [, success ] )
//$.getJSON('E:/Drag/js/stock.json', function(stock) {
//		$.each(stock, function(i, st)
//		{
//			
//			$stock.append('<div id="beer_id" value="' + st.beer_id + '">'+ 
//					  '<div id="name" value="' + st.beer_name + '">' + st.beer_name + '</div>' +
//					  '<div id="price" value="' + st.price + '">' + st.price + ' :-</div></div>');
//		});
//											  });

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
	else if (stockArray.length > 19)
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
								arraySum= arraySum + 1;
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

    console.log(nameArray);
    console.log(inventoryArray);
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