var rub;

//get satillite image
const ee_token = "AIzaSyDpbgp0DBCSEmr5yLxRxdOZZPncWHHKFMA";
const EE_MAP_PATH = "https://earthengine.googleapis.com/v1alpha";

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
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

  // Get a reference to the placeholder DOM element to contain the map.
  const imgContainer = document.getElementById("satalite_img");
  imgContainer.src = url;

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
      //  create a loop function
      setTimeout(function () {
        //  call a 3s setTimeout when the loop is called
        console.log("hello"); //  your code here
        i++; //  increment the counter
        if (playing) {
          //  if the counter < 10, call the loop function

          console.log("play");

          $("#growthRange").val(rub.get_current_frame());
          myLoop(); //  ..  again which will trigger another
        } //  ..  setTimeout()
      }, 200);
    }
  });
};

const initialize_animation2 = (resInfo) => {
  var url = resInfo.url;

  // Get a reference to the placeholder DOM element to contain the map.
  const imgContainer = document.getElementById("animation_img2");
  imgContainer.src = url;
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

  newVideo();

  $("#start_date, #end_date").on("change", function () {
    //console.log('chaned')
    newVideo();
  });

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

  console.log(points, mapBbox)
  $(".jsgif").remove();
  const imgContainer = document.getElementById("animation_img");

  imgContainer.innerHTML = `<div class="col-12">
<div class="d-flex justify-content-center">
<div class="spinner-border color-green-dark" role="status">
<span class="sr-only">Loading...</span>
</div>
</div>
</div>`;

  $.ajax({
    url: "localhost:8080/getVideoURL",
    type: "POST",
    data: {
      start: $("#start_date").val(),
      end: $("#end_date").val(),
      bbox: mapBbox,
      points: points
    },
    success: function (result) {
      console.log(result);

      initialize_animation(result);
    },
    error: function (result) {
      console.log(result);
    },
  });
}

window.onload = function () {
  setupDateInputs();
};