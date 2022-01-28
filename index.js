function isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}

function bind(fn, ...args) {
  return function _bind(...params) {
    return fn(...args, ...params);
  };
}

function reduce(fn, acc, functor) {
  for (const el of functor) acc = fn(acc, el);

  return acc;
}

function pipe(...fns) {
  return function _pipe(acc) {
    for (const fn of fns) acc = fn(acc);

    return acc;
  };
}

function mapOverArray(fn, array) {
    const output = Array(array.length);

    for (let i = 0; i < array.length; ++i) output[i] = fn(array[i]);

    return output;
  }

  function mapOverObject(fn, object) {
    const output = {};

    for (const [key, value] of Object.entries(object)) output[key] = fn(value);

    return output;
  }

function map(fn, functor) {
    return isObject(functor)
    ? mapOverObject(fn, functor)
    : mapOverArray(fn, functor);
}

function curry(fn) {
  return function _curried(...params) {
    return params.length < fn.length
      ? bind(_curried, ...params)
      : fn(...params);
  };
}

function multiply(a, b) {
  return a * b;
}

function fromPairs(pairs) {
  const output = {};

  for (const [key, value] of pairs) output[key] = value;

  return output;
}

function times(fn, n) {
  const output = Array(n);

  for (let i = 0; i < n; ++i) output[i] = fn(i);

  return output;
}

function identity(x) {
  return x;
}

function filter(prediction, filterable) {
  function filterArray(fn, array) {
    const output = [];

    for (const el of array) if (fn(el)) output.push(el);

    return output;
  }

  function filterObject(fn, object) {
    const output = {};

    for (const [key, value] of Object.entries(object))
      if (fn(value)) output[key] = value;

    return output;
  }

  return isObject(filterable)
    ? filterObject(prediction, filterable)
    : filterArray(prediction, filterable);
}

function pick(keys, object) {
  const output = {};

  for (const key of keys) if (key in object) output[key] = object[key];

  return output;
}

function values(object) {
  return Object.values(object);
}

function propOr(value, propKey, object) {
  return propKey in object ? object[propKey] : value;
}

function assoc(key, value, object) {
  return {
    ...object,
    [key]: value,
  };
}

function splitEvery(n, list) {
  const output = Array(Math.round(list.length / n));

  for (let i = 0; i < list.length; i += n) output[i / n] = list.slice(i, i + n);

  return output;
}

module.exports = {
  reduce: curry(reduce),
  pipe,
  map: curry(map),
  curry,
  multiply: curry(multiply),
  fromPairs,
  times: curry(times),
  identity,
  filter: curry(filter),
  isObject,
  pick: curry(pick),
  values,
  propOr: curry(propOr),
  bind: curry(bind),
  assoc: curry(assoc),
  splitEvery: curry(splitEvery),
};
