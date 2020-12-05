$(document).ready(function(){
	$("#menuContainer").click(function(){
		if($("#leftMenu").css("margin-left") == "-225px"){
			$("#leftMenu").css("margin-left","0px");
		}
		else{
			$("#leftMenu").css("margin-left","-225px");
		}
	});
	$("#arrow-down").click(function(){
		$("#personal").toggleClass("display").toggleClass("inline");
	});
});