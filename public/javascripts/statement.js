$(document).ready(function () {
    $('input[name=code]').focusout(function () {
        $('#p_text').addClass('d-none');
        $('#input_text').addClass('d-none');
        var code = {
            Code: $('input[name=code]').val().toUpperCase()
        }
        console.log(code.Code);
        if (code.Code) {
            $.ajax({
                type: "POST",
                url: "/code",
                data: code,
                dataType: "json",
                success: function (response) {
                    if (response.length != 0) {
                        $('#p_text').removeClass('d-none');
                        $('#p2_text').text(response[0].Cost);
                    } else {
                        $('#input_text').removeClass('d-none');
                        $('input[name=cost]').attr("required", true);
                    }
                }
            });
        }
    });
    var start_h
    var start_m
    $('input[name=start]').datepicker({
        timepicker: true,
        language: 'en',
        onSelect: function (fd, d, picker) {
            start_h = d.getHours();
            start_m = d.getMinutes();
        }
    })
    $('input[name=End]').datepicker({
        timepicker: true,
        language: 'en',
        onSelect: function (fd, d, picker) {
            var End_h = d.getHours();
            var End_m = d.getMinutes();
        }
    })
    $('#state_form').submit(function (e) {
        e.preventDefault();
        var statement = {
            "input_EMID": $('input[name=Emid]').val(),
            "Code": $('input[name=code]').val().toUpperCase(),
            "Cost": $('input[name=cost]').val(),
            "desscription": $('textarea[name=description]').val(),
            "start": $('input[name=start]').val(),
            "end": $('input[name=End]').val(),
            "Absent": (start_h > 11) ? 1 : 0,
            "Note": (start_h > 9 && start_m < 30 && start_h < 11) ? "Late" : 0
        };
        console.log(statement);
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
                url: "/statement",
                data: statement,
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
    });
});