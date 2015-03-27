class ArrayLikeObjectWrapper {
  constructor (obj) {
    let specs = {
      length: {
        get: function () {
          return obj.length
        },
        set: function (val) {
          obj.length = val
        }
      }
    }

    for (let i = 0; i < obj.length; ++i) {
      specs[i] = {
        get: function () {
          return obj[i]
        },
        set: function (val) {
          obj[i] = val
        },
        enumerable: true
      }
    }
    Object.defineProperties(this, specs)
  }

  * keys () {
    for(let i = 0; i < this.length; ++i) {
      yield i
    }
  }

  * values () {
    for(let key of this.keys()) {
      yield this[key]
    }
  }

  * entries () {
    for(let key of this.keys()) {
      yield [key, this[key]]
    }
  }

  [Symbol.iterator] () {
    return this.values()
  }
}

for(let key of ["every", "copyWithin", "fill", "find", "findIndex", "forEach",
    "indexOf", "join", "lastIndexOf", "reduce", "reduceRight", "reverse",
    "some", "sort", "toLocaleString", "toString"]) {
  ArrayLikeObjectWrapper.prototype[key] = function () {
    return Array.prototype[key].apply(this, arguments)
  }
}

for(let key of ["concat", "filter", "map", "slice"]) {
  ArrayLikeObjectWrapper.prototype[key] = function () {
    return this.constructor.from(Array.prototype[key].apply(this, arguments))
  }
}

export default ArrayLikeObjectWrapper
