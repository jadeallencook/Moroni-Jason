$(function () {
  // cache jquery
  var $container = $('div#tumblr-feed');
  // get posts
  $.ajax({
    url: 'http://api.tumblr.com/v2/blog/moronijasonart.tumblr.com/posts?api_key=71wcLjAWmhjAK17EdQBI6OCo2yM55WXRdCLGNGjwT6ltjXlnWA',
    dataType: 'jsonp',
    success: function (posts) {
      // cache posts
      var posts = posts.response.posts;
      // main build 
      function build() {
        // init build
        var html = new String();
        // add each post
        $.each(posts, function (x, post) {
          if (post.type == 'photo') {
            var tags;
            if (post.tags.length > 0) {
              $.each(post.tags, function (x, tag) {
                tags += ' ' + tag;
              })
            }
            html += '<div class="tumblr-holder ' + tags + '" style="background-image:url(' + post.photos[0].original_size.url + ');"></div>';
          }
        });
        $container.empty().append(html);
        // event listeners
        $('div.tumblr-holder').click(function () {
          var bg = $(this).css('background-image');
          bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
          $container.empty().append('<img src="' + bg + '" />');
          $('html, body').animate({
            scrollTop: $container.offset().top - 100
          }, 'slow');
          $('div#tumblr-feed img').click(function () {
            build();
          });
        });
      }
      build();
      // event listeners
      $('button.portfolio-btn').click(function () {
        var id = $(this).attr('id');
        if (id !== undefined) {
          build();
          $('div.tumblr-holder').hide();
          $('div.' + id).show();
        } else {
          $('div.tumblr-holder').show();
          build();
        }
      });
    }
  });
});
