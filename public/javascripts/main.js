$(document).ready(function() {
    $('.close').click(function(e){
        e.preventDefault();
        const container = $('.error-win')
        container.remove();
    });
})