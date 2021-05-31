$(function () {
  let filters = {};
  let regex;

  let $grid = $(".member-list-grid").isotope({
    itemSelector: ".item",
    filter: function () {
      var $this = $(this);
      return regex ? $this.text().match(regex) : true;
    },
  });

  let $quicksearch = $(".quicksearch").keyup(
    debounce(function () {
      console.log('$quicksearch.val()', $quicksearch.val())
      regex = new RegExp($quicksearch.val(), "gi");
      $grid.isotope();
    })
  );

  $(".isotope-filter-selection").on("change", function (event) {
    var $select = $(event.target);
    var filterGroup = $select.attr("value-group");
    filters[filterGroup] = event.target.value;
    var filterValue = concatValues(filters);
    $grid.isotope({ filter: filterValue });
  });
});

function concatValues(obj) {
  var value = "";
  for (var prop in obj) {
    value += obj[prop];
  }
  return value;
}

// debounce so filtering doesn't happen every millisecond
function debounce(fn, threshold) {
  var timeout;
  threshold = threshold || 100;
  return function debounced() {
    clearTimeout(timeout);
    var args = arguments;
    var _this = this;
    function delayed() {
      fn.apply(_this, args);
    }
    timeout = setTimeout(delayed, threshold);
  };
}
