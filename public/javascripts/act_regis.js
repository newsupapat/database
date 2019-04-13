$(document).ready(function () {
    $('#regis').submit(function (e) {
        e.preventDefault();
        var register = {
            "input_EMID": $('input[name=input_EMID]').val(),
            "Activity": $('select[name=activity]').children("option:selected").val(),
            "datestart": $('input[name=start]').val(),
            "phone" :  $('input[name=phone]').val()
        };
        console.log(register);
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
                url: "/activityrigistor",
                data: register,
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