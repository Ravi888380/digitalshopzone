import $ from 'jquery'

$(document).ready(function(){

    $("#fname,#lname,#mobile,#email,form input[type=radio]").prop("disabled",true);
    $("#savename,#saveemail,#savemobile").hide();

    $("#cancelname").on("click",function(){
        $(".editname").html("Edit");
        $("#cancelname").attr("id","editname");
        
    })
    $("#editname").on("click",function(){
        $(".editname").html("Cancel");
            $("#fname,#lname,input[type=radio]").removeAttr("disabled");
            $("#savename").show();
            $("#editname").attr("id","cancelname");
    })
    $("#editemail").on("click",function(){
        $(".editemail").html("Cancel");
            $("#email").removeAttr("disabled");
            $("#saveemail").show();
            $("#editemail").attr("id","cancelemail");
    })
    $("#editmobile").on("click",function(){
        $(".editmobile").html("Cancel");
            $("#mobile").removeAttr("disabled");
            $("#savemobile").show();
            $("#editmobile").attr("id","cancelmobile");
    })
   
    $("#savename").on("click",function(){
        $("#fname,#lname,input[type=radio]").prop("disabled",true);
        $("#savename").hide();
        $(".editname").html("Edit");
        $("#cancelname").attr("id","editname");
        
    })
    $("#saveemail").on("click",function(){
        $("#email").prop("disabled",true);
        $("#saveemail").hide();
        $(".editemail").html("Edit");
        $("#cancelemail").attr("id","editemail");
        
    })
    $("#savemobile").on("click",function(){
        $("#mobile").prop("disabled",true);
        $("#savemobile").hide();
        $(".editmobile").html("Edit");
        $("#cancelmobile").attr("id","editmobile");
        
    })


})