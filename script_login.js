AllBevNames = new Array();
AllBevStock = new Array();
AllBevPrices = new Array();
AllBevID = new Array();

function connectionAPI(userID,password) {
var apiTemp = new APIConnect(),
    userID = userID,
    password = password,
    btn = document.getElementById("loginform");
   apiTemp.setUser('jorass', 'jorass');
btn.addEventListener('click', function(){ check(apiTemp, userID, password) });


}


function check(apiTemp,password, userID){
    var Pass = password;
    var username = userID;
    api = new APIConnect();
    apiTemp.fetchUsers(function(usr) {

var json = JSON.parse(usr);
var payload = json.payload;
var correct = false;
for (i=0; i<payload.length; i++) {
    var name = payload[i].username;
    
    if (name == username && Pass == username) {
         api.setUser(userID, password);
        localStorage.setItem('username',username);
        localStorage.setItem('password',Pass);
        correct = true;
        //If admin, open the extended main page
       
            window.location = 'main.HTML';
    
        

        Pass = ""; //kolla om man kan deleta från storage när man refreshar sidan, maybe it deletes??? 
        use = "" ;
    
    }
    
   
}
 
   if (!correct) {
    alert("The username and/ or password you entered isn't correct. Please refresh page and try again")
    
  }
    });
                   }
                
function docLoaded(fn) {
	if (document.readyState !== 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
		
	}
}

function pageLoaded(form) {
    var userID = form.userid.value;
    var password = form.pswrd.value;
    
    connectionAPI(userID,password);
    

}
/*----load arrays and put into local storage ---*/

$(function (){ 
var $login = $('#login'); //Id of html div
$.ajax({
	method: 'GET',
	url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass' + '&password=jorass' + '&action=inventory_get',

success: function(login) {
$.each(login.payload, function(i, his)
{
    AllBevNames += his.namn + ',';
    AllBevStock += his.count +',';
    AllBevPrices += his.price + ',';
    AllBevID += his.beer_id + ',';
    
    
    
});
    AllBevFlag = new Array();


    $(function() {
    $.each(login.payload, function(i, its)
{ 
    $.ajax({
    
	method: 'GET',
	url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + 'jorass' + '&password=' + 'jorass' + '&action=beer_data_get&beer_id=' + its.beer_id,
        
success: function(login) {
   
  var alcohol = login.payload[0].alkoholhalt;
    console.log(login.payload[0].alkoholhalt);
  if(  (alcohol == "0%" || alcohol == "0.5%") )  {
      
      AllBevFlag[i] = 1; //if 1 --> alcoholic
      
  }else {
          AllBevFlag[i] = 0; // if 0 --> non-alcoholic
      }


  
      localStorage.setItem("AllBevFlag", AllBevFlag);

}
       
    });
            
    });

      
        
      });
    
    localStorage.setItem('count', AllBevStock);
    localStorage.setItem('prices',AllBevPrices);
    localStorage.setItem('names', AllBevNames);
     localStorage.setItem('ID', AllBevID);
   
}
});
});

