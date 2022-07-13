$(document).on('ready', function () {
    
/*  --- Progress bar --- */
    var winHeight = $(window).height(),
        docHeight = $(document).height(),
        progressBar = $('progress'),
        max, value;

    // Set the max scrollable area
    max = docHeight - winHeight;
    progressBar.attr('max', max);

    $(document).on('scroll', function () {
        value = $(window).scrollTop();
        progressBar.attr('value', value);
    });

/*  --- Go up scroll button --- */

// Get The Id
var goUp = document.getElementById(`go-up-icon`)

// On Click, Scroll to the Top of Page
goUp.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' })

});
