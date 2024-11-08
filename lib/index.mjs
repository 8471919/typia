function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var lib$1 = {exports: {}};

var util$1 = {};

var types$4 = {
  ROOT       : 0,
  GROUP      : 1,
  POSITION   : 2,
  SET        : 3,
  RANGE      : 4,
  REPETITION : 5,
  REFERENCE  : 6,
  CHAR       : 7,
};

var sets$1 = {};

const types$3 = types$4;

const INTS = () => [{ type: types$3.RANGE , from: 48, to: 57 }];

const WORDS = () => {
  return [
    { type: types$3.CHAR, value: 95 },
    { type: types$3.RANGE, from: 97, to: 122 },
    { type: types$3.RANGE, from: 65, to: 90 }
  ].concat(INTS());
};

const WHITESPACE = () => {
  return [
    { type: types$3.CHAR, value: 9 },
    { type: types$3.CHAR, value: 10 },
    { type: types$3.CHAR, value: 11 },
    { type: types$3.CHAR, value: 12 },
    { type: types$3.CHAR, value: 13 },
    { type: types$3.CHAR, value: 32 },
    { type: types$3.CHAR, value: 160 },
    { type: types$3.CHAR, value: 5760 },
    { type: types$3.RANGE, from: 8192, to: 8202 },
    { type: types$3.CHAR, value: 8232 },
    { type: types$3.CHAR, value: 8233 },
    { type: types$3.CHAR, value: 8239 },
    { type: types$3.CHAR, value: 8287 },
    { type: types$3.CHAR, value: 12288 },
    { type: types$3.CHAR, value: 65279 }
  ];
};

const NOTANYCHAR = () => {
  return [
    { type: types$3.CHAR, value: 10 },
    { type: types$3.CHAR, value: 13 },
    { type: types$3.CHAR, value: 8232 },
    { type: types$3.CHAR, value: 8233 },
  ];
};

// Predefined class objects.
sets$1.words = () => ({ type: types$3.SET, set: WORDS(), not: false });
sets$1.notWords = () => ({ type: types$3.SET, set: WORDS(), not: true });
sets$1.ints = () => ({ type: types$3.SET, set: INTS(), not: false });
sets$1.notInts = () => ({ type: types$3.SET, set: INTS(), not: true });
sets$1.whitespace = () => ({ type: types$3.SET, set: WHITESPACE(), not: false });
sets$1.notWhitespace = () => ({ type: types$3.SET, set: WHITESPACE(), not: true });
sets$1.anyChar = () => ({ type: types$3.SET, set: NOTANYCHAR(), not: true });

(function (exports) {
	const types = types$4;
	const sets  = sets$1;


	const CTRL = '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?';
	const SLSH = { '0': 0, 't': 9, 'n': 10, 'v': 11, 'f': 12, 'r': 13 };

	/**
	 * Finds character representations in str and convert all to
	 * their respective characters
	 *
	 * @param {String} str
	 * @return {String}
	 */
	exports.strToChars = function(str) {
	  /* jshint maxlen: false */
	  var chars_regex = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z[\\\]^?])|([0tnvfr]))/g;
	  str = str.replace(chars_regex, function(s, b, lbs, a16, b16, c8, dctrl, eslsh) {
	    if (lbs) {
	      return s;
	    }

	    var code = b ? 8 :
	      a16   ? parseInt(a16, 16) :
	      b16   ? parseInt(b16, 16) :
	      c8    ? parseInt(c8,   8) :
	      dctrl ? CTRL.indexOf(dctrl) :
	      SLSH[eslsh];

	    var c = String.fromCharCode(code);

	    // Escape special regex characters.
	    if (/[[\]{}^$.|?*+()]/.test(c)) {
	      c = '\\' + c;
	    }

	    return c;
	  });

	  return str;
	};


	/**
	 * turns class into tokens
	 * reads str until it encounters a ] not preceeded by a \
	 *
	 * @param {String} str
	 * @param {String} regexpStr
	 * @return {Array.<Array.<Object>, Number>}
	 */
	exports.tokenizeClass = (str, regexpStr) => {
	  /* jshint maxlen: false */
	  var tokens = [];
	  var regexp = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?([^])/g;
	  var rs, c;


	  while ((rs = regexp.exec(str)) != null) {
	    if (rs[1]) {
	      tokens.push(sets.words());

	    } else if (rs[2]) {
	      tokens.push(sets.ints());

	    } else if (rs[3]) {
	      tokens.push(sets.whitespace());

	    } else if (rs[4]) {
	      tokens.push(sets.notWords());

	    } else if (rs[5]) {
	      tokens.push(sets.notInts());

	    } else if (rs[6]) {
	      tokens.push(sets.notWhitespace());

	    } else if (rs[7]) {
	      tokens.push({
	        type: types.RANGE,
	        from: (rs[8] || rs[9]).charCodeAt(0),
	        to: rs[10].charCodeAt(0),
	      });

	    } else if ((c = rs[12])) {
	      tokens.push({
	        type: types.CHAR,
	        value: c.charCodeAt(0),
	      });

	    } else {
	      return [tokens, regexp.lastIndex];
	    }
	  }

	  exports.error(regexpStr, 'Unterminated character class');
	};


	/**
	 * Shortcut to throw errors.
	 *
	 * @param {String} regexp
	 * @param {String} msg
	 */
	exports.error = (regexp, msg) => {
	  throw new SyntaxError('Invalid regular expression: /' + regexp + '/: ' + msg);
	}; 
} (util$1));

var positions$1 = {};

const types$2 = types$4;
positions$1.wordBoundary = () => ({ type: types$2.POSITION, value: 'b' });
positions$1.nonWordBoundary = () => ({ type: types$2.POSITION, value: 'B' });
positions$1.begin = () => ({ type: types$2.POSITION, value: '^' });
positions$1.end = () => ({ type: types$2.POSITION, value: '$' });

const util      = util$1;
const types$1     = types$4;
const sets      = sets$1;
const positions = positions$1;


lib$1.exports = (regexpStr) => {
  var i = 0, l, c,
    start = { type: types$1.ROOT, stack: []},

    // Keep track of last clause/group and stack.
    lastGroup = start,
    last = start.stack,
    groupStack = [];


  var repeatErr = (i) => {
    util.error(regexpStr, `Nothing to repeat at column ${i - 1}`);
  };

  // Decode a few escaped characters.
  var str = util.strToChars(regexpStr);
  l = str.length;

  // Iterate through each character in string.
  while (i < l) {
    c = str[i++];

    switch (c) {
      // Handle escaped characters, inclues a few sets.
      case '\\':
        c = str[i++];

        switch (c) {
          case 'b':
            last.push(positions.wordBoundary());
            break;

          case 'B':
            last.push(positions.nonWordBoundary());
            break;

          case 'w':
            last.push(sets.words());
            break;

          case 'W':
            last.push(sets.notWords());
            break;

          case 'd':
            last.push(sets.ints());
            break;

          case 'D':
            last.push(sets.notInts());
            break;

          case 's':
            last.push(sets.whitespace());
            break;

          case 'S':
            last.push(sets.notWhitespace());
            break;

          default:
            // Check if c is integer.
            // In which case it's a reference.
            if (/\d/.test(c)) {
              last.push({ type: types$1.REFERENCE, value: parseInt(c, 10) });

            // Escaped character.
            } else {
              last.push({ type: types$1.CHAR, value: c.charCodeAt(0) });
            }
        }

        break;


      // Positionals.
      case '^':
        last.push(positions.begin());
        break;

      case '$':
        last.push(positions.end());
        break;


      // Handle custom sets.
      case '[':
        // Check if this class is 'anti' i.e. [^abc].
        var not;
        if (str[i] === '^') {
          not = true;
          i++;
        } else {
          not = false;
        }

        // Get all the characters in class.
        var classTokens = util.tokenizeClass(str.slice(i), regexpStr);

        // Increase index by length of class.
        i += classTokens[1];
        last.push({
          type: types$1.SET,
          set: classTokens[0],
          not,
        });

        break;


      // Class of any character except \n.
      case '.':
        last.push(sets.anyChar());
        break;


      // Push group onto stack.
      case '(':
        // Create group.
        var group = {
          type: types$1.GROUP,
          stack: [],
          remember: true,
        };

        c = str[i];

        // If if this is a special kind of group.
        if (c === '?') {
          c = str[i + 1];
          i += 2;

          // Match if followed by.
          if (c === '=') {
            group.followedBy = true;

          // Match if not followed by.
          } else if (c === '!') {
            group.notFollowedBy = true;

          } else if (c !== ':') {
            util.error(regexpStr,
              `Invalid group, character '${c}'` +
              ` after '?' at column ${i - 1}`);
          }

          group.remember = false;
        }

        // Insert subgroup into current group stack.
        last.push(group);

        // Remember the current group for when the group closes.
        groupStack.push(lastGroup);

        // Make this new group the current group.
        lastGroup = group;
        last = group.stack;
        break;


      // Pop group out of stack.
      case ')':
        if (groupStack.length === 0) {
          util.error(regexpStr, `Unmatched ) at column ${i - 1}`);
        }
        lastGroup = groupStack.pop();

        // Check if this group has a PIPE.
        // To get back the correct last stack.
        last = lastGroup.options ?
          lastGroup.options[lastGroup.options.length - 1] : lastGroup.stack;
        break;


      // Use pipe character to give more choices.
      case '|':
        // Create array where options are if this is the first PIPE
        // in this clause.
        if (!lastGroup.options) {
          lastGroup.options = [lastGroup.stack];
          delete lastGroup.stack;
        }

        // Create a new stack and add to options for rest of clause.
        var stack = [];
        lastGroup.options.push(stack);
        last = stack;
        break;


      // Repetition.
      // For every repetition, remove last element from last stack
      // then insert back a RANGE object.
      // This design is chosen because there could be more than
      // one repetition symbols in a regex i.e. `a?+{2,3}`.
      case '{':
        var rs = /^(\d+)(,(\d+)?)?\}/.exec(str.slice(i)), min, max;
        if (rs !== null) {
          if (last.length === 0) {
            repeatErr(i);
          }
          min = parseInt(rs[1], 10);
          max = rs[2] ? rs[3] ? parseInt(rs[3], 10) : Infinity : min;
          i += rs[0].length;

          last.push({
            type: types$1.REPETITION,
            min,
            max,
            value: last.pop(),
          });
        } else {
          last.push({
            type: types$1.CHAR,
            value: 123,
          });
        }
        break;

      case '?':
        if (last.length === 0) {
          repeatErr(i);
        }
        last.push({
          type: types$1.REPETITION,
          min: 0,
          max: 1,
          value: last.pop(),
        });
        break;

      case '+':
        if (last.length === 0) {
          repeatErr(i);
        }
        last.push({
          type: types$1.REPETITION,
          min: 1,
          max: Infinity,
          value: last.pop(),
        });
        break;

      case '*':
        if (last.length === 0) {
          repeatErr(i);
        }
        last.push({
          type: types$1.REPETITION,
          min: 0,
          max: Infinity,
          value: last.pop(),
        });
        break;


      // Default is a character that is not `\[](){}?+*^$`.
      default:
        last.push({
          type: types$1.CHAR,
          value: c.charCodeAt(0),
        });
    }

  }

  // Check if any groups have not been closed.
  if (groupStack.length !== 0) {
    util.error(regexpStr, 'Unterminated group');
  }

  return start;
};

lib$1.exports.types = types$1;

var libExports = lib$1.exports;

/* eslint indent: 4 */


// Private helper class
class SubRange {
    constructor(low, high) {
        this.low = low;
        this.high = high;
        this.length = 1 + high - low;
    }

    overlaps(range) {
        return !(this.high < range.low || this.low > range.high);
    }

    touches(range) {
        return !(this.high + 1 < range.low || this.low - 1 > range.high);
    }

    // Returns inclusive combination of SubRanges as a SubRange.
    add(range) {
        return new SubRange(
            Math.min(this.low, range.low),
            Math.max(this.high, range.high)
        );
    }

    // Returns subtraction of SubRanges as an array of SubRanges.
    // (There's a case where subtraction divides it in 2)
    subtract(range) {
        if (range.low <= this.low && range.high >= this.high) {
            return [];
        } else if (range.low > this.low && range.high < this.high) {
            return [
                new SubRange(this.low, range.low - 1),
                new SubRange(range.high + 1, this.high)
            ];
        } else if (range.low <= this.low) {
            return [new SubRange(range.high + 1, this.high)];
        } else {
            return [new SubRange(this.low, range.low - 1)];
        }
    }

    toString() {
        return this.low == this.high ?
            this.low.toString() : this.low + '-' + this.high;
    }
}


let DRange$1 = class DRange {
    constructor(a, b) {
        this.ranges = [];
        this.length = 0;
        if (a != null) this.add(a, b);
    }

    _update_length() {
        this.length = this.ranges.reduce((previous, range) => {
            return previous + range.length;
        }, 0);
    }

    add(a, b) {
        var _add = (subrange) => {
            var i = 0;
            while (i < this.ranges.length && !subrange.touches(this.ranges[i])) {
                i++;
            }
            var newRanges = this.ranges.slice(0, i);
            while (i < this.ranges.length && subrange.touches(this.ranges[i])) {
                subrange = subrange.add(this.ranges[i]);
                i++;
            }
            newRanges.push(subrange);
            this.ranges = newRanges.concat(this.ranges.slice(i));
            this._update_length();
        };

        if (a instanceof DRange) {
            a.ranges.forEach(_add);
        } else {
            if (b == null) b = a;
            _add(new SubRange(a, b));
        }
        return this;
    }

    subtract(a, b) {
        var _subtract = (subrange) => {
            var i = 0;
            while (i < this.ranges.length && !subrange.overlaps(this.ranges[i])) {
                i++;
            }
            var newRanges = this.ranges.slice(0, i);
            while (i < this.ranges.length && subrange.overlaps(this.ranges[i])) {
                newRanges = newRanges.concat(this.ranges[i].subtract(subrange));
                i++;
            }
            this.ranges = newRanges.concat(this.ranges.slice(i));
            this._update_length();
        };

        if (a instanceof DRange) {
            a.ranges.forEach(_subtract);
        } else {
            if (b == null) b = a;
            _subtract(new SubRange(a, b));
        }
        return this;
    }

    intersect(a, b) {
        var newRanges = [];
        var _intersect = (subrange) => {
            var i = 0;
            while (i < this.ranges.length && !subrange.overlaps(this.ranges[i])) {
                i++;
            }
            while (i < this.ranges.length && subrange.overlaps(this.ranges[i])) {
                var low = Math.max(this.ranges[i].low, subrange.low);
                var high = Math.min(this.ranges[i].high, subrange.high);
                newRanges.push(new SubRange(low, high));
                i++;
            }
        };

        if (a instanceof DRange) {
            a.ranges.forEach(_intersect);
        } else {
            if (b == null) b = a;
            _intersect(new SubRange(a, b));
        }
        this.ranges = newRanges;
        this._update_length();
        return this;
    }

    index(index) {
        var i = 0;
        while (i < this.ranges.length && this.ranges[i].length <= index) {
            index -= this.ranges[i].length;
            i++;
        }
        return this.ranges[i].low + index;
    }

    toString() {
        return '[ ' + this.ranges.join(', ') + ' ]';
    }

    clone() {
        return new DRange(this);
    }

    numbers() {
        return this.ranges.reduce((result, subrange) => {
            var i = subrange.low;
            while (i <= subrange.high) {
                result.push(i);
                i++;
            }
            return result;
        }, []);
    }

    subranges() {
        return this.ranges.map((subrange) => ({
            low: subrange.low,
            high: subrange.high,
            length: 1 + subrange.high - subrange.low
        }));
    }
};

var lib = DRange$1;

const ret    = libExports;
const DRange = lib;
const types  = ret.types;


var randexp = class RandExp {
  /**
   * @constructor
   * @param {RegExp|String} regexp
   * @param {String} m
   */
  constructor(regexp, m) {
    this._setDefaults(regexp);
    if (regexp instanceof RegExp) {
      this.ignoreCase = regexp.ignoreCase;
      this.multiline = regexp.multiline;
      regexp = regexp.source;

    } else if (typeof regexp === 'string') {
      this.ignoreCase = m && m.indexOf('i') !== -1;
      this.multiline = m && m.indexOf('m') !== -1;
    } else {
      throw new Error('Expected a regexp or string');
    }

    this.tokens = ret(regexp);
  }


  /**
   * Checks if some custom properties have been set for this regexp.
   *
   * @param {RandExp} randexp
   * @param {RegExp} regexp
   */
  _setDefaults(regexp) {
    // When a repetitional token has its max set to Infinite,
    // randexp won't actually generate a random amount between min and Infinite
    // instead it will see Infinite as min + 100.
    this.max = regexp.max != null ? regexp.max :
      RandExp.prototype.max != null ? RandExp.prototype.max : 100;

    // This allows expanding to include additional characters
    // for instance: RandExp.defaultRange.add(0, 65535);
    this.defaultRange = regexp.defaultRange ?
      regexp.defaultRange : this.defaultRange.clone();

    if (regexp.randInt) {
      this.randInt = regexp.randInt;
    }
  }


  /**
   * Generates the random string.
   *
   * @return {String}
   */
  gen() {
    return this._gen(this.tokens, []);
  }


  /**
   * Generate random string modeled after given tokens.
   *
   * @param {Object} token
   * @param {Array.<String>} groups
   * @return {String}
   */
  _gen(token, groups) {
    var stack, str, n, i, l;

    switch (token.type) {
      case types.ROOT:
      case types.GROUP:
        // Ignore lookaheads for now.
        if (token.followedBy || token.notFollowedBy) { return ''; }

        // Insert placeholder until group string is generated.
        if (token.remember && token.groupNumber === undefined) {
          token.groupNumber = groups.push(null) - 1;
        }

        stack = token.options ?
          this._randSelect(token.options) : token.stack;

        str = '';
        for (i = 0, l = stack.length; i < l; i++) {
          str += this._gen(stack[i], groups);
        }

        if (token.remember) {
          groups[token.groupNumber] = str;
        }
        return str;

      case types.POSITION:
        // Do nothing for now.
        return '';

      case types.SET:
        var expandedSet = this._expand(token);
        if (!expandedSet.length) { return ''; }
        return String.fromCharCode(this._randSelect(expandedSet));

      case types.REPETITION:
        // Randomly generate number between min and max.
        n = this.randInt(token.min,
          token.max === Infinity ? token.min + this.max : token.max);

        str = '';
        for (i = 0; i < n; i++) {
          str += this._gen(token.value, groups);
        }

        return str;

      case types.REFERENCE:
        return groups[token.value - 1] || '';

      case types.CHAR:
        var code = this.ignoreCase && this._randBool() ?
          this._toOtherCase(token.value) : token.value;
        return String.fromCharCode(code);
    }
  }


  /**
   * If code is alphabetic, converts to other case.
   * If not alphabetic, returns back code.
   *
   * @param {Number} code
   * @return {Number}
   */
  _toOtherCase(code) {
    return code + (97 <= code && code <= 122 ? -32 :
      65 <= code && code <= 90  ?  32 : 0);
  }


  /**
   * Randomly returns a true or false value.
   *
   * @return {Boolean}
   */
  _randBool() {
    return !this.randInt(0, 1);
  }


  /**
   * Randomly selects and returns a value from the array.
   *
   * @param {Array.<Object>} arr
   * @return {Object}
   */
  _randSelect(arr) {
    if (arr instanceof DRange) {
      return arr.index(this.randInt(0, arr.length - 1));
    }
    return arr[this.randInt(0, arr.length - 1)];
  }


  /**
   * expands a token to a DiscontinuousRange of characters which has a
   * length and an index function (for random selecting)
   *
   * @param {Object} token
   * @return {DiscontinuousRange}
   */
  _expand(token) {
    if (token.type === ret.types.CHAR) {
      return new DRange(token.value);
    } else if (token.type === ret.types.RANGE) {
      return new DRange(token.from, token.to);
    } else {
      let drange = new DRange();
      for (let i = 0; i < token.set.length; i++) {
        let subrange = this._expand(token.set[i]);
        drange.add(subrange);
        if (this.ignoreCase) {
          for (let j = 0; j < subrange.length; j++) {
            let code = subrange.index(j);
            let otherCaseCode = this._toOtherCase(code);
            if (code !== otherCaseCode) {
              drange.add(otherCaseCode);
            }
          }
        }
      }
      if (token.not) {
        return this.defaultRange.clone().subtract(drange);
      } else {
        return this.defaultRange.clone().intersect(drange);
      }
    }
  }


  /**
   * Randomly generates and returns a number between a and b (inclusive).
   *
   * @param {Number} a
   * @param {Number} b
   * @return {Number}
   */
  randInt(a, b) {
    return a + Math.floor(Math.random() * (1 + b - a));
  }


  /**
   * Default range of characters to generate from.
   */
  get defaultRange() {
    return this._range = this._range || new DRange(32, 126);
  }

  set defaultRange(range) {
    this._range = range;
  }


  /**
   *
   * Enables use of randexp with a shorter call.
   *
   * @param {RegExp|String| regexp}
   * @param {String} m
   * @return {String}
   */
  static randexp(regexp, m) {
    var randexp;
    if(typeof regexp === 'string') {
      regexp = new RegExp(regexp, m);
    }

    if (regexp._randexp === undefined) {
      randexp = new RandExp(regexp, m);
      regexp._randexp = randexp;
    } else {
      randexp = regexp._randexp;
      randexp._setDefaults(regexp);
    }
    return randexp.gen();
  }


  /**
   * Enables sugary /regexp/.gen syntax.
   */
  static sugar() {
    /* eshint freeze:false */
    RegExp.prototype.gen = function() {
      return RandExp.randexp(this);
    };
  }
};

var RandExp = /*@__PURE__*/getDefaultExportFromCjs(randexp);

const ALPHABETS = "abcdefghijklmnopqrstuvwxyz";
/* -----------------------------------------------------------
  REGULAR
----------------------------------------------------------- */
const boolean$4 = () => Math.random() < 0.5;
const integer = (min, max) => {
    min ??= 0;
    max ??= 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const bigint$4 = (min, max) => BigInt(integer(Number(min ?? BigInt(0)), Number(max ?? BigInt(100))));
const number$4 = (min, max) => {
    min ??= 0;
    max ??= 100;
    return Math.random() * (max - min) + min;
};
const string$4 = (length) => new Array(length ?? integer(5, 10))
    .fill(0)
    .map(() => ALPHABETS[integer(0, ALPHABETS.length - 1)])
    .join("");
const array$2 = (closure, count, unique) => {
    count ??= length();
    unique ??= false;
    if (unique === false)
        return new Array(count ?? length())
            .fill(0)
            .map((_e, index) => closure(index));
    else {
        const set = new Set();
        while (set.size < count)
            set.add(closure(set.size));
        return Array.from(set);
    }
};
const pick = (array) => array[integer(0, array.length - 1)];
const length = () => integer(0, 3);
const pattern = (regex) => {
    const r = new RandExp(regex);
    for (let i = 0; i < 10; ++i) {
        const str = r.gen();
        if (regex.test(str))
            return str;
    }
    return r.gen();
};
/* -----------------------------------------------------------
  SECIAL FORMATS
----------------------------------------------------------- */
// SPECIAL CHARACTERS
const byte = () => "vt7ekz4lIoNTTS9sDQYdWKharxIFAR54+z/umIxSgUM=";
const password = () => string$4(integer(4, 16));
const regex = () => "/^(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)$/";
const uuid = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
});
// ADDRESSES
const email = () => `${string$4(10)}@${string$4(10)}.${string$4(3)}`;
const hostname = () => `${string$4(10)}.${string$4(3)}`;
const idnEmail = () => email();
const idnHostname = () => hostname();
const iri = () => url();
const iriReference = () => url();
const ipv4 = () => array$2(() => integer(0, 255), 4).join(".");
const ipv6 = () => array$2(() => integer(0, 65535).toString(16), 8).join(":");
const uri = () => url();
const uriReference = () => url();
const uriTemplate = () => url();
const url = () => `https://${string$4(10)}.${string$4(3)}`;
// TIMESTAMPS
const datetime = (min, max) => new Date(number$4(min ?? Date.now() - 30 * DAY, max ?? Date.now() + 7 * DAY)).toISOString();
const date = (min, max) => new Date(number$4(min ?? 0, max ?? Date.now() * 2))
    .toISOString()
    .substring(0, 10);
const time = () => new Date(number$4(0, DAY)).toISOString().substring(11);
const duration = () => {
    const period = durate([
        ["Y", integer(0, 100)],
        ["M", integer(0, 12)],
        ["D", integer(0, 31)],
    ]);
    const time = durate([
        ["H", integer(0, 24)],
        ["M", integer(0, 60)],
        ["S", integer(0, 60)],
    ]);
    if (period.length + time.length === 0)
        return "PT0S";
    return `P${period}${time.length ? "T" : ""}${time}`;
};
// POINTERS
const jsonPointer = () => `/components/schemas/${string$4(10)}`;
const relativeJsonPointer = () => `${integer(0, 10)}#`;
const DAY = 86400000;
const durate = (elements) => elements
    .filter(([_unit, value]) => value !== 0)
    .map(([unit, value]) => `${value}${unit}`)
    .join("");

var RandomGenerator = /*#__PURE__*/Object.freeze({
	__proto__: null,
	array: array$2,
	bigint: bigint$4,
	boolean: boolean$4,
	byte: byte,
	date: date,
	datetime: datetime,
	duration: duration,
	email: email,
	hostname: hostname,
	idnEmail: idnEmail,
	idnHostname: idnHostname,
	integer: integer,
	ipv4: ipv4,
	ipv6: ipv6,
	iri: iri,
	iriReference: iriReference,
	jsonPointer: jsonPointer,
	length: length,
	number: number$4,
	password: password,
	pattern: pattern,
	pick: pick,
	regex: regex,
	relativeJsonPointer: relativeJsonPointer,
	string: string$4,
	time: time,
	uri: uri,
	uriReference: uriReference,
	uriTemplate: uriTemplate,
	url: url,
	uuid: uuid
});

const $every = (array, pred) => {
    let error = null;
    for (let i = 0; i < array.length; ++i)
        if (null !== (error = pred(array[i], i)))
            return error;
    return null;
};

class TypeGuardError extends Error {
    method;
    path;
    expected;
    value;
    fake_expected_typed_value_;
    constructor(props) {
        // MESSAGE CONSTRUCTION
        super(props.message ||
            `Error on ${props.method}(): invalid type${props.path ? ` on ${props.path}` : ""}, expect to be ${props.expected}`);
        // INHERITANCE POLYFILL
        const proto = new.target.prototype;
        if (Object.setPrototypeOf)
            Object.setPrototypeOf(this, proto);
        else
            this.__proto__ = proto;
        // ASSIGN MEMBERS
        this.method = props.method;
        this.path = props.path;
        this.expected = props.expected;
        this.value = props.value;
    }
}

/**
 * @internal
 */
const $guard = (method) => (exceptionable, props, factory) => {
    if (exceptionable === true)
        throw (factory ?? ((props) => new TypeGuardError(props)))({
            method,
            path: props.path,
            expected: props.expected,
            value: props.value,
        });
    return false;
};

const $join = (str) => variable(str) ? `.${str}` : `[${JSON.stringify(str)}]`;
const variable = (str) => reserved(str) === false && /^[a-zA-Z_$][a-zA-Z_$0-9]*$/g.test(str);
const reserved = (str) => RESERVED.has(str);
const RESERVED = new Set([
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "enum",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "new",
    "null",
    "return",
    "super",
    "switch",
    "this",
    "throw",
    "true",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
]);

const $report = (array) => {
    const reportable = (path) => {
        if (array.length === 0)
            return true;
        const last = array[array.length - 1].path;
        return path.length > last.length || last.substring(0, path.length) !== path;
    };
    return (exceptable, error) => {
        if (exceptable && reportable(error.path))
            array.push(error);
        return false;
    };
};

const $is_between = (value, minimum, maximum) => minimum <= value && value <= maximum;

const $is_bigint_string = (str) => {
    try {
        BigInt(str);
        return true;
    }
    catch {
        return false;
    }
};

/**
 * @internal
 */
const is$1 = () => ({
    is_between: $is_between,
    is_bigint_string: $is_bigint_string,
});

const functionalAssert = () => ({
    errorFactory: (p) => new TypeGuardError(p),
});

const $number = (value) => {
    if (isFinite(value) === false)
        throw new TypeGuardError({
            method: "typia.json.stringify",
            expected: "number",
            value,
            message: "Error on typia.json.stringify(): infinite or not a number.",
        });
    return value;
};

const $rest = (str) => {
    return str.length === 2 ? "" : "," + str.substring(1, str.length - 1);
};

/**
 * In the past, name of `typia` was `typescript-json`, and supported
 * JSON serialization by wrapping `fast-json-stringify. `typescript-json` was
 * a helper library of `fast-json-stringify`, which can skip manual JSON schema
 * definition just by putting pure TypeScript type.
 *
 * This `$string` function is a part of `fast-json-stringify` at that time, and
 * still being used in `typia` for the string serialization.
 *
 * @internal
 * @reference https://github.com/fastify/fast-json-stringify/blob/master/lib/serializer.js
 * @blog https://dev.to/samchon/good-bye-typescript-is-ancestor-of-typia-20000x-faster-validator-49fi
 */
const $string = (str) => {
    const len = str.length;
    let result = "";
    let last = -1;
    let point = 255;
    // eslint-disable-next-line
    for (var i = 0; i < len; i++) {
        point = str.charCodeAt(i);
        if (point < 32) {
            return JSON.stringify(str);
        }
        if (point >= 0xd800 && point <= 0xdfff) {
            // The current character is a surrogate.
            return JSON.stringify(str);
        }
        if (point === 0x22 || // '"'
            point === 0x5c // '\'
        ) {
            last === -1 && (last = 0);
            result += str.slice(last, i) + "\\";
            last = i;
        }
    }
    return ((last === -1 && '"' + str + '"') || '"' + result + str.slice(last) + '"');
};

/**
 * @internal
 */
const $tail = (str) => str[str.length - 1] === "," ? str.substring(0, str.length - 1) : str;

const $throws = (method) => (props) => {
    throw new TypeGuardError({
        ...props,
        method: `typia.${method}`,
    });
};

const stringify$1 = (method) => ({
    ...is$1(),
    number: $number,
    string: $string,
    tail: $tail,
    rest: $rest,
    throws: $throws(`json.${method}`),
});

const boolean$3 = (input) => input instanceof File
    ? input
    : input === null
        ? undefined
        : input === "null"
            ? null
            : input.length === 0
                ? true
                : input === "true" || input === "1"
                    ? true
                    : input === "false" || input === "0"
                        ? false
                        : input; // wrong type
const number$3 = (input) => input instanceof File
    ? input
    : !!input?.length
        ? input === "null"
            ? null
            : toNumber$3(input)
        : undefined;
const bigint$3 = (input) => input instanceof File
    ? input
    : !!input?.length
        ? input === "null"
            ? null
            : toBigint$3(input)
        : undefined;
const string$3 = (input) => input instanceof File
    ? input
    : input === null
        ? undefined
        : input === "null"
            ? null
            : input;
const array$1 = (input, alternative) => input.length ? input : alternative;
const blob = (input) => input instanceof Blob
    ? input
    : input === null
        ? undefined
        : input === "null"
            ? null
            : input;
const file = (input) => input instanceof File
    ? input
    : input === null
        ? undefined
        : input === "null"
            ? null
            : input;
const toNumber$3 = (str) => {
    const value = Number(str);
    return isNaN(value) ? str : value;
};
const toBigint$3 = (str) => {
    try {
        return BigInt(str);
    }
    catch {
        return str;
    }
};

var $FormDataReader = /*#__PURE__*/Object.freeze({
	__proto__: null,
	array: array$1,
	bigint: bigint$3,
	blob: blob,
	boolean: boolean$3,
	file: file,
	number: number$3,
	string: string$3
});

const boolean$2 = (value) => value !== undefined
    ? value === "true"
        ? true
        : value === "false"
            ? false
            : value
    : undefined;
const bigint$2 = (value) => value !== undefined ? toBigint$2(value) : undefined;
const number$2 = (value) => value !== undefined ? toNumber$2(value) : undefined;
const string$2 = (value) => value;
const toBigint$2 = (str) => {
    try {
        return BigInt(str);
    }
    catch {
        return str;
    }
};
const toNumber$2 = (str) => {
    const value = Number(str);
    return isNaN(value) ? str : value;
};

var $HeadersReader = /*#__PURE__*/Object.freeze({
	__proto__: null,
	bigint: bigint$2,
	boolean: boolean$2,
	number: number$2,
	string: string$2
});

const boolean$1 = (value) => value !== "null"
    ? value === "true" || value === "1"
        ? true
        : value === "false" || value === "0"
            ? false
            : value
    : null;
const bigint$1 = (value) => value !== "null" ? toBigint$1(value) : null;
const number$1 = (value) => value !== "null" ? toNumber$1(value) : null;
const string$1 = (value) => (value !== "null" ? value : null);
const toNumber$1 = (str) => {
    const value = Number(str);
    return isNaN(value) ? str : value;
};
const toBigint$1 = (str) => {
    try {
        return BigInt(str);
    }
    catch {
        return str;
    }
};

var $ParameterReader = /*#__PURE__*/Object.freeze({
	__proto__: null,
	bigint: bigint$1,
	boolean: boolean$1,
	number: number$1,
	string: string$1
});

const boolean = (str) => str === null
    ? undefined
    : str === "null"
        ? null
        : str.length === 0
            ? true
            : str === "true" || str === "1"
                ? true
                : str === "false" || str === "0"
                    ? false
                    : str; // wrong type
const number = (str) => !!str?.length ? (str === "null" ? null : toNumber(str)) : undefined;
const bigint = (str) => !!str?.length ? (str === "null" ? null : toBigint(str)) : undefined;
const string = (str) => str === null ? undefined : str === "null" ? null : str;
const params = (input) => {
    if (typeof input === "string") {
        const index = input.indexOf("?");
        input = index === -1 ? "" : input.substring(index + 1);
        return new URLSearchParams(input);
    }
    return input;
};
const array = (input, alternative) => input.length ? input : alternative;
const toNumber = (str) => {
    const value = Number(str);
    return isNaN(value) ? str : value;
};
const toBigint = (str) => {
    try {
        return BigInt(str);
    }
    catch {
        return str;
    }
};

var $QueryReader = /*#__PURE__*/Object.freeze({
	__proto__: null,
	array: array,
	bigint: bigint,
	boolean: boolean,
	number: number,
	params: params,
	string: string
});

const formData$1 = () => $FormDataReader;
const headers$1 = () => $HeadersReader;
const parameter$1 = () => $ParameterReader;
const query$1 = () => $QueryReader;

const capitalize = (str) => str.length ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str;

function snake$2(str) {
    if (str.length === 0)
        return str;
    // PREFIX
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let prefix = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] === "_")
            prefix += "_";
        else
            break;
    }
    if (prefix.length !== 0)
        str = str.substring(prefix.length);
    const out = (s) => `${prefix}${s}`;
    // SNAKE CASE
    const items = str.split("_");
    if (items.length > 1)
        return out(items.map((s) => s.toLowerCase()).join("_"));
    // CAMEL OR PASCAL CASE
    const indexes = [];
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        if (65 <= code && code <= 90)
            indexes.push(i);
    }
    for (let i = indexes.length - 1; i > 0; --i) {
        const now = indexes[i];
        const prev = indexes[i - 1];
        if (now - prev === 1)
            indexes.splice(i, 1);
    }
    if (indexes.length !== 0 && indexes[0] === 0)
        indexes.splice(0, 1);
    if (indexes.length === 0)
        return str.toLowerCase();
    let ret = "";
    for (let i = 0; i < indexes.length; i++) {
        const first = i === 0 ? 0 : indexes[i - 1];
        const last = indexes[i];
        ret += str.substring(first, last).toLowerCase();
        ret += "_";
    }
    ret += str.substring(indexes[indexes.length - 1]).toLowerCase();
    return out(ret);
}
const camel$2 = (str) => unsnake({
    plain: (str) => str.length
        ? str === str.toUpperCase()
            ? str.toLocaleLowerCase()
            : `${str[0].toLowerCase()}${str.substring(1)}`
        : str,
    snake: (str, i) => i === 0 ? str.toLowerCase() : capitalize(str.toLowerCase()),
})(str);
const pascal$2 = (str) => unsnake({
    plain: (str) => str.length ? `${str[0].toUpperCase()}${str.substring(1)}` : str,
    snake: capitalize,
})(str);
const unsnake = (props) => (str) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let prefix = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] === "_")
            prefix += "_";
        else
            break;
    }
    if (prefix.length !== 0)
        str = str.substring(prefix.length);
    const out = (s) => `${prefix}${s}`;
    if (str.length === 0)
        return out("");
    const items = str.split("_").filter((s) => s.length !== 0);
    return items.length === 0
        ? out("")
        : items.length === 1
            ? out(props.plain(items[0]))
            : out(items.map(props.snake).join(""));
};

const $convention = (rename) => {
    const main = (input) => {
        if (typeof input === "object")
            if (input === null)
                return null;
            else if (Array.isArray(input))
                return input.map(main);
            else if (input instanceof Boolean ||
                input instanceof BigInt ||
                input instanceof Number ||
                input instanceof String)
                return input.valueOf();
            else if (input instanceof Date)
                return new Date(input);
            else if (input instanceof Uint8Array ||
                input instanceof Uint8ClampedArray ||
                input instanceof Uint16Array ||
                input instanceof Uint32Array ||
                input instanceof BigUint64Array ||
                input instanceof Int8Array ||
                input instanceof Int16Array ||
                input instanceof Int32Array ||
                input instanceof BigInt64Array ||
                input instanceof Float32Array ||
                input instanceof Float64Array ||
                input instanceof DataView)
                return input;
            else
                return object(input);
        return input;
    };
    const object = (input) => Object.fromEntries(Object.entries(input).map(([key, value]) => [rename(key), main(value)]));
    return main;
};

const camel$1 = (method) => ({
    ...base(method),
    any: $convention(camel$2),
});
const pascal$1 = (method) => ({
    ...base(method),
    any: $convention(pascal$2),
});
const snake$1 = (method) => ({
    ...base(method),
    any: $convention(snake$2),
});
const base = (method) => ({
    ...is$1(),
    throws: $throws(`notations.${method}`),
});

const $clone = (value) => $cloneMain(value);
const $cloneMain = (value) => {
    if (value === undefined)
        return undefined;
    else if (typeof value === "object")
        if (value === null)
            return null;
        else if (Array.isArray(value))
            return value.map($cloneMain);
        else if (value instanceof Date)
            return new Date(value);
        else if (value instanceof Uint8Array)
            return new Uint8Array(value);
        else if (value instanceof Uint8ClampedArray)
            return new Uint8ClampedArray(value);
        else if (value instanceof Uint16Array)
            return new Uint16Array(value);
        else if (value instanceof Uint32Array)
            return new Uint32Array(value);
        else if (value instanceof BigUint64Array)
            return new BigUint64Array(value);
        else if (value instanceof Int8Array)
            return new Int8Array(value);
        else if (value instanceof Int16Array)
            return new Int16Array(value);
        else if (value instanceof Int32Array)
            return new Int32Array(value);
        else if (value instanceof BigInt64Array)
            return new BigInt64Array(value);
        else if (value instanceof Float32Array)
            return new Float32Array(value);
        else if (value instanceof Float64Array)
            return new Float64Array(value);
        else if (value instanceof ArrayBuffer)
            return value.slice(0);
        else if (value instanceof SharedArrayBuffer)
            return value.slice(0);
        else if (value instanceof DataView)
            return new DataView(value.buffer.slice(0));
        else if (typeof File !== "undefined" && value instanceof File)
            return new File([value], value.name, { type: value.type });
        else if (typeof Blob !== "undefined" && value instanceof Blob)
            return new Blob([value], { type: value.type });
        else if (value instanceof Set)
            return new Set([...value].map($cloneMain));
        else if (value instanceof Map)
            return new Map([...value].map(([k, v]) => [$cloneMain(k), $cloneMain(v)]));
        else if (value instanceof WeakSet || value instanceof WeakMap)
            throw new Error("WeakSet and WeakMap are not supported");
        else if (value.valueOf() !== value)
            return $cloneMain(value.valueOf());
        else
            return Object.fromEntries(Object.entries(value)
                .map(([k, v]) => [k, $cloneMain(v)])
                .filter(([, v]) => v !== undefined));
    else if (typeof value === "function")
        return undefined;
    return value;
};

const $any = (val) => $clone(val);

const clone$1 = (method) => ({
    ...is$1(),
    throws: $throws(`misc.${method}`),
    any: $any,
});
const prune$1 = (method) => ({
    ...is$1(),
    throws: $throws(`misc.${method}`),
});

class Singleton {
    closure_;
    value_;
    constructor(closure) {
        this.closure_ = closure;
        this.value_ = NOT_MOUNTED_YET;
    }
    get(...args) {
        if (this.value_ === NOT_MOUNTED_YET)
            this.value_ = this.closure_(...args);
        return this.value_;
    }
}
const NOT_MOUNTED_YET = {};

/// @reference https://github.com/piotr-oles/as-proto/blob/main/packages/as-proto/assembly/internal/FixedReader.ts
class $ProtobufReader {
    /**
     * Read buffer
     */
    buf;
    /**
     * Read buffer pointer.
     */
    ptr;
    /**
     * DataView for buffer.
     */
    view;
    constructor(buf) {
        this.buf = buf;
        this.ptr = 0;
        this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    index() {
        return this.ptr;
    }
    size() {
        return this.buf.length;
    }
    uint32() {
        return this.varint32();
    }
    int32() {
        return this.varint32();
    }
    sint32() {
        const value = this.varint32();
        return (value >>> 1) ^ -(value & 1);
    }
    uint64() {
        return this.varint64();
    }
    int64() {
        return this.varint64();
    }
    sint64() {
        const value = this.varint64();
        return (value >> BigInt(0x01)) ^ -(value & BigInt(0x01));
    }
    bool() {
        return this.varint32() !== 0;
    }
    float() {
        const value = this.view.getFloat32(this.ptr, true);
        this.ptr += 4;
        return value;
    }
    double() {
        const value = this.view.getFloat64(this.ptr, true);
        this.ptr += 8;
        return value;
    }
    bytes() {
        const length = this.uint32();
        const from = this.ptr;
        this.ptr += length;
        return this.buf.subarray(from, from + length);
    }
    string() {
        return utf8$1.get().decode(this.bytes());
    }
    skip(length) {
        if (length === 0)
            while (this.u8() & 0x80)
                ;
        else {
            if (this.index() + length > this.size())
                throw new Error("Error on typia.protobuf.decode(): buffer overflow.");
            this.ptr += length;
        }
    }
    skipType(wireType) {
        switch (wireType) {
            case 0 /* ProtobufWire.VARIANT */:
                this.skip(0);
                break;
            case 1 /* ProtobufWire.I64 */:
                this.skip(8);
                break;
            case 2 /* ProtobufWire.LEN */:
                this.skip(this.uint32());
                break;
            case 3 /* ProtobufWire.START_GROUP */:
                while ((wireType = this.uint32() & 0x07) !== 4 /* ProtobufWire.END_GROUP */)
                    this.skipType(wireType);
                break;
            case 5 /* ProtobufWire.I32 */:
                this.skip(4);
                break;
            default:
                throw new Error(`Invalid wire type ${wireType} at offset ${this.ptr}.`);
        }
    }
    varint32() {
        let loaded;
        let value;
        value = (loaded = this.u8()) & 0x7f;
        if (loaded < 0x80)
            return value;
        value |= ((loaded = this.u8()) & 0x7f) << 7;
        if (loaded < 0x80)
            return value;
        value |= ((loaded = this.u8()) & 0x7f) << 14;
        if (loaded < 0x80)
            return value;
        value |= ((loaded = this.u8()) & 0x7f) << 21;
        if (loaded < 0x80)
            return value;
        value |= ((loaded = this.u8()) & 0xf) << 28;
        if (loaded < 0x80)
            return value;
        // increment position until there is no continuation bit or until we read 10 bytes
        if (this.u8() < 0x80)
            return value;
        if (this.u8() < 0x80)
            return value;
        if (this.u8() < 0x80)
            return value;
        if (this.u8() < 0x80)
            return value;
        if (this.u8() < 0x80)
            return value;
        return value;
    }
    varint64() {
        let loaded;
        let value;
        value = (loaded = this.u8n()) & BigInt(0x7f);
        if (loaded < BigInt(0x80))
            return value;
        value |= ((loaded = this.u8n()) & BigInt(0x7f)) << BigInt(7);
        if (loaded < BigInt(0x80))
            return value;
        value |= ((loaded = this.u8n()) & BigInt(0x7f)) << BigInt(14);
        if (loaded < BigInt(0x80))
            return value;
        value |= ((loaded = this.u8n()) & BigInt(0x7f)) << BigInt(21);
        if (loaded < BigInt(0x80))
            return value;
        value |= ((loaded = this.u8n()) & BigInt(0x7f)) << BigInt(28);
        if (loaded < BigInt(0x80))
            return value;
        value |= ((loaded = this.u8n()) & BigInt(0x7f)) << BigInt(35);
        if (loaded < BigInt(0x80))
            return value;
        value |= ((loaded = this.u8n()) & BigInt(0x7f)) << BigInt(42);
        if (loaded < BigInt(0x80))
            return value;
        value |= ((loaded = this.u8n()) & BigInt(0x7f)) << BigInt(49);
        if (loaded < BigInt(0x80))
            return value;
        value |= ((loaded = this.u8n()) & BigInt(0x7f)) << BigInt(56);
        if (loaded < BigInt(0x80))
            return value;
        value |= (this.u8n() & BigInt(0x01)) << BigInt(63);
        return BigInt.asIntN(64, value);
    }
    u8() {
        return this.view.getUint8(this.ptr++);
    }
    u8n() {
        return BigInt(this.u8());
    }
}
const utf8$1 = /** @__PURE__ */ new Singleton(() => new TextDecoder("utf-8"));

const $strlen = (str) => new Blob([str]).size;

/// @reference https://github.com/piotr-oles/as-proto/blob/main/packages/as-proto/assembly/internal/FixedSizer.ts
class $ProtobufSizer {
    /**
     * Total length.
     */
    len;
    /**
     * Position stack.
     */
    pos;
    /**
     * Variable length list.
     */
    varlen;
    /**
     * Variable length index stack.
     */
    varlenidx;
    constructor(length = 0) {
        this.len = length;
        this.pos = [];
        this.varlen = [];
        this.varlenidx = [];
    }
    bool() {
        this.len += 1;
    }
    int32(value) {
        if (value < 0) {
            // 10 bytes to encode negative number
            this.len += 10;
        }
        else {
            this.varint32(value);
        }
    }
    sint32(value) {
        this.varint32((value << 1) ^ (value >> 31));
    }
    uint32(value) {
        this.varint32(value);
    }
    int64(value) {
        this.varint64(typeof value === "number" ? BigInt(value) : value);
    }
    sint64(value) {
        if (typeof value === "number")
            value = BigInt(value);
        this.varint64((value << BigInt(1)) ^ (value >> BigInt(63)));
    }
    uint64(value) {
        this.varint64(typeof value === "number" ? BigInt(value) : value);
    }
    // public fixed32(_value: number): void {
    //     this.len += 4;
    // }
    // public sfixed32(_value: number): void {
    //     this.len += 4;
    // }
    // public fixed64(_value: number | bigint): void {
    //     this.len += 8;
    // }
    // public sfixed64(_value: number | bigint): void {
    //     this.len += 8;
    // }
    float(_value) {
        this.len += 4;
    }
    double(_value) {
        this.len += 8;
    }
    bytes(value) {
        this.uint32(value.byteLength);
        this.len += value.byteLength;
    }
    string(value) {
        const len = $strlen(value);
        this.varlen.push(len);
        this.uint32(len);
        this.len += len;
    }
    fork() {
        this.pos.push(this.len); // save current position
        this.varlenidx.push(this.varlen.length); // save current index in varlen array
        this.varlen.push(0); // add 0 length to varlen array (to be updated in ldelim())
    }
    ldelim() {
        if (!(this.pos.length && this.varlenidx.length))
            throw new Error("Error on typia.protobuf.encode(): missing fork() before ldelim() call.");
        const endPos = this.len; // current position is end position
        const startPos = this.pos.pop(); // get start position from stack
        const idx = this.varlenidx.pop(); // get varlen index from stack
        const len = endPos - startPos; // calculate length
        this.varlen[idx] = len; // update variable length
        this.uint32(len); // add uint32 that should be called in fork()
    }
    reset() {
        this.len = 0;
        // re-use arrays
        this.pos.length = 0;
        this.varlen.length = 0;
        this.varlenidx.length = 0;
    }
    varint32(value) {
        this.len +=
            value < 0
                ? 10 // 10 bits with leading 1's
                : value < 0x80
                    ? 1
                    : value < 0x4000
                        ? 2
                        : value < 0x200000
                            ? 3
                            : value < 0x10000000
                                ? 4
                                : 5;
    }
    varint64(val) {
        val = BigInt.asUintN(64, val);
        while (val > BigInt(0x7f)) {
            ++this.len;
            val = val >> BigInt(0x07);
        }
        ++this.len;
    }
}

/// @reference https://github.com/piotr-oles/as-proto/blob/main/packages/as-proto/assembly/internal/FixedWriter.ts
class $ProtobufWriter {
    /**
     * Related sizer
     */
    sizer;
    /**
     * Current pointer.
     */
    ptr;
    /**
     * Protobuf buffer.
     */
    buf;
    /**
     * DataView for buffer.
     */
    view;
    /**
     * Index in varlen array from sizer.
     */
    varlenidx;
    constructor(sizer) {
        this.sizer = sizer;
        this.buf = new Uint8Array(sizer.len);
        this.view = new DataView(this.buf.buffer);
        this.ptr = 0;
        this.varlenidx = 0;
    }
    buffer() {
        return this.buf;
    }
    bool(value) {
        this.byte(value ? 1 : 0);
    }
    byte(value) {
        this.buf[this.ptr++] = value & 255;
    }
    int32(value) {
        if (value < 0)
            this.int64(value);
        else
            this.variant32(value >>> 0);
    }
    sint32(value) {
        this.variant32((value << 1) ^ (value >> 31));
    }
    uint32(value) {
        this.variant32(value);
    }
    sint64(value) {
        value = BigInt(value);
        this.variant64((value << BigInt(0x01)) ^ (value >> BigInt(0x3f)));
    }
    int64(value) {
        this.variant64(BigInt(value));
    }
    uint64(value) {
        this.variant64(BigInt(value));
    }
    float(val) {
        this.view.setFloat32(this.ptr, val, true);
        this.ptr += 4;
    }
    double(val) {
        this.view.setFloat64(this.ptr, val, true);
        this.ptr += 8;
    }
    bytes(value) {
        this.uint32(value.byteLength);
        for (let i = 0; i < value.byteLength; i++)
            this.buf[this.ptr++] = value[i];
    }
    string(value) {
        const len = this.varlen(); // use precomputed length
        this.uint32(len);
        const binary = utf8.get().encode(value);
        for (let i = 0; i < binary.byteLength; i++)
            this.buf[this.ptr++] = binary[i];
    }
    fork() {
        this.uint32(this.varlen()); // use precomputed length
    }
    ldelim() {
        // nothing to do - all dirty work done by sizer
    }
    finish() {
        return this.buf;
    }
    reset() {
        this.buf = new Uint8Array(this.sizer.len);
        this.view = new DataView(this.buf.buffer);
        this.ptr = 0;
        this.varlenidx = 0;
    }
    variant32(val) {
        while (val > 0x7f) {
            this.buf[this.ptr++] = (val & 0x7f) | 0x80;
            val = val >>> 7;
        }
        this.buf[this.ptr++] = val;
    }
    variant64(val) {
        val = BigInt.asUintN(64, val);
        while (val > BigInt(0x7f)) {
            this.buf[this.ptr++] = Number((val & BigInt(0x7f)) | BigInt(0x80));
            val = val >> BigInt(0x07);
        }
        this.buf[this.ptr++] = Number(val);
    }
    varlen() {
        return this.varlenidx >= this.sizer.varlen.length
            ? 0
            : this.sizer.varlen[this.varlenidx++];
    }
}
const utf8 = /** @__PURE__ */ new Singleton(() => new TextEncoder());

const decode$1 = (method) => ({
    ...is$1(),
    Reader: $ProtobufReader,
    throws: $throws(`protobuf.${method}`),
});
const encode$1 = (method) => ({
    ...is$1(),
    Sizer: $ProtobufSizer,
    Writer: $ProtobufWriter,
    strlen: $strlen,
    throws: $throws(method),
});

var LlmTypeChecker;

(function(LlmTypeChecker) {
    LlmTypeChecker.visit = (schema, callback) => {
        callback(schema);
        if (LlmTypeChecker.isOneOf(schema)) schema.oneOf.forEach((s => LlmTypeChecker.visit(s, callback))); else if (LlmTypeChecker.isObject(schema)) {
            for (const [_, s] of Object.entries(schema.properties ?? {})) LlmTypeChecker.visit(s, callback);
            if (typeof schema.additionalProperties === "object" && schema.additionalProperties !== null) LlmTypeChecker.visit(schema.additionalProperties, callback);
        } else if (LlmTypeChecker.isArray(schema)) LlmTypeChecker.visit(schema.items, callback);
    };
    LlmTypeChecker.isOneOf = schema => schema.oneOf !== undefined;
    LlmTypeChecker.isObject = schema => schema.type === "object";
    LlmTypeChecker.isArray = schema => schema.type === "array";
    LlmTypeChecker.isBoolean = schema => schema.type === "boolean";
    LlmTypeChecker.isInteger = schema => schema.type === "integer";
    LlmTypeChecker.isNumber = schema => schema.type === "number";
    LlmTypeChecker.isString = schema => schema.type === "string";
    LlmTypeChecker.isNullOnly = schema => schema.type === "null";
    LlmTypeChecker.isNullable = schema => !LlmTypeChecker.isUnknown(schema) && (LlmTypeChecker.isNullOnly(schema) || (LlmTypeChecker.isOneOf(schema) ? schema.oneOf.some(LlmTypeChecker.isNullable) : schema.nullable === true));
    LlmTypeChecker.isUnknown = schema => !LlmTypeChecker.isOneOf(schema) && schema.type === undefined;
})(LlmTypeChecker || (LlmTypeChecker = {}));

var LlmSchemaSeparator;

(function(LlmSchemaSeparator) {
    LlmSchemaSeparator.parameters = props => {
        const indexes = props.parameters.map(LlmSchemaSeparator.schema(props.predicator));
        return {
            llm: indexes.map((([llm], index) => ({
                index,
                schema: llm
            }))).filter((({schema}) => schema !== null)),
            human: indexes.map((([, human], index) => ({
                index,
                schema: human
            }))).filter((({schema}) => schema !== null))
        };
    };
    LlmSchemaSeparator.schema = predicator => input => {
        if (predicator(input) === true) return [ null, input ]; else if (LlmTypeChecker.isUnknown(input) || LlmTypeChecker.isOneOf(input)) return [ input, null ]; else if (LlmTypeChecker.isObject(input)) return separateObject(predicator)(input); else if (LlmTypeChecker.isArray(input)) return separateArray(predicator)(input);
        return [ input, null ];
    };
    const separateArray = predicator => input => {
        const [x, y] = LlmSchemaSeparator.schema(predicator)(input.items);
        return [ x !== null ? {
            ...input,
            items: x
        } : null, y !== null ? {
            ...input,
            items: y
        } : null ];
    };
    const separateObject = predicator => input => {
        if (!!input.additionalProperties || Object.keys(input.properties ?? {}).length === 0) return [ input, null ];
        const llm = {
            ...input,
            properties: {}
        };
        const human = {
            ...input,
            properties: {}
        };
        for (const [key, value] of Object.entries(input.properties ?? {})) {
            const [x, y] = LlmSchemaSeparator.schema(predicator)(value);
            if (x !== null) llm.properties[key] = x;
            if (y !== null) human.properties[key] = y;
        }
        return [ Object.keys(llm.properties).length === 0 ? null : shrinkRequired(llm), Object.keys(human.properties).length === 0 ? null : shrinkRequired(human) ];
    };
    const shrinkRequired = input => {
        if (input.required !== undefined) input.required = input.required.filter((key => input.properties?.[key] !== undefined));
        return input;
    };
})(LlmSchemaSeparator || (LlmSchemaSeparator = {}));

const application$2 = () => ({
    finalize: (app, options) => {
        app.options = {
            separate: options?.separate ?? null,
        };
        if (app.options.separate === null)
            return;
        for (const func of app.functions)
            func.separated = LlmSchemaSeparator.parameters({
                parameters: func.parameters,
                predicator: app.options.separate,
            });
    },
});

const assert$1 = (method) => ({
    ...is$1(),
    join: $join,
    every: $every,
    guard: $guard(`typia.${method}`),
    predicate: (matched, exceptionable, closure) => {
        if (matched === false && exceptionable === true)
            throw new TypeGuardError({
                ...closure(),
                method: `typia.${method}`,
            });
        return matched;
    },
});
const validate$1 = () => ({
    ...is$1(),
    join: $join,
    report: $report,
    predicate: (res) => (matched, exceptionable, closure) => {
        // CHECK FAILURE
        if (matched === false && exceptionable === true)
            (() => {
                res.success &&= false;
                const errorList = res.errors;
                // TRACE ERROR
                const error = closure();
                if (errorList.length) {
                    const last = errorList[errorList.length - 1].path;
                    if (last.length >= error.path.length &&
                        last.substring(0, error.path.length) === error.path)
                        return;
                }
                errorList.push(error);
                return;
            })();
        return matched;
    },
});
const random$1 = () => ({
    generator: RandomGenerator,
    pick: pick,
});

/**
 * @internal
 */
function assertFunction() {
    halt$8("assertFunction");
}
const assertFunctionPure = /** @__PURE__ */ Object.assign(assertFunction, 
/** @__PURE__ */ assert$1("functional.assertFunction"), 
/** @__PURE__ */ functionalAssert());
const assertParametersPure = /** @__PURE__ */ Object.assign(assertFunction, 
/** @__PURE__ */ assert$1("functional.assertFunction"), 
/** @__PURE__ */ functionalAssert());
/**
 * @internal
 */
function assertReturn() {
    halt$8("assertReturn");
}
const assertReturnPure = /** @__PURE__ */ Object.assign(assertReturn, 
/** @__PURE__ */ assert$1("functional.assertReturn"), 
/** @__PURE__ */ functionalAssert());
/**
 * @internal
 */
function assertEqualsFunction() {
    halt$8("assertEqualsFunction");
}
const assertEqualsFunctionPure = /** @__PURE__ */ Object.assign(assertEqualsFunction, 
/** @__PURE__ */ assert$1("functional.assertEqualsFunction"), 
/** @__PURE__ */ functionalAssert());
/**
 * @internal
 */
function assertEqualsParameters() {
    halt$8("assertEqualsParameters");
}
const assertEqualsParametersPure = /** @__PURE__ */ Object.assign(assertEqualsParameters, 
/** @__PURE__ */ assert$1("functional.assertEqualsParameters"), 
/** @__PURE__ */ functionalAssert());
/**
 * @internal
 */
function assertEqualsReturn() {
    halt$8("assertEqualsReturn");
}
const assertEqualsReturnPure = /** @__PURE__ */ Object.assign(assertEqualsReturn, 
/** @__PURE__ */ assert$1("functional.assertEqualsReturn"), 
/** @__PURE__ */ functionalAssert());
/**
 * @internal
 */
function isFunction() {
    halt$8("isFunction");
}
const isFunctionPure = /** @__PURE__ */ Object.assign(isFunction, 
/** @__PURE__ */ is$1());
/**
 * @internal
 */
function isParameters() {
    halt$8("isParameters");
}
const isParametersPure = /** @__PURE__ */ Object.assign(isParameters, /** @__PURE__ */ is$1());
/**
 * @internal
 */
function isReturn() {
    halt$8("isReturn");
}
const isReturnPure = /** @__PURE__ */ Object.assign(isReturn, 
/** @__PURE__ */ is$1());
/**
 * @internal
 */
function equalsFunction() {
    halt$8("equalsFunction");
}
const equalsFunctionPure = /** @__PURE__ */ Object.assign(equalsFunction, /** @__PURE__ */ is$1());
/**
 * @internal
 */
function equalsParameters() {
    halt$8("equalsParameters");
}
const equalsParametersPure = /** @__PURE__ */ Object.assign(equalsParameters, /** @__PURE__ */ is$1());
/**
 * @internal
 */
function equalsReturn() {
    halt$8("equalsReturn");
}
const equalsReturnPure = /** @__PURE__ */ Object.assign(equalsReturn, /** @__PURE__ */ is$1());
/**
 * @internal
 */
function validateFunction() {
    halt$8("validateFunction");
}
const validateFunctionPure = /** @__PURE__ */ Object.assign(validateFunction, /** @__PURE__ */ validate$1());
/**
 * @internal
 */
function validateParameters() {
    halt$8("validateReturn");
}
const validateParametersPure = /** @__PURE__ */ Object.assign(validateParameters, /** @__PURE__ */ validate$1());
/**
 * @internal
 */
function validateReturn() {
    halt$8("validateReturn");
}
const validateReturnPure = /** @__PURE__ */ Object.assign(validateReturn, /** @__PURE__ */ validate$1());
/**
 * @internal
 */
function validateEqualsFunction() {
    halt$8("validateEqualsFunction");
}
const validateEqualsFunctionPure = /** @__PURE__ */ Object.assign(validateEqualsFunction, /** @__PURE__ */ validate$1());
/**
 * @internal
 */
function validateEqualsParameters() {
    halt$8("validateEqualsParameters");
}
const validateEqualsParametersPure = /** @__PURE__ */ Object.assign(validateEqualsParameters, /** @__PURE__ */ validate$1());
/**
 * @internal
 */
function validateEqualsReturn() {
    halt$8("validateEqualsReturn");
}
const validateEqualsReturnPure = /** @__PURE__ */ Object.assign(validateEqualsReturn, /** @__PURE__ */ validate$1());
/* -----------------------------------------------------------
  HALTER
----------------------------------------------------------- */
/**
 * @internal
 */
function halt$8(name) {
    throw new Error(`Error on typia.functional.${name}(): no transform has been configured. Read and follow https://typia.io/docs/setup please.`);
}

var functional = /*#__PURE__*/Object.freeze({
	__proto__: null,
	assertEqualsFunction: assertEqualsFunctionPure,
	assertEqualsParameters: assertEqualsParametersPure,
	assertEqualsReturn: assertEqualsReturnPure,
	assertFunction: assertFunctionPure,
	assertParameters: assertParametersPure,
	assertReturn: assertReturnPure,
	equalsFunction: equalsFunctionPure,
	equalsParameters: equalsParametersPure,
	equalsReturn: equalsReturnPure,
	isFunction: isFunctionPure,
	isParameters: isParametersPure,
	isReturn: isReturnPure,
	validateEqualsFunction: validateEqualsFunctionPure,
	validateEqualsParameters: validateEqualsParametersPure,
	validateEqualsReturn: validateEqualsReturnPure,
	validateFunction: validateFunctionPure,
	validateParameters: validateParametersPure,
	validateReturn: validateReturnPure
});

/**
 * @internal
 */
function formData() {
    halt$7("formData");
}
const formDataPure = /** @__PURE__ */ Object.assign(formData, 
/** @__PURE__ */ formData$1());
/**
 * @internal
 */
function assertFormData() {
    halt$7("assertFormData");
}
const assertFormDataPure = /** @__PURE__ */ Object.assign(assertFormData, 
/** @__PURE__ */ formData$1(), 
/** @__PURE__ */ assert$1("http.assertFormData"));
/**
 * @internal
 */
function isFormData() {
    halt$7("isFormData");
}
const isFormDataPure = /** @__PURE__ */ Object.assign(isFormData, 
/** @__PURE__ */ formData$1(), 
/** @__PURE__ */ is$1());
/**
 * @internal
 */
function validateFormData() {
    halt$7("validateFormData");
}
const validateFormDataPure = /** @__PURE__ */ Object.assign(validateFormData, 
/** @__PURE__ */ formData$1(), 
/** @__PURE__ */ validate$1());
/**
 * @internal
 */
function query() {
    halt$7("query");
}
const queryPure = /** @__PURE__ */ Object.assign(query, 
/** @__PURE__ */ query$1());
/**
 * @internal
 */
function assertQuery() {
    halt$7("assertQuery");
}
const assertQueryPure = /** @__PURE__ */ Object.assign(assertQuery, 
/** @__PURE__ */ query$1(), 
/** @__PURE__ */ assert$1("http.assertQuery"));
/**
 * @internal
 */
function isQuery() {
    halt$7("isQuery");
}
const isQueryPure = /** @__PURE__ */ Object.assign(isQuery, 
/** @__PURE__ */ query$1(), 
/** @__PURE__ */ is$1());
/**
 * @internal
 */
function validateQuery() {
    halt$7("validateQuery");
}
const validateQueryPure = /** @__PURE__ */ Object.assign(validateQuery, 
/** @__PURE__ */ query$1(), 
/** @__PURE__ */ validate$1());
/**
 * @internal
 */
function headers() {
    halt$7("headers");
}
const headersPure = /** @__PURE__ */ Object.assign(headers, 
/** @__PURE__ */ headers$1());
/**
 * @internal
 */
function assertHeaders() {
    halt$7("assertHeaders");
}
const assertHeadersPure = /** @__PURE__ */ Object.assign(assertHeaders, 
/** @__PURE__ */ headers$1(), 
/** @__PURE__ */ assert$1("http.assertHeaders"));
/**
 * @internal
 */
function isHeaders() {
    halt$7("isHeaders");
}
const isHeadersPure = /** @__PURE__ */ Object.assign(isHeaders, 
/** @__PURE__ */ headers$1(), 
/** @__PURE__ */ is$1());
/**
 * @internal
 */
function validateHeaders() {
    halt$7("validateHeaders");
}
const validateHeadersPure = /** @__PURE__ */ Object.assign(validateHeaders, 
/** @__PURE__ */ headers$1(), 
/** @__PURE__ */ validate$1());
/**
 * @internal
 */
function parameter() {
    halt$7("parameter");
}
const parameterPure = /** @__PURE__ */ Object.assign(parameter, 
/** @__PURE__ */ parameter$1(), 
/** @__PURE__ */ assert$1("http.parameter"));
/**
 * @internal
 */
function createFormData() {
    halt$7("createFormData");
}
const createFormDataPure = /** @__PURE__ */ Object.assign(createFormData, /** @__PURE__ */ formData$1());
/**
 * @internal
 */
function createAssertFormData() {
    halt$7("createAssertFormData");
}
const createAssertFormDataPure = /** @__PURE__ */ Object.assign(createAssertFormData, 
/** @__PURE__ */ formData$1(), 
/** @__PURE__ */ assert$1("http.createAssertFormData"));
/**
 * @internal
 */
function createIsFormData() {
    halt$7("createIsFormData");
}
const createIsFormDataPure = /** @__PURE__ */ Object.assign(createIsFormData, 
/** @__PURE__ */ formData$1(), 
/** @__PURE__ */ is$1());
/**
 * @internal
 */
function createValidateFormData() {
    halt$7("createValidateFormData");
}
const createValidateFormDataPure = /** @__PURE__ */ Object.assign(createValidateFormData, 
/** @__PURE__ */ formData$1(), 
/** @__PURE__ */ validate$1());
/**
 * @internal
 */
function createQuery() {
    halt$7("createQuery");
}
const createQueryPure = /** @__PURE__ */ Object.assign(createQuery, 
/** @__PURE__ */ query$1());
/**
 * @internal
 */
function createAssertQuery() {
    halt$7("createAssertQuery");
}
const createAssertQueryPure = /** @__PURE__ */ Object.assign(createAssertQuery, 
/** @__PURE__ */ query$1(), 
/** @__PURE__ */ assert$1("http.createAssertQuery"));
/**
 * @internal
 */
function createIsQuery() {
    halt$7("createIsQuery");
}
const createIsQueryPure = /** @__PURE__ */ Object.assign(createIsQuery, 
/** @__PURE__ */ query$1(), 
/** @__PURE__ */ is$1());
/**
 * @internal
 */
function createValidateQuery() {
    halt$7("createValidateQuery");
}
const createValidateQueryPure = /** @__PURE__ */ Object.assign(createValidateQuery, 
/** @__PURE__ */ query$1(), 
/** @__PURE__ */ validate$1());
/**
 * @internal
 */
function createHeaders() {
    halt$7("createHeaders");
}
const createHeadersPure = /** @__PURE__ */ Object.assign(createHeaders, /** @__PURE__ */ headers$1());
/**
 * @internal
 */
function createAssertHeaders() {
    halt$7("createAssertHeaders");
}
const createAssertHeadersPure = /** @__PURE__ */ Object.assign(createAssertHeaders, 
/** @__PURE__ */ headers$1(), 
/** @__PURE__ */ assert$1("http.createAssertHeaders"));
/**
 * @internal
 */
function createIsHeaders() {
    halt$7("createIsHeaders");
}
const createIsHeadersPure = /** @__PURE__ */ Object.assign(createIsHeaders, 
/** @__PURE__ */ headers$1(), 
/** @__PURE__ */ is$1());
/**
 * @internal
 */
function createValidateHeaders() {
    halt$7("createValidateHeaders");
}
const createValidateHeadersPure = /** @__PURE__ */ Object.assign(createValidateHeaders, 
/** @__PURE__ */ headers$1(), 
/** @__PURE__ */ validate$1());
/**
 * @internal
 */
function createParameter() {
    halt$7("createParameter");
}
const createParameterPure = /** @__PURE__ */ Object.assign(createParameter, 
/** @__PURE__ */ parameter$1(), 
/** @__PURE__ */ assert$1("http.createParameter"));
/**
 * @internal
 */
function halt$7(name) {
    throw new Error(`Error on typia.http.${name}(): no transform has been configured. Read and follow https://typia.io/docs/setup please.`);
}

var http = /*#__PURE__*/Object.freeze({
	__proto__: null,
	assertFormData: assertFormDataPure,
	assertHeaders: assertHeadersPure,
	assertQuery: assertQueryPure,
	createAssertFormData: createAssertFormDataPure,
	createAssertHeaders: createAssertHeadersPure,
	createAssertQuery: createAssertQueryPure,
	createFormData: createFormDataPure,
	createHeaders: createHeadersPure,
	createIsFormData: createIsFormDataPure,
	createIsHeaders: createIsHeadersPure,
	createIsQuery: createIsQueryPure,
	createParameter: createParameterPure,
	createQuery: createQueryPure,
	createValidateFormData: createValidateFormDataPure,
	createValidateHeaders: createValidateHeadersPure,
	createValidateQuery: createValidateQueryPure,
	formData: formDataPure,
	headers: headersPure,
	isFormData: isFormDataPure,
	isHeaders: isHeadersPure,
	isQuery: isQueryPure,
	parameter: parameterPure,
	query: queryPure,
	validateFormData: validateFormDataPure,
	validateHeaders: validateHeadersPure,
	validateQuery: validateQueryPure
});

/**
 * @internal
 */
function application$1() {
    halt$6("application");
}
const applicationPure = /** @__PURE__ */ Object.assign(application$1, 
/** @__PURE__ */ application$2());
/**
 * @internal
 */
function schema() {
    halt$6("schema");
}
/**
 * @internal
 */
function halt$6(name) {
    throw new Error(`Error on typia.llm.${name}(): no transform has been configured. Read and follow https://typia.io/docs/setup please.`);
}

var llm = /*#__PURE__*/Object.freeze({
	__proto__: null,
	application: applicationPure,
	schema: schema
});

/**
 * @internal
 */
function application() {
    halt$5("application");
}
/**
 * @internal
 */
function assertParse() {
    halt$5("assertParse");
}
const assertParsePure = /** @__PURE__ */ Object.assign(assertParse, 
/** @__PURE__ */ assert$1("json.assertParse"));
/**
 * @internal
 */
function isParse() {
    halt$5("isParse");
}
const isParsePure = /** @__PURE__ */ Object.assign(isParse, 
/** @__PURE__ */ is$1());
/**
 * @internal
 */
function validateParse() {
    halt$5("validateParse");
}
const validateParsePure = /** @__PURE__ */ Object.assign(validateParse, /** @__PURE__ */ validate$1());
/**
 * @internal
 */
function stringify() {
    halt$5("stringify");
}
const stringifyPure = /** @__PURE__ */ Object.assign(stringify, 
/** @__PURE__ */ stringify$1("stringify"));
/**
 * @internal
 */
function assertStringify() {
    halt$5("assertStringify");
}
const assertStringifyPure = /** @__PURE__ */ Object.assign(assertStringify, 
/** @__PURE__ */ assert$1("json.assertStringify"), 
/** @__PURE__ */ stringify$1("assertStringify"));
/**
 * @internal
 */
function isStringify() {
    halt$5("isStringify");
}
const isStringifyPure = /** @__PURE__ */ Object.assign(isStringify, 
/** @__PURE__ */ is$1(), 
/** @__PURE__ */ stringify$1("isStringify"));
/**
 * @internal
 */
function validateStringify() {
    halt$5("validateStringify");
}
const validateStringifyPure = /** @__PURE__ */ Object.assign(validateStringify, 
/** @__PURE__ */ validate$1(), 
/** @__PURE__ */ stringify$1("validateStringify"));
/**
 * @internal
 */
function createIsParse() {
    halt$5("createIsParse");
}
const createIsParsePure = /** @__PURE__ */ Object.assign(createIsParse, isParsePure);
/**
 * @internal
 */
function createAssertParse() {
    halt$5("createAssertParse");
}
const createAssertParsePure = /** @__PURE__ */ Object.assign(createAssertParse, assertParsePure);
/**
 * @internal
 */
function createValidateParse() {
    halt$5("createValidateParse");
}
const createValidateParsePure = /** @__PURE__ */ Object.assign(createValidateParse, validateParsePure);
/**
 * @internal
 */
function createStringify() {
    halt$5("createStringify");
}
const createStringifyPure = /** @__PURE__ */ Object.assign(createStringify, stringifyPure);
/**
 * @internal
 */
function createAssertStringify() {
    halt$5("createAssertStringify");
}
const createAssertStringifyPure = /** @__PURE__ */ Object.assign(createAssertStringify, assertStringifyPure);
/**
 * @internal
 */
function createIsStringify() {
    halt$5("createIsStringify");
}
const createIsStringifyPure = /** @__PURE__ */ Object.assign(createIsStringify, isStringifyPure);
/**
 * @internal
 */
function createValidateStringify() {
    halt$5("createValidateStringify");
}
const createValidateStringifyPure = /** @__PURE__ */ Object.assign(createValidateStringify, validateStringifyPure);
/**
 * @internal
 */
function halt$5(name) {
    throw new Error(`Error on typia.json.${name}(): no transform has been configured. Read and follow https://typia.io/docs/setup please.`);
}

var json = /*#__PURE__*/Object.freeze({
	__proto__: null,
	application: application,
	assertParse: assertParsePure,
	assertStringify: assertStringifyPure,
	createAssertParse: createAssertParsePure,
	createAssertStringify: createAssertStringifyPure,
	createIsParse: createIsParsePure,
	createIsStringify: createIsStringifyPure,
	createStringify: createStringifyPure,
	createValidateParse: createValidateParsePure,
	createValidateStringify: createValidateStringifyPure,
	isParse: isParsePure,
	isStringify: isStringifyPure,
	stringify: stringifyPure,
	validateParse: validateParsePure,
	validateStringify: validateStringifyPure
});

/* ===========================================================
    MISCELLAENOUS
      - LITERALS
      - CLONE
      - PRUNE
      - FACTORY FUNCTIONS
==============================================================
    LITERALS
----------------------------------------------------------- */
/**
 * @internal
 */
function literals() {
    halt$4("literals");
}
/**
 * @internal
 */
function clone() {
    halt$4("clone");
}
const clonePure = /** @__PURE__ */ Object.assign(clone, 
/** @__PURE__ */ clone$1("clone"));
/**
 * @internal
 */
function assertClone() {
    halt$4("assertClone");
}
const assertClonePure = /** @__PURE__ */ Object.assign(assertClone, 
/** @__PURE__ */ assert$1("misc.assertClone"), 
/** @__PURE__ */ clone$1("assertClone"));
/**
 * @internal
 */
function isClone() {
    halt$4("isClone");
}
const isClonePure = /** @__PURE__ */ Object.assign(isClone, 
/** @__PURE__ */ is$1(), 
/** @__PURE__ */ clone$1("isClone"));
/**
 * @internal
 */
function validateClone() {
    halt$4("validateClone");
}
const validateClonePure = /** @__PURE__ */ Object.assign(validateClone, 
/** @__PURE__ */ validate$1(), 
/** @__PURE__ */ clone$1("validateClone"));
/**
 * @internal
 */
function prune() {
    halt$4("prune");
}
const prunePure = /** @__PURE__ */ Object.assign(prune, 
/** @__PURE__ */ prune$1("prune"));
/**
 * @internal
 */
function assertPrune() {
    halt$4("assertPrune");
}
const assertPrunePure = /** @__PURE__ */ Object.assign(assertPrune, 
/** @__PURE__ */ assert$1("misc.assertPrune"), 
/** @__PURE__ */ prune$1("assertPrune"));
/**
 * @internal
 */
function isPrune() {
    halt$4("isPrune");
}
const isPrunePure = /** @__PURE__ */ Object.assign(isPrune, 
/** @__PURE__ */ is$1(), 
/** @__PURE__ */ prune$1("isPrune"));
/**
 * @internal
 */
function validatePrune() {
    halt$4("validatePrune");
}
const validatePrunePure = /** @__PURE__ */ Object.assign(validatePrune, 
/** @__PURE__ */ prune$1("validatePrune"), 
/** @__PURE__ */ validate$1());
/**
 * @internal
 */
function createClone() {
    halt$4("createClone");
}
const createClonePure = /** @__PURE__ */ Object.assign(createClone, clonePure);
/**
 * @internal
 */
function createAssertClone() {
    halt$4("createAssertClone");
}
const createAssertClonePure = /** @__PURE__ */ Object.assign(createAssertClone, assertClonePure);
/**
 * @internal
 */
function createIsClone() {
    halt$4("createIsClone");
}
const createIsClonePure = /** @__PURE__ */ Object.assign(createIsClone, isClonePure);
/**
 * @internal
 */
function createValidateClone() {
    halt$4("createValidateClone");
}
const createValidateClonePure = /** @__PURE__ */ Object.assign(createValidateClone, validateClonePure);
/**
 * @internal
 */
function createPrune() {
    halt$4("createPrune");
}
const createPrunePure = /** @__PURE__ */ Object.assign(createPrune, prunePure);
/**
 * @internal
 */
function createAssertPrune() {
    halt$4("createAssertPrune");
}
const createAssertPrunePure = /** @__PURE__ */ Object.assign(createAssertPrune, assertPrunePure);
/**
 * @internal
 */
function createIsPrune() {
    halt$4("createIsPrune");
}
const createIsPrunePure = /** @__PURE__ */ Object.assign(createIsPrune, isPrunePure);
/**
 * @internal
 */
function createValidatePrune() {
    halt$4("createValidatePrune");
}
const createValidatePrunePure = /** @__PURE__ */ Object.assign(createValidatePrune, validatePrunePure);
/**
 * @internal
 */
function halt$4(name) {
    throw new Error(`Error on typia.misc.${name}(): no transform has been configured. Read and follow https://typia.io/docs/setup please.`);
}

var misc = /*#__PURE__*/Object.freeze({
	__proto__: null,
	assertClone: assertClonePure,
	assertPrune: assertPrunePure,
	clone: clonePure,
	createAssertClone: createAssertClonePure,
	createAssertPrune: createAssertPrunePure,
	createClone: createClonePure,
	createIsClone: createIsClonePure,
	createIsPrune: createIsPrunePure,
	createPrune: createPrunePure,
	createValidateClone: createValidateClonePure,
	createValidatePrune: createValidatePrunePure,
	isClone: isClonePure,
	isPrune: isPrunePure,
	literals: literals,
	prune: prunePure,
	validateClone: validateClonePure,
	validatePrune: validatePrunePure
});

/**
 * @internal
 */
function camel() {
    return halt$3("camel");
}
const camelPure = /** @__PURE__ */ Object.assign(camel, 
/** @__PURE__ */ camel$1("camel"));
/**
 * @internal
 */
function assertCamel() {
    return halt$3("assertCamel");
}
const assertCamelPure = /** @__PURE__ */ Object.assign(assertCamel, 
/** @__PURE__ */ camel$1("assertCamel"), 
/** @__PURE__ */ assert$1("notations.assertCamel"));
/**
 * @internal
 */
function isCamel() {
    return halt$3("isCamel");
}
const isCamelPure = /** @__PURE__ */ Object.assign(isCamel, 
/** @__PURE__ */ camel$1("isCamel"), 
/** @__PURE__ */ is$1());
/**
 * @internal
 */
function validateCamel() {
    return halt$3("validateCamel");
}
const validateCamelPure = /** @__PURE__ */ Object.assign(validateCamel, 
/** @__PURE__ */ camel$1("validateCamel"), 
/** @__PURE__ */ validate$1());
/**
 * @internal
 */
function pascal() {
    return halt$3("pascal");
}
const pascalPure = /** @__PURE__ */ Object.assign(pascal, 
/** @__PURE__ */ pascal$1("pascal"));
/**
 * @internal
 */
function assertPascal() {
    return halt$3("assertPascal");
}
const assertPascalPure = /** @__PURE__ */ Object.assign(assertPascal, 
/** @__PURE__ */ pascal$1("assertPascal"), 
/** @__PURE__ */ assert$1("notations.assertPascal"));
/**
 * @internal
 */
function isPascal() {
    return halt$3("isPascal");
}
const isPascalPure = /** @__PURE__ */ Object.assign(isPascal, 
/** @__PURE__ */ pascal$1("isPascal"), 
/** @__PURE__ */ is$1());
/**
 * @internal
 */
function validatePascal() {
    return halt$3("validatePascal");
}
const validatePascalPure = /** @__PURE__ */ Object.assign(validatePascal, 
/** @__PURE__ */ pascal$1("validatePascal"), 
/** @__PURE__ */ validate$1());
/**
 * @internal
 */
function snake() {
    return halt$3("snake");
}
const snakePure = /** @__PURE__ */ Object.assign(snake, 
/** @__PURE__ */ snake$1("snake"));
/**
 * @internal
 */
function assertSnake() {
    return halt$3("assertSnake");
}
const assertSnakePure = /** @__PURE__ */ Object.assign(assertSnake, 
/** @__PURE__ */ snake$1("assertSnake"), 
/** @__PURE__ */ assert$1("notations.assertSnake"));
/**
 * @internal
 */
function isSnake() {
    return halt$3("isSnake");
}
const isSnakePure = /** @__PURE__ */ Object.assign(isSnake, 
/** @__PURE__ */ snake$1("isSnake"), 
/** @__PURE__ */ is$1());
/**
 * @internal
 */
function validateSnake() {
    return halt$3("validateSnake");
}
const validateSnakePure = /** @__PURE__ */ Object.assign(validateSnake, 
/** @__PURE__ */ snake$1("validateSnake"), 
/** @__PURE__ */ validate$1());
/**
 * @internal
 */
function createCamel() {
    halt$3("createCamel");
}
const createCamelPure = /** @__PURE__ */ Object.assign(createCamel, 
/** @__PURE__ */ camel$1("createCamel"));
/**
 * @internal
 */
function createAssertCamel() {
    halt$3("createAssertCamel");
}
const createAssertCamelPure = /** @__PURE__ */ Object.assign(createAssertCamel, 
/** @__PURE__ */ camel$1("createAssertCamel"), 
/** @__PURE__ */ assert$1("notations.createAssertCamel"));
/**
 * @internal
 */
function createIsCamel() {
    halt$3("createIsCamel");
}
const createIsCamelPure = /** @__PURE__ */ Object.assign(createIsCamel, 
/** @__PURE__ */ camel$1("createIsCamel"), 
/** @__PURE__ */ is$1());
/**
 * @internal
 */
function createValidateCamel() {
    halt$3("createValidateCamel");
}
const createValidateCamelPure = /** @__PURE__ */ Object.assign(createValidateCamel, 
/** @__PURE__ */ camel$1("createValidateCamel"), 
/** @__PURE__ */ validate$1());
/**
 * @internal
 */
function createPascal() {
    halt$3("createPascal");
}
const createPascalPure = /** @__PURE__ */ Object.assign(createPascal, /** @__PURE__ */ pascal$1("createPascal"));
/**
 * @internal
 */
function createAssertPascal() {
    halt$3("createAssertPascal");
}
const createAssertPascalPure = /** @__PURE__ */ Object.assign(createAssertPascal, 
/** @__PURE__ */ pascal$1("createAssertPascal"), 
/** @__PURE__ */ assert$1("notations.createAssertPascal"));
/**
 * @internal
 */
function createIsPascal() {
    halt$3("createIsPascal");
}
const createIsPascalPure = /** @__PURE__ */ Object.assign(createIsPascal, 
/** @__PURE__ */ pascal$1("createIsPascal"), 
/** @__PURE__ */ is$1());
/**
 * @internal
 */
function createValidatePascal() {
    halt$3("createValidatePascal");
}
const createValidatePascalPure = /** @__PURE__ */ Object.assign(createValidatePascal, 
/** @__PURE__ */ pascal$1("createValidatePascal"), 
/** @__PURE__ */ validate$1());
/**
 * @internal
 */
function createSnake() {
    halt$3("createSnake");
}
const createSnakePure = /** @__PURE__ */ Object.assign(createSnake, 
/** @__PURE__ */ snake$1("createSnake"));
/**
 * @internal
 */
function createAssertSnake() {
    halt$3("createAssertSnake");
}
const createAssertSnakePure = /** @__PURE__ */ Object.assign(createAssertSnake, 
/** @__PURE__ */ snake$1("createAssertSnake"), 
/** @__PURE__ */ assert$1("notations.createAssertSnake"));
/**
 * @internal
 */
function createIsSnake() {
    halt$3("createIsSnake");
}
const createIsSnakePure = /** @__PURE__ */ Object.assign(createIsSnake, 
/** @__PURE__ */ snake$1("createIsSnake"), 
/** @__PURE__ */ is$1());
/**
 * @internal
 */
function createValidateSnake() {
    halt$3("createValidateSnake");
}
const createValidateSnakePure = /** @__PURE__ */ Object.assign(createValidateSnake, 
/** @__PURE__ */ snake$1("createValidateSnake"), 
/** @__PURE__ */ validate$1());
/**
 * @internal
 */
function halt$3(name) {
    throw new Error(`Error on typia.notations.${name}(): no transform has been configured. Read and follow https://typia.io/docs/setup please.`);
}

var notations = /*#__PURE__*/Object.freeze({
	__proto__: null,
	assertCamel: assertCamelPure,
	assertPascal: assertPascalPure,
	assertSnake: assertSnakePure,
	camel: camelPure,
	createAssertCamel: createAssertCamelPure,
	createAssertPascal: createAssertPascalPure,
	createAssertSnake: createAssertSnakePure,
	createCamel: createCamelPure,
	createIsCamel: createIsCamelPure,
	createIsPascal: createIsPascalPure,
	createIsSnake: createIsSnakePure,
	createPascal: createPascalPure,
	createSnake: createSnakePure,
	createValidateCamel: createValidateCamelPure,
	createValidatePascal: createValidatePascalPure,
	createValidateSnake: createValidateSnakePure,
	isCamel: isCamelPure,
	isPascal: isPascalPure,
	isSnake: isSnakePure,
	pascal: pascalPure,
	snake: snakePure,
	validateCamel: validateCamelPure,
	validatePascal: validatePascalPure,
	validateSnake: validateSnakePure
});

/**
 * @internal
 */
function message() {
    halt$2("message");
}
/**
 * @internal
 */
function decode() {
    halt$2("decode");
}
const decodePure = /** @__PURE__ */ Object.assign(decode, 
/** @__PURE__ */ decode$1("decode"));
/**
 * @internal
 */
function assertDecode() {
    halt$2("assertDecode");
}
const assertDecodePure = /** @__PURE__ */ Object.assign(assertDecode, 
/** @__PURE__ */ assert$1("protobuf.assertDecode"), 
/** @__PURE__ */ decode$1("assertDecode"));
/**
 * @internal
 */
function isDecode() {
    halt$2("isDecode");
}
const isDecodePure = /** @__PURE__ */ Object.assign(isDecode, 
/** @__PURE__ */ is$1(), 
/** @__PURE__ */ decode$1("isDecode"));
/**
 * @internal
 */
function validateDecode() {
    halt$2("validateDecode");
}
const validateDecodePure = /** @__PURE__ */ Object.assign(validateDecode, 
/** @__PURE__ */ validate$1(), 
/** @__PURE__ */ decode$1("validateDecode"));
/**
 * @internal
 */
function encode() {
    halt$2("encode");
}
const encodePure = /** @__PURE__ */ Object.assign(encode, 
/** @__PURE__ */ encode$1("encode"));
/**
 * @internal
 */
function assertEncode() {
    halt$2("assertEncode");
}
const assertEncodePure = /** @__PURE__ */ Object.assign(assertEncode, 
/** @__PURE__ */ assert$1("protobuf.assertEncode"), 
/** @__PURE__ */ encode$1("assertEncode"));
/**
 * @internal
 */
function isEncode() {
    halt$2("isEncode");
}
const isEncodePure = /** @__PURE__ */ Object.assign(isEncode, 
/** @__PURE__ */ is$1(), 
/** @__PURE__ */ encode$1("isEncode"));
/**
 * @internal
 */
function validateEncode() {
    halt$2("validateEncode");
}
const validateEncodePure = /** @__PURE__ */ Object.assign(validateEncode, 
/** @__PURE__ */ validate$1(), 
/** @__PURE__ */ encode$1("validateEncode"));
/**
 * @internal
 */
function createDecode() {
    halt$2("createDecode");
}
const createDecodePure = /** @__PURE__ */ Object.assign(createDecode, /** @__PURE__ */ decode$1("createDecode"));
/**
 * @internal
 */
function createIsDecode() {
    halt$2("createIsDecode");
}
const createIsDecodePure = /** @__PURE__ */ Object.assign(createIsDecode, 
/** @__PURE__ */ is$1(), 
/** @__PURE__ */ decode$1("createIsDecode"));
/**
 * @internal
 */
function createAssertDecode() {
    halt$2("createAssertDecode");
}
const createAssertDecodePure = /** @__PURE__ */ Object.assign(createAssertDecode, 
/** @__PURE__ */ assert$1("protobuf.createAssertDecode"), 
/** @__PURE__ */ decode$1("createAssertDecode"));
/**
 * @internal
 */
function createValidateDecode() {
    halt$2("createValidateDecode");
}
const createValidateDecodePure = /** @__PURE__ */ Object.assign(createValidateDecode, 
/** @__PURE__ */ validate$1(), 
/** @__PURE__ */ decode$1("createValidateDecode"));
/**
 * @internal
 */
function createEncode() {
    halt$2("createEncode");
}
const createEncodePure = /** @__PURE__ */ Object.assign(createEncode, /** @__PURE__ */ encode$1("createEncode"));
/**
 * @internal
 */
function createIsEncode() {
    halt$2("createIsEncode");
}
const createIsEncodePure = /** @__PURE__ */ Object.assign(createIsEncode, 
/** @__PURE__ */ is$1(), 
/** @__PURE__ */ encode$1("createIsEncode"));
/**
 * @internal
 */
function createAssertEncode() {
    halt$2("createAssertEncode");
}
const createAssertEncodePure = /** @__PURE__ */ Object.assign(createAssertEncode, 
/** @__PURE__ */ assert$1("protobuf.createAssertEncode"), 
/** @__PURE__ */ encode$1("createAssertEncode"));
/**
 * @internal
 */
function createValidateEncode() {
    halt$2("createValidateEncode");
}
const createValidateEncodePure = /** @__PURE__ */ Object.assign(createValidateEncode, 
/** @__PURE__ */ validate$1(), 
/** @__PURE__ */ encode$1("createValidateEncode"));
/**
 * @internal
 */
function halt$2(name) {
    throw new Error(`Error on typia.protobuf.${name}(): no transform has been configured. Read and follow https://typia.io/docs/setup please.`);
}

var protobuf = /*#__PURE__*/Object.freeze({
	__proto__: null,
	assertDecode: assertDecodePure,
	assertEncode: assertEncodePure,
	createAssertDecode: createAssertDecodePure,
	createAssertEncode: createAssertEncodePure,
	createDecode: createDecodePure,
	createEncode: createEncodePure,
	createIsDecode: createIsDecodePure,
	createIsEncode: createIsEncodePure,
	createValidateDecode: createValidateDecodePure,
	createValidateEncode: createValidateEncodePure,
	decode: decodePure,
	encode: encodePure,
	isDecode: isDecodePure,
	isEncode: isEncodePure,
	message: message,
	validateDecode: validateDecodePure,
	validateEncode: validateEncodePure
});

/**
 * @internal
 */
function metadata() {
    halt$1("metadata");
}
const metadataPure = /** @__PURE__ */ Object.assign(metadata, { from: (input) => input });
function name() {
    halt$1("name");
}
/**
 * @internal
 */
function halt$1(name) {
    throw new Error(`Error on typia.reflect.${name}(): no transform has been configured. Read and follow https://typia.io/docs/setup please.`);
}

var reflect = /*#__PURE__*/Object.freeze({
	__proto__: null,
	metadata: metadataPure,
	name: name
});

var index = /*#__PURE__*/Object.freeze({
	__proto__: null
});

/**
 * @internal
 */
function assert() {
    halt("assert");
}
const assertPure = /** @__PURE__ */ Object.assign(assert, 
/** @__PURE__ */ assert$1("assert"));
/**
 * @internal
 */
function assertGuard() {
    halt("assertGuard");
}
const assertGuardPure = /** @__PURE__ */ Object.assign(assertGuard, 
/** @__PURE__ */ assert$1("assertGuard"));
/**
 * @internal
 */
function is() {
    halt("is");
}
const isPure = /** @__PURE__ */ Object.assign(is, 
/** @__PURE__ */ assert$1("is"));
/**
 * @internal
 */
function validate() {
    halt("validate");
}
const validatePure = /** @__PURE__ */ Object.assign(validate, 
/** @__PURE__ */ validate$1());
/**
 * @internal
 */
function assertEquals() {
    halt("assertEquals");
}
const assertEqualsPure = /** @__PURE__ */ Object.assign(assertEquals, /** @__PURE__ */ assert$1("assertEquals"));
/**
 * @internal
 */
function assertGuardEquals() {
    halt("assertGuardEquals");
}
const assertGuardEqualsPure = /** @__PURE__ */ Object.assign(assertGuardEquals, /** @__PURE__ */ assert$1("assertGuardEquals"));
/**
 * @internal
 */
function equals() {
    halt("equals");
}
const equalsPure = /** @__PURE__ */ Object.assign(equals, 
/** @__PURE__ */ is$1());
/**
 * @internal
 */
function validateEquals() {
    halt("validateEquals");
}
const validateEqualsPure = /** @__PURE__ */ Object.assign(validateEquals, /** @__PURE__ */ validate$1());
/**
 * @internal
 */
function random() {
    halt("random");
}
const randomPure = /** @__PURE__ */ Object.assign(random, 
/** @__PURE__ */ random$1());
/**
 * @internal
 */
function createAssert() {
    halt("createAssert");
}
const createAssertPure = /** @__PURE__ */ Object.assign(createAssert, assertPure);
/**
 * @internal
 */
function createAssertGuard() {
    halt("createAssertGuard");
}
const createAssertGuardPure = /** @__PURE__ */ Object.assign(createAssertGuard, assertGuardPure);
/**
 * @internal
 */
function createIs() {
    halt("createIs");
}
const createIsPure = /** @__PURE__ */ Object.assign(createIs, isPure);
/**
 * @internal
 */
function createValidate() {
    halt("createValidate");
}
const createValidatePure = /** @__PURE__ */ Object.assign(createValidate, validatePure);
/**
 * @internal
 */
function createAssertEquals() {
    halt("createAssertEquals");
}
const createAssertEqualsPure = /** @__PURE__ */ Object.assign(createAssertEquals, assertEqualsPure);
/**
 * @internal
 */
function createAssertGuardEquals() {
    halt("createAssertGuardEquals");
}
const createAssertGuardEqualsPure = /** @__PURE__ */ Object.assign(createAssertGuardEquals, assertGuardEqualsPure);
/**
 * @internal
 */
function createEquals() {
    halt("createEquals");
}
const createEqualsPure = /** @__PURE__ */ Object.assign(createEquals, equalsPure);
/**
 * @internal
 */
function createValidateEquals() {
    halt("createValidateEquals");
}
const createValidateEqualsPure = /** @__PURE__ */ Object.assign(createValidateEquals, validateEqualsPure);
/**
 * @internal
 */
function createRandom() {
    halt("createRandom");
}
const createRandomPure = /** @__PURE__ */ Object.assign(createRandom, randomPure);
/**
 * @internal
 */
function halt(name) {
    throw new Error(`Error on typia.${name}(): no transform has been configured. Read and follow https://typia.io/docs/setup please.`);
}

var typia = /*#__PURE__*/Object.freeze({
	__proto__: null,
	TypeGuardError: TypeGuardError,
	assert: assertPure,
	assertEquals: assertEqualsPure,
	assertGuard: assertGuardPure,
	assertGuardEquals: assertGuardEqualsPure,
	createAssert: createAssertPure,
	createAssertEquals: createAssertEqualsPure,
	createAssertGuard: createAssertGuardPure,
	createAssertGuardEquals: createAssertGuardEqualsPure,
	createEquals: createEqualsPure,
	createIs: createIsPure,
	createRandom: createRandomPure,
	createValidate: createValidatePure,
	createValidateEquals: createValidateEqualsPure,
	equals: equalsPure,
	functional: functional,
	http: http,
	is: isPure,
	json: json,
	llm: llm,
	misc: misc,
	notations: notations,
	protobuf: protobuf,
	random: randomPure,
	reflect: reflect,
	tags: index,
	validate: validatePure,
	validateEquals: validateEqualsPure
});

export { TypeGuardError, assertPure as assert, assertEqualsPure as assertEquals, assertGuardPure as assertGuard, assertGuardEqualsPure as assertGuardEquals, createAssertPure as createAssert, createAssertEqualsPure as createAssertEquals, createAssertGuardPure as createAssertGuard, createAssertGuardEqualsPure as createAssertGuardEquals, createEqualsPure as createEquals, createIsPure as createIs, createRandomPure as createRandom, createValidatePure as createValidate, createValidateEqualsPure as createValidateEquals, typia as default, equalsPure as equals, functional, http, isPure as is, json, llm, misc, notations, protobuf, randomPure as random, reflect, index as tags, validatePure as validate, validateEqualsPure as validateEquals };
//# sourceMappingURL=index.mjs.map
