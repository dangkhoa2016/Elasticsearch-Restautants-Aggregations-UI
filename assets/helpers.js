
(function () {
  var strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  Vue.filter('to_yes_no', function (value) {
    if (value === true) return 'Yes';
    if (value === false) return 'No';
    return 'Not set';
  });

  Vue.filter('date', function (date) {
    if (typeof date === 'string')
      date = Date.parse(date);
    if (date) {
      if (typeof date.getDate !== 'function')
        date = new Date(date);
      var d = date.getDate();
      var m = strArray[date.getMonth()];
      var y = date.getFullYear();
      return `${d <= 9 ? '0' + d : d} ${m} ${y}`;
    }
  });

  Vue.filter('truncate', function (text, length, clamp) {
    clamp = clamp || '...';
    var node = document.createElement('div');
    node.innerHTML = text;
    const content = div.textContent || div.innerText || '';
    return content.length > length ? content.slice(0, length) + clamp : content;
  });

})();
