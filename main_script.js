var username = localStorage.getItem('userID'); //save username and password to see which ones should see all buttons 
var password = localStorage.getItem('password');
/*--global variables---*/
var total_price = 0;
var name ="";
var my_beer_id = "";
var purchase_array = new Array;

  var beer_id = new Array();

/*---main ---*/
$(function (){ 
//Requesting data using jQuery 
var $main = $('#main'); //Id of html div

  
     if ( (username != 'jorass') && (username != 'ervtod') && (username != 'hirchr') && (username != 'saksru') && 
            (username != 'svetor')) {
         document.getElementById('admin_buttons').style.visibility = 'hidden';
        
         
     }

$.ajax({
    
    method: 'GET',
    url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + username + '&password=' + password + '&action=inventory_get',

success: function(main){
//console.log(history);

//loop for all indices of array payload
    var beer_count = 0; //to make sure the loops stops when we have 17 beers
    var beer_count_nonAlc = 0;
    var names = new Array();
    var prices = new Array();
    var amounts = new Array();
  
    var namn_nonAlc = new Array();
  
    var buttons ="";
    var id_values = 1;
    var id_inc_button = 18;
    var id_dec_button = 35;
 

    /*---make call to fetch user that is logged in--*/
    $(function() {
        $.ajax({
  
    method: 'GET',
    url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + username + '&password=' + password + '&action=iou_get',

success: function(main) {
    var first_name = main.payload[0].first_name;
    var last_name = main.payload[0].last_name;
     document.querySelector('.login_id').innerHTML = first_name // "+ last_name;
    
}
        });
    });
    /*--- end call to get logged in user --* 
    /* Get arrays from localStorage */ 

    var BevStock = localStorage.getItem("count").split(',');
    var BevPrice = localStorage.getItem("prices").split(',');
    var BevName = localStorage.getItem("names").split(',');
    var BevID = localStorage.getItem("ID").split(',');
   /* var NonAlcName = localStorage.getItem("NoAlcName").split(',');
    var NonAlcStock = localStorage.getItem("NoAlcStock").split(',');
     var NonAlcPrice = localStorage.getItem("NoAlcPrices").split(',');*/
    var Flag = localStorage.getItem("AllBevFlag").split(",");

    
    var id_noAlc = 52;
    var inc_noAlc = 55;
    var dec_noAlc = 58;
    
    /*loop over alcoholic beverages to fill up vending machine*/
    $.each(main.payload, function(i, its)  
           
{     
     if ( (BevStock[i] > 0) && (BevName[i]!= "")  && (beer_count < 17) && Flag[i] == 0) {
         
         names += BevName[i] + ',' ;
         prices += BevPrice[i] +',';
         beer_id += its.beer_id +',';
         
         if (BevStock[i] > 10) {
             BevStock[i] = 10;
             
         }
          amounts += BevStock[i] + ',';
        
          
      
 $('#aform') 
        .attr("action","main.html") .attr("method","post") //set the form attributes
        //add in all the needed input elements

/*add to vending machine */  
$main.append( '<div class="small_box" data-value="' + its.beer_id + '">' +
            '<input type="text" class ="values" id="'+its.beer_id+'" value="0"/>' +
            '<div class="small_box_text" id="'+its.beer_id+'Name">'+  BevName[i]+'</div>' +
            '<div class="small_box_text" id="'+its.beer_id+"Stock"+'" data-value="'+ BevStock[i] +'">'+ BevStock[i] + " left"+'</div> ' +     
            '<div class="small_box_text" id="'+its.beer_id+"Price"+'" data-value="'+ BevPrice[i] +'">'+ BevPrice[i] + " kr"+'</div>'  + 
            '<input type="button" id="'+its.beer_id+'" class="btn_increase" value="+"></input>' +
            '<input type="button" id="'+its.beer_id+'" class="btn_decrease" value="-"></input></div>' ); 
             beer_count++;
        id_values++;
         id_inc_button++;
         id_dec_button++;
        
 }
         
     });
 
  $.each(main.payload, function(i, its)  
           
{     if ( (BevStock[i] > 0) && (BevName[i]!= "")  && (beer_count_nonAlc < 3) && (Flag[i]==1)) {

    /*append non alcoholic beverages*/
         if (BevStock[i] > 10) {
             BevStock[i] = 10;
         }
       $('#non-alcohol').append('<div class="small_box" data-value="' + its.beer_id + '">' +
            '<input type="text" class ="values" id="'+its.beer_id+'" value="0"/>' +
            '<div class="small_box_text" id="'+its.beer_id+'Name">'+  BevName[i]+'</div>' +
            '<div class="small_box_text" id="'+BevID[i]+"Stock"+'" data-value="'+ BevStock[i] +'">'+ BevStock[i] + " left"+'</div> ' +     
            '<div class="small_box_text" id="'+its.beer_id+"Price"+'" data-value="'+ BevPrice[i] +'">'+ BevPrice[i] +" kr"+'</div>'  + 
            '<input type="button" id="'+its.beer_id+'" class="btn_increase" value="+"></input>' +
            '<input type="button" id="'+its.beer_id+'" class="btn_decrease" value="-"></input></div>' ); 
    
      beer_count_nonAlc++;
      inc_noAlc++;
      dec_noAlc++;
      id_noAlc++;
    
         beer_id += its.beer_id +',';
     }
     });
      

    
     names = names.split(",");
 
    amounts = amounts.split(",");

    
    prices = prices.split(",");
 

/*----put chosen beer into the cart and update the stock and total accordingly--*/
    $('.btn_increase').click(function() {
        var BevStock = localStorage.getItem("count").split(',');
         var BevID = localStorage.getItem("ID").split(',');
        
        var id = $(this).attr('id');
        var value = parseInt($("#"+id).val()); //get textbox value
        var stockCount = parseInt($("#"+id+"Stock").data('value'));
        var index = BevID.indexOf(id);
        var theStock = BevStock[index];
        
        
        var price = $("#"+id+"Price").data('value');
        var beerName = $("#"+id+"Name").text();
       
        if ((value+1) <= stockCount )    
        {
            if (value == 0)
            { 
                
            $("#"+id).val(value+1);
                
                //$("#"+id+"Stock").text((stockCount - (value+1)) + " left");
             $('#cart').append('<div class="cartrow" id="'+id+'" >' +
                              '<div id="cartname" class="cartcol">'+beerName+'</div>' +
                              '<div id="cartamount" class="'+id+'">x '+(value+1)+'</div>' +
                              '</div>');
                
                 if (theStock > 10) {
            
            BevStock[index] = 9;
            $("#"+id+"Stock").text(parseInt(BevStock[index])-1 + " left");
        }
                else {
                     $("#"+id+"Stock").text(parseInt(theStock)-1 + " left");
                    BevStock[index] = parseInt(theStock)- 1;
                }
        
            }
            else if (value > 0)
            {
                    if (theStock > 10) {
                 BevStock[index] = 9;
            $("#"+id+"Stock").text(parseInt(BevStock[index])-1 + " left");
        }
                else {
                     $("#"+id+"Stock").text(parseInt(theStock)-1 + " left");
                    BevStock[index] = parseInt(theStock) - 1;
                }
                $("#"+id).val(value+1);
                $('#cartamount.'+id).text('x '+(value+1));
               // $("#"+id+"Stock").text((stockCount - (value+1)) + " left");
            }
            purchase_array += beerName + "\n";
            total_price += +price;
            localStorage.setItem("count",BevStock);
             document.getElementById("total_number").innerHTML = total_price;
        }
        
        //Add price to the total
     
        
        
    });
/*---Remove the chosen beer from the cart and update the stock and total accordingly---*/ 
    $('.btn_decrease').click(function() {
           var BevStock = localStorage.getItem("count").split(',');
         var BevID = localStorage.getItem("ID").split(',');
           var id = $(this).attr('id');
         var idx = BevID.indexOf(id);

     
        var value = parseInt($("#"+id).val()); //get textbox value
        var stockCount = parseInt($("#"+id+"Stock").data('value'));
        var price = $("#"+id+"Price").data('value');
        var beerName = $("#"+id+"Name").text();
         var theStock = BevStock[idx];

        if ((value-1) >= 0)
        {
            if(value == 1)
            {
            $("#"+id).val(value-1);
            $('#'+id+'.cartrow').remove();
            $("#"+id+"Stock").text(parseInt(theStock) +1 + " left");
            BevStock[idx]++;
                purchase_array = "";
                total_price = 0;
                document.getElementById("total_number").innerHTML = total_price;
                }
            
            else if (value > 1)
            {
                $("#"+id).val(value-1);
                $('#cartamount.'+id).text('x '+(value-1));
                  //  $("#"+id+"Stock").text(parseInt(theStock) +1 + " left");
                   // BevStock[idx]++;
                //$("#"+id+"Stock").text((stockCount + (value+1)) + " left");
               // $("#"+id+"Stock").data('value', (stockCount + (value+1)));
                purchase_array = purchase_array.split('\n');
                  var index = purchase_array.indexOf(beerName,1);
                  purchase_array.splice(index,1);
                total_price -= parseFloat(price);
                document.getElementById("total_number").innerHTML = total_price;
            
            }
                
                 
            localStorage.setItem("count",BevStock);
           
           
    }
              
        
    });
  

   
    
}
       });
           

});
   
/* ----------------------- DropDown ----------------------- */

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
   
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
      // connectionAPI();
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
    /*---- still have some issues with this ---*/
  $("#Alc_button").click(function(event){     
        event.preventDefault();
        $('html,body').animate({scrollTop:$("#main").offset().top - 59}, 800); 
       
   
}); 

    $("#nonAlc_button").click(function(event){     
        event.preventDefault();
        $('html,body').animate({scrollTop:$("#non-alcohol").offset().top - 59}, 800); 
   
}); 

    

}


/*---confirm purchase. When click on BUY, the user can see what he/she bought, what the total was as well as new credit.--*/
function confirmPurchase() {

  
    
    window.confirm("Purchase confirmed!\n\n Here is what you bought:\n\n" + purchase_array+ "\nYour total was " + total_price +" kr");
    clearAll();
    purchase_array ="";
    total_price =""; 

    
}
          
  
/*-- increase number of beers person wants to buy. increments number in value box by one and makes number red to make it easier for the customer to see that he/she has picked that certain beer. Also adds to total price. --*/
/*function incrementValue(number, beer_id,namn, count, price)
{
  
    
var value = parseInt(document.getElementById(number).value, 10);
    value = isNaN(value) ? 0 : value;
if (count == 1 && (purchase_array.indexOf(namn) > -1)) { //if it is out of stock it cant be put in the cart
    alert("this beer is now out of stock");
    return;
}
    if (count > 0) {
    document.getElementById('text').innerHTML ="";

 if(value < count && count > 0){
    

     document.getElementById(number).style.color = 'red';
       value++;
      purchase_array += namn + "," ;
   
     purchase_array = purchase_array.split(",");
       alert(purchase_array);
    document.getElementById(number).value = value;
      $("#text").append(purchase_array); 

   total_price += parseFloat(price);
     document.getElementById("total_number").innerHTML = total_price.toPrecision(3); 
      
 
 }
    }
   

}
*/

/*--decrease number of beers person wants to buy --*/
/*function decreaseValue(number,beer_id, name,count,price)
{
   alert(purchase_array.length);
    for(i=0; i<purchase_array.length; i++ ) {
        alert(purchase_array[i]);
    }
    var value = parseInt(document.getElementById(number).value, 10);
    value = isNaN(value) ? 0 : value;
    if (value-1 == 0) {
             document.getElementById(number).style.color = 'black';
    }
    if( value > 0) {
          value--;
        if ((purchase_array.length)-1 < 2) {
            purchase_array = "";
           
        }
        else { 
            var index = purchase_array.indexOf(name);
            alert(index);
      
        purchase_array =  purchase_array.splice(index,1);
            alert(name);
            
        }
        document.getElementById('text').innerHTML = purchase_array;
           total_price -= parseFloat(price);
         document.getElementById("total_number").innerHTML = total_price.toPrecision(3);
        
            }
             document.getElementById(number).value = value;
    my_beer_id = ""
        }
        */
/*-- clear button, removes all beers in the cart and resets the number in each box to zero as well as makes the numbers black again. Also sets the total amount to zero --*/
function clearAll(){
    
    //To make stock go back to how it was before adding to cart
   /* purchase_array = purchase_array.split(",");
      var BevStock = localStorage.getItem("count").split(',');
         var BevID = localStorage.getItem("ID").split(',');
        var BevName = localStorage.getItem("names").split(',');
    for(i=0; i<purchase_array.length; i++) {
      
        
        var index = BevName.indexOf(purchase_array[i]);
        alert(index);
        var id = BevID[index];
            $("#"+id+"Stock").text(parseInt(BevStock[index]) +1 + " left");
            BevStock[index]++;
            localStorage.setItem("count", BevStock);
        
    }*/
      $('.cartrow').remove();
    purchase_array ="";
    total_price = 0;
     document.getElementById("total_number").innerHTML = total_price; 

    $(".values").val("0");
      $('.values').css({"color":"black"});
    
    
    
    
}
 