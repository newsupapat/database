$(document).ready(function () {
    // alert("click");
    $('#detail').submit(function (e) {
        e.preventDefault();
        var detail = {
            "Act_name": $('input[name=Act_name]').val(),
            "Start_date": $('input[name=Start_date]').val(),
            "End_date": $('input[name=End_date]').val(),
            "header": $('input[name=header]').val(),
            "budget": $('input[name=budget]').val(),
            "input_co_h1" :  $('input[name=input_co_h1]').val(),
            "input_co_h2" :  $('input[name=input_co_h2]').val(),
            "input_co_h3" :  $('input[name=input_co_h3]').val(),
            "input_code_des" :  $('input[name=input_code_des]').val(),
            "input_cost" :  $('input[name=input_cost]').val(),

        };
        console.log(detail);
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 5));
            }
        })();
        var form = $(this);
        if (form[0].checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            form.addClass('was-validated');
        } else {
            $.ajax({
                type: "POST",
                url: "/activitystat",
                data: detail,
                dataType: "text",
                success: function (response) {
                    if (response == "Save") {
                        $.notify({
                            // options
                            title: "<h1>Success</h1></br>",
                            message: '<h5>Your Data was insert into Database</h5>'
                        }, {
                            // settings
                            type: 'success',
                            delay: 3000
                        });
                        setTimeout(function () {location.reload();}, 1500);
                    }else {
                        console.log(response);
                        $('#new').text(response)
                        $('#button_save').trigger('click');
                    }
                }
            });
        }
        //Footer
    });
});