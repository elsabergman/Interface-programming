
var langs ={
 history: {
  en: "History",
  sv: "Historik"
 },
 beverages: {
  en: "Beverages",
  sv: "Drycker"
 },
 beverage: {
  en: "Beverage",
  sv: "Dryck"
 },
  amount: {
  en: "Amount",
  sv: "Mängd"
 },
  price: {
  en: "Price (kr)",
  sv: "Pris (kr)"
 },
 purchaseHistory: {
  en: "Purchase History",
  sv: "Köp Historik"
 }, 
 Total: {
  en: "Your total",
  sv: "Summan"
 },
 manageBeverages: {
  en: "Manage Beverages",
  sv: "Hantera Drycker"
 },
 
 chooseTypeBeer: {
  en: "chooseTypeBeer",
  sv: "Välj ölsort"
 },
  date: {
  en: "Date",
  sv: "Datum"
 },
 theseChoicesContainAlcohol: {
  en: "These choices contain alcohol",
  sv: "Dessa alternativ innehåller Alkohol"
 },
 yourCart: {
  en: "Your Cart",
  sv: "Din vagn"
 },
 yourtotal: {
	en: "Your Total:",
	sv: "Summan:"
 },
 NonAlcoholic: {
  en: "These choices are non-alcoholic",
  sv: "Alkoholfira alternativ"
 },
 manageUsers: {
  en: "Manage Users",
  sv: "Hantera Användare"
 },
 buy: {
	 en: "Buy",
	 sv: "köp"
 },
 clear:{
	 en: "Clear",
	 sv: "Rensa"
 },
 logOut:{
	 en: "Log Out",
	 sv: "logga ut"
 }
}



function get_translation(lang, key){
	
	if (langs[key]&& langs[key][lang] ) {
		return langs[key][lang];
		}
	else {
		return key;
	}
}


$( document ).ready(function() {
    function translate_all(lang){
		$(".translatable").each(function(){
			$(this).html(get_translation(lang, $(this).data("key")));
		});
		
	}
	$("body").on("click",".translate",function(){
		var lang = $(this).data("lang");
		translate_all(lang);
		localStorage.setItem("lang",lang);
	});
	var defaultLang = localStorage.getItem("lang");
	if (!defaultLang){
		defaultLang = "en"
	}
	translate_all(defaultLang);
});