var playReady = false;

$(document).ready(function() {

   var stream = {
                title: "",
                mp3: "http://arabella.stream.kapper.net:8000/arabellavie"
            },
            ready = false;

  $("#jquery_jplayer_1").jPlayer({
                ready: function (event) {
                    ready = true;
                    $(this).jPlayer("setMedia", stream);

                },
                pause: function() {
                    siriWave.stop();
                    $(this).jPlayer("clearMedia");
                },
                error: function(event) {
                    if(ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
                        // Setup the media stream again and play it.
                        
                        $(this).jPlayer("setMedia", stream).jPlayer("play");

                    }
                },
                swfPath: "swf",
                supplied: "mp3",
                preload: "none",
                wmode: "window",
                useStateClassSkin: true,
                autoBlur: false,
                keyEnabled: true
            });

  /* ======== Other Audio Player Functions ======== */

  $("#jquery_jplayer_1").on(
   
    $.jPlayer.event.ready + ' ' + $.jPlayer.event.play,
    function(event) {

      if(!playReady){
        playReady= true;
      } else {
        console.log("wave started");
        siriWave.start();
      }

      /* === VOLUME DRAGGING ==== */

      $('.jp-volume-bar').mousedown(function() {
          var parentOffset = $(this).offset(),
            width = $(this).width();
          $(window).mousemove(function(e) {
            var x = e.pageX - parentOffset.left,
              volume = x / width
            if (volume > 1) {
              $("#jquery_jplayer_1").jPlayer("volume", 1);
            } else if (volume <= 0) {
              $("#jquery_jplayer_1").jPlayer("mute");
            } else {
              $("#jquery_jplayer_1").jPlayer("volume", volume);
              $("#jquery_jplayer_1").jPlayer("unmute");
            }
          });
          return false;
        })
        .mouseup(function() {
          $(window).unbind("mousemove");
        });

      /* === ENABLE DRAGGING ==== */

      var timeDrag = false; /* Drag status */
      $('.jp-play-bar').mousedown(function(e) {
        timeDrag = true;
        updatebar(e.pageX);
      });
      $(document).mouseup(function(e) {
        if (timeDrag) {
          timeDrag = false;
          updatebar(e.pageX);
        }
      });
      $(document).mousemove(function(e) {
        if (timeDrag) {
          updatebar(e.pageX);
        }
      });

      //update Progress Bar control
      var updatebar = function(x) {

        var progress = $('.jp-progress');
        //var maxduration = myPlaylist.duration; //audio duration

        var position = x - progress.offset().left; //Click pos
        var percentage = 100 * position / progress.width();

        //Check within range
        if (percentage > 100) {
          percentage = 100;
        }
        if (percentage < 0) {
          percentage = 0;
        }

        $("#jquery_jplayer_1").jPlayer("playHead", percentage);

        //Update progress bar
        $('.jp-play-bar').css('width', percentage + '%');
      };

      /* === Playlist Functions ==== */

      $('#playlist-toggle').on('click', function() {
        $('#playlist-wrap').stop().fadeToggle();
        $(this).toggleClass('playlist-is-visible');
      });

    }); // end jplayer event ready

}); // end document ready
