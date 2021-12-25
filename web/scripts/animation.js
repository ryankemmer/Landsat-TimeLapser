var rub;

//get satillite image
const ee_token = "AIzaSyDpbgp0DBCSEmr5yLxRxdOZZPncWHHKFMA";
const EE_MAP_PATH = "https://earthengine.googleapis.com/v1alpha";

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}

function openURI(uri) {
  window.open(uri, '_blank');
}

function timeConverter(timestamp) {
  var date = new Date(timestamp);
  var newDate =
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    pad(date.getHours(), 2) +
    ":" +
    pad(date.getMinutes(), 2) +
    ":" +
    pad(date.getSeconds(), 2);

  return newDate;
}

const initialize_image = (resInfo) => {
  console.log(resInfo);
  var url = resInfo.url;
  var date = timeConverter(resInfo.date);
  document.getElementById("satalite_img").src = url;
  const dateContainer = document.getElementById("satalite_date");
  dateContainer.innerHTML = date;
};

var playing = false;

const initialize_animation = (resInfo) => {
  const imgContainer = document.getElementById("animation_img");

  var url = resInfo.url;

  function gifEnd(e) {
    console.log("end", e);
  }

  rub = new SuperGif({
    gif: imgContainer,
    auto_play: true,
    //loop_delay:3000,
    //max_width:'100%'
    progressbar_height: 5,
    rubbable: true,
    on_end: gifEnd,
  });

  rub.load_url(url, function () {

    $(".timelapse").show()
    $(".loading").hide()

    document.getElementById("save_btn").onclick = function () {
      openURI(url)
    };

    imgContainer.innerHTML = "";
    console.log("oh hey, now the gif is loaded");

    rub.play();
    myLoop(); //  start the loop

    var totalFrames = rub.get_length();
    console.log("total ", totalFrames);
    $("#growthRange").attr("max", totalFrames).val(0);

    $(".jsgif").on("click", function () {
      console.log("asdfk");
      if (rub.get_playing()) {
        rub.pause();
        playing = false;
      } else {
        rub.play();
        playing = true;
        myLoop();
      }
    });

    var i = 1; //  set your counter to 1

    function myLoop() {
      setTimeout(function () {
        console.log("hello");
        i++;
        if (playing) {
          console.log("play");
          $("#growthRange").val(rub.get_current_frame());
          myLoop();
        }
      }, 200);
    }
  });
};

function setupDateInputs() {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  var today = year + "-" + month + "-" + day;
  $("#end_date").val(today);

  var yearAgo = year - 1 + "-" + month + "-" + day;
  $("#start_date").val(yearAgo);

  $("#growthRange")
    .on("input", function () {
      var newValue = this.value;

      rub.pause();
      rub.move_to(newValue);
      console.log(newValue);
      //$('#newValue').html(newValue);
    })
    .on("change", function () {
      if (playing) {
        rub.play();
      }
    });
}

function newVideo() {
  $(".timelapse").hide()
  $(".loading").show()

  console.log(points, mapBbox)
  $(".jsgif").remove();
  const imgContainer = document.getElementById("animation_img");

  imgContainer.innerHTML = `<span class="sr-only">Loading...</span>`;

  $.ajax({
    url: "https://api.landsat-timelapser.com/getVideoURL",
    type: "POST",
    data: {
      start: $("#start_date").val(),
      end: $("#end_date").val(),
      bbox: JSON.stringify(mapBbox),
      points: JSON.stringify(points)
    },
    success: function (result) {
      console.log(result);
      initialize_animation(result);

    },
    error: function (result) {
      console.log(result);
    }
  });
}

window.onload = function () {
  setupDateInputs();
  $(".map, .timelapse, .loading, .dates").hide()
  document.getElementById("start").onclick = function () {
    $('.map').show()
    $('.about').hide()
  };

  document.getElementById("confirm_dates").onclick = function () {
    newVideo();
  };

};