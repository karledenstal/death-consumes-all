$(document.body).ready(() => {
  feather.replace();

  if (document.title.match(/->/i)) {
    document.title = document.title.split(" -> ")[1].toLowerCase();
  }

  $(".gototop").on("click", () => scrollToTop(0));
  $(".gotobottom").on("click", () => scrollToTop(document.body.scrollHeight));

  setHeader(10, "Studies");
  setHeader(14, "Romance");
  setHeader(18, "Gifs");
  setHeader(21, "Appearance");
  setHeader(25, "Character information");
  setHeader(29, "Character values");
});

function setHeader(id, title) {
$(`#field_${id}`).before(`<td colspan='12' class='pformstrip'>${title}</td>`);
}

$(function () {
  let current = 1;

  $("#move-stats").on("click", function() {
    if(current === 1) {
      return;
    } else {
      current = 1;
      $("#stats-content").css("transform", `translateY(0)`);
      $("#set-stat-title").text("eureka statistics!");
      $("#move-recent").removeClass("active");
      $(this).addClass("active");
    }
  });

  $("#move-recent").on("click", function() {
    if(current === 2) {
      return;
    } else {
      current = 2;
      $("#stats-content").css("transform", `translateY(-600px)`);
      $("#set-stat-title").text("recent topics!");
      $("#move-stats").removeClass("active");
      $(this).addClass("active");
    }
  });
});

$(function () {
  let items = $(".profile-page");
  let current = 1;
  let currentPos = 0;
  let percentage = 25;
  let heightToMove = 435;
  let percentToFill = 100 / items.length;

  $("#page-down").on("click", function () {
    if (current >= items.length) {
      currentPos = 0;
      current = 1;
      percentage = 20;
      $("#page-wrap").css("transform", `translateY(${currentPos}px)`);
      $("#progress-name").css("background-size", `${percentage}% 4px`);
    } else {
      current += 1;
      let multiplier = current - 1;
      let moveIt = -heightToMove * multiplier;
      currentPos = moveIt;
      percentage = percentToFill * current;
      $("#page-wrap").css("transform", `translateY(${currentPos}px)`);
      $("#progress-name").css("background-size", `${percentage}% 4px`);
    }
  });

  $("#page-up").on("click", function () {
    if (current <= 1) {
      let multiplier = items.length - 1;
      currentPos = -heightToMove * multiplier;
      current = items.length;
      percentage = 100;
      $("#page-wrap").css("transform", `translateY(${currentPos}px)`);
      $("#progress-name").css("background-size", `${percentage}% 4px`);
    } else {
      current -= 1;
      let moveIt = currentPos + heightToMove;
      currentPos = moveIt;
      percentage = percentage - percentToFill;
      $("#page-wrap").css("transform", `translateY(${currentPos}px)`);
      $("#progress-name").css("background-size", `${percentage}% 4px`);
    }
  });
});

$(function () {
  $("#toggle-theme").on("click", function () {
    let activeTheme = localStorage.getItem("theme") || "";
    let newTheme = activeTheme === "light" ? "dark" : "light";

    $(document.body).removeClass(activeTheme);
    $(document.body).addClass(newTheme);
    localStorage.setItem("theme", newTheme);
  });
});

$(function () {
  let activeTheme = localStorage.getItem("theme") || "";

  if (activeTheme) {
    $(document.body).addClass(activeTheme);
  } else {
    localStorage.setItem("theme", "light");
    $(document.body).addClass("light");
  }
});

function scrollToTop(pos) {
  window.scrollTo({ top: pos, behavior: "smooth" });
}

$(function () {
  let header = $(".swoop-menu");
  $(window).scroll(function () {
    let scroll = $(window).scrollTop();

    if (scroll >= 855) {
      header.addClass("swoop");
    } else {
      header.removeClass("swoop");
    }
  });
});

$(function () {
  $("[title]").style_my_tooltips({
    tip_follows_cursor: true,
    tip_delay_time: 000,
    tip_fade_speed: 250,
  });
});

// Post Autosaver by Black
// http://code.jfbs.net/?showtopic=81
$(document).ready(function () {
  if (
    window.location.href.indexOf("act=Post") !== -1 &&
    window.location.href.indexOf("&f=") !== -1 &&
    window.location.href.indexOf("&CODE=08") == -1
  ) {
    var forumParameters = (function (url) {
      var result = {};
      for (var i = 0; i < url.length; i++) {
        var parameter = url[i].split("=");
        if (parameter.length != 2) continue;
        result[parameter[0]] = decodeURIComponent(
          parameter[1].replace(/\+/g, " ")
        );
      }
      return result;
    })(window.location.search.substr(1).split("&"));
    var subDomain = location.hostname.split(".").shift();
    function savePost() {
      if (forumParameters["t"]) {
        localStorage[
          subDomain + forumParameters["f"] + forumParameters["t"]
        ] = $("textarea[name='Post']").val();
      } else {
        localStorage[subDomain + forumParameters["f"]] = $(
          "textarea[name='Post']"
        ).val();
      }
    }
    function loadPost() {
      if (forumParameters["t"]) {
        if (forumParameters["p"]) {
          return false;
        }
        $("textarea[name='Post']").val(
          localStorage[subDomain + forumParameters["f"] + forumParameters["t"]]
        );
      } else {
        $("textarea[name='Post']").val(
          localStorage[subDomain + forumParameters["f"]]
        );
      }
    }
    function savePostRepeat() {
      setTimeout(function () {
        savePost();
        savePostRepeat();
      }, 30000);
    }
    $(window).unload(function () {
      savePost();
    });
    $("form[name='REPLIER']").on("submit", function () {
      if (forumParameters["t"]) {
        localStorage.removeItem(
          subDomain + forumParameters["f"] + forumParameters["t"]
        );
      } else {
        localStorage.removeItem(subDomain + forumParameters["f"]);
      }
    });
    loadPost();
    savePostRepeat();
  }
});