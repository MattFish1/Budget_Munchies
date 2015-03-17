//API Key: AIzaSyCe6PoFCK1nlcSgcZ3FZZuJ058-TLmzrQ8
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

//Ajax
$(function () {
    $("#ajaxForm").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: this.method,
            data: $(this).serialize(),
            url: this.action,
            success: function (data) {
                $("#ajaxResult").text(data).toString();
            }

        });

        $("#ajaxForm").hide();
    });


});

