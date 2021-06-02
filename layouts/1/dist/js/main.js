$(document.body).ready(() => {
  feather.replace();

  if (document.title.match(/->/i)) {
    document.title = document.title.split(" -> ")[1].toLowerCase();
  }

  $(".gototop").on("click", () => scrollToTop(0));
  $(".gotobottom").on("click", () => scrollToTop(document.body.scrollHeight));
});

$(function () {
  $("#toggle-theme").on("click", function () {
    let activeTheme = localStorage.getItem("theme") || "";
    let newTheme = activeTheme === "light" ? "dark" : "light";

    $(document.body).removeClass(activeTheme);
    $(document.body).addClass(newTheme);
    localStorage.setItem("theme", newTheme);
    localStorage.setItem("userControlledTheme", "yes");
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
  $("[data-title]").style_my_tooltips({
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
