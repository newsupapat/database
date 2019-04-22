$(document).ready(function () {
    $('#login').submit(function (e) { 
        e.preventDefault();
        
        $.ajax({
            type: "post",
            url: "/login",
            data: "data",
            dataType: "dataType",
            success: function (response) {
                
            }
        });
    });
});