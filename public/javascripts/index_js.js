Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) {
        s = "0" + s;
    }
    return s;
}
$(document).ready(function () {
    var Em_id
    $.get('/count', function (data) {
        Em_id = "E" + (data.count + 1).pad(3);
        $('#show_id').text(Em_id);
    });
    $("#employ").submit(function (e) {
        e.preventDefault();
        var information = {
            "input_EMID": Em_id,
            "input_firstname": $('input[name=input_firstname]').val(),
            "input_lastname": $('input[name=input_lastname]').val(),
            "gender": $('select[name=gender]').children("option:selected").val(),
            "dob": $('input[name=dob]').val(),
            "phone": $('input[name=phone]').val(),
            "Address": $('input[name=address]').val() + $('input[name=city]').val() + $('input[name=country]').val() + $('input[name=postal]').val(),
            "Nationality": $('select[name=Nationality]').children("option:selected").val(),
            "Status": $('select[name=status]').children("option:selected").val(),
            "Marital": $('select[name=Marital]').children("option:selected").val(),
            "input_ID": $('input[name=input_ID]').val(),
            "s_salary": $('input[name=s_salary]').val()
        };
        var position = {
            "Department": $('select[name=Department]').children("option:selected").val(),
            "Position": $('input[name=position]').val(),
            "input_EMID": Em_id,
            "s_salary": $('input[name=s_salary]').val()
        };
        // console.log(information);
        console.log(position);
        // console.log(data);
        // $("html, body").animate({ scrollTop: 0 }, "slow");
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
            $.get('/count', function (data) {
                Em_id = "E" + (data.count + 1).pad(3);
                $('#show_id').text(Em_id);
            });
            information.input_EMID = Em_id;
            position.input_EMID = Em_id;
            $.ajax({
                type: "POST",
                url: "/information",
                data: information,
                dataType: "text",
                success: function (response) {
                    if (response == "Complete") {
                        $.ajax({
                            type: "POST",
                            url: "/position",
                            data: position,
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
                                }else{
                                    $.notify({
                                        // options
                                        title: "<h1>Success</h1></br>",
                                        message: response
                                    }, {
                                        // settings
                                        type: 'danger',
                                        delay: 3000
                                    });
                                }
                                setTimeout(function () {location.reload();}, 1500);
                            }
                        });
                        
                    } else {
                        console.log(response);
                        $.notify({
                            // options
                            title: '<h3>Danger</h3><br>',
                            message: response
                        }, {
                            // settings
                            type: 'danger',
                            delay: 30000,
                            animate: {
                                enter: 'animated bounceInDown',
                                exit: 'animated bounceOutUp'
                            }
                        });
                    }
                    // setTimeout(function(){ location.reload(); }, 1500);  
                }
            });
        }
    });
});