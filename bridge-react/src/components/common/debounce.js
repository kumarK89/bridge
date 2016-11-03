var slice = [].slice;

/**
 * Debounce a function
 *
 * @param {Function} fn
 *        The function you wish to run a bit less frequently
 *
 * @param {Number} threshold
 *        The time in milliseconds to wait for no new calls before
 *        actually running the function. Defaults to 100
 *
 * @param {Boolean} parameterized
 *        If true, debounce each permutation of arguments individually
 *
 * @examples
 *
 *     debounced = debounce(console.log);
 *     debounced("Hi");
 *     debounced("Hi again");
 *
 *     // 100ms later...
 *     > Hi again
 *
 *     debounced = debounce(console.log, 100, true);
 *     debounced("Hi");
 *     debounced("Hi again");
 *     debounced("Hi");
 *     debounced("Hi");
 *
 *     // 100ms later...
 *     > Hi again
 *     > Hi
 *
 * @return {Function} debounced
 * @return {Function} debounced.cancel
 *         Cancel any and all pending future calls.
 */
module.exports = function(fn, threshold, parameterized) {
  const timeouts = {};

  const debounced = function() {
    var args = slice.call(arguments);
    var timeoutKey = parameterized ? JSON.stringify(args) : "_";

    args.unshift(this === window ? null : this);
    var run = fn.bind.apply(fn, args);

    clearTimeout(timeouts[timeoutKey]);
    timeouts[timeoutKey] = setTimeout(run, threshold || 100);
  };

  debounced.cancel = function() {
    Object.keys(timeouts).forEach(function(key) {
      timeouts[key] = clearTimeout(timeouts[key]);
    });
  };

  return debounced;
};
