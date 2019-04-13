$(document).ready(function () {
    $('#employ').submit(function (e) {
        e.preventDefault();
        var experience = {
            "input_EMID": $('input[name=input_EMID]').val(),
            "University": $('input[name=University]').val().toUpperCase(),
            "Cost": $('input[name=cost]').val(),
            "year": $('select[name=year]').children("option:selected").val(),
            "Faculty": $('input[name=Faculty]').val(),
            "Field": $('input[name=Field]').val(),
            "degree": $('select[name=degree]').children("option:selected").val(),
            "Company_name": $('input[name=Company_name]').val(),
            "number_com_work": $('select[name=number_com_work]').children("option:selected").val(),
            "gpax": $('input[name=gpax]').val(),
            "year_resign": $('select[name=year_resigns]').children("option:selected").val(),
            "position": $('input[name=Position]').val()

        };
        console.log(experience);
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
                url: "/experience",
                data: experience,
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