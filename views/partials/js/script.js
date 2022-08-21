$('#makeTweet').submit((event) => {
    event.preventDefault();

    const query = {
        "tweet": document.getElementById("tweet").value
    };

    $.ajax({
        url: '/tweet',
        type: 'POST',
        data: JSON.stringify(query),
        encode: true,
        contentType: 'application/json'
    }) 
    .done((response) => {
        var newTweet = '<div class="post">' +
                            '<div class="post_avatar">' +
                                '<img src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTExXzMuanBn.jpg" alt="">' +
                            '</div>' +
            
                            '<div class="post_body">' +
                                '<div class="post_header">' +
                                    '<div class="post_headerTest">' +
                                        '<h3>' +
                                        response.firstname + " " + response.lastname +
                                            '<span class="post_headerSpecial">' +
                                            ' @' + response.username +
                                            '</span>' +
                                        '</h3>' +
                                    '</div>' +
                                    '<div class="post_headerDescription">' +
                                        '<p>' + response.tweet + '</p>' +
                                    '</div>' +
                                '</div>' +
            
                            '<div class="post_footer">' +
                                '<span class="material-icons"> repeat </span>' +
                                '<span class="material-icons"> favorite_border </span>' +
                                '<span class="material-icons"> share </span>' +
                            '</div>' +
                        '</div>' +
                    '</div>'

        document.getElementById('posts').insertAdjacentHTML('afterbegin', newTweet);
    });
});