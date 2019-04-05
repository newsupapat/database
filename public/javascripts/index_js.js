$(document).ready(function () { 
    
    
    $("#employ").submit(function (e) 
    { 
        e.preventDefault();      
        var data = {
            "input_EMID": $('input[name=input_EMID]').val(),
          "input_firstname": $('input[name=input_firstname]').val(),
          "input_lastname": $('input[name=input_lastname]').val(),
          "gender": $('select[name=gender]').children("option:selected").val(),
          "dob": $('select[name=dob]').children("option:selected").val(),
          "phone": $('input[name=phone]').val(),
          "Address": $('input[name=input_EMID]').val(),
          "Nationality": $('select[name=Nationality]').children("option:selected").val(),
          "Status" : "Yes",
          "Marital": $('select[name=Marital]').children("option:selected").val(),
          "input_ID" : $('input[name=input_ID]').val(),
          "s_salary" : $('input[name=s_salary]').val()
            };
            // console.log(data);
        
        // $("html, body").animate({ scrollTop: 0 }, "slow");
        (function smoothscroll(){
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                 window.requestAnimationFrame(smoothscroll);
                 window.scrollTo (0,currentScroll - (currentScroll/5));
            }
        })();
        //  alert($('input[name=input_EMID]').val().length);
        var form = $(this);
        if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        form.addClass('was-validated');
        $.notify({
            // options
            title: "<h3>Warning</h3></br>",
            message: 'Please fill All slot!'
        },{
            // settings
            type: 'warning',
            delay:3000
        });
        }
        else if($('input[name=input_EMID]').val().slice(0, 1)!="E")
        {
            $.notify({
                // options
                title: "<h3>Employee ID Error</h3></br>",
                message: 'Please Enter EmployeeID Again with First Character "E"'
            },{
                // settings
                type: 'warning',
                delay:3000
            });
        }else if($('input[name=input_EMID]').val().length!=4)
        {
            $.notify({
                // options
                title: "<h3>Employee ID Error</h3></br>",
                message: 'Please Enter EmployeeID Again with 3 Size'
            },{
                // settings
                type: 'warning',
                delay:3000
            });
        }else{
            $.ajax({
                type: "POST",
                url: "/information",
                data: data,
                dataType: "text",
                success: function (response) {
                     console.log(response);
                    if(response=="Complete"){
                        $.notify({
                            // options
                            title: "<h3>Success</h3></br>",
                            message: 'Your Data was insert into database'
                        },{
                            // settings
                            type: 'success',
                            delay:3000
                        });
                    }
                    else
                    {
                        console.log(response);
                        $.notify({
                            // options
                            title: "<h3>Danger</h3></br>",
                            message: response
                        },{
                            // settings
                            type: 'warning',
                            delay:3000
                        });
                    }
                    setTimeout(function(){ location.reload(); }, 1500);         
                }
            });
        }
    });   
});


