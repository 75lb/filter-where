[![view on npm](http://img.shields.io/npm/v/filter-where.svg)](https://www.npmjs.org/package/filter-where)
[![npm module downloads](http://img.shields.io/npm/dt/filter-where.svg)](https://www.npmjs.org/package/filter-where)
[![Build Status](https://travis-ci.org/75lb/filter-where.svg?branch=master)](https://travis-ci.org/75lb/filter-where)
[![Dependency Status](https://david-dm.org/75lb/filter-where.svg)](https://david-dm.org/75lb/filter-where)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

<a name="module_filter-where"></a>
## filter-where


<a name="module_filter-where..whereReducer"></a>
### filter-where~whereReducer(query) ⇒ `function`
Deep query an array.

**Kind**: inner method of [`filter-where`](#module_filter-where)  

| Param | Type                       | Description         |
| ----- | -------------------------- | ------------------- |
| query | `any` &#124; `Array.<any>` | one or more queries |


**Example**
Say you have a recordset:
```js
> data = [
    { name: "Dana", age: 30 },
    { name: "Yana", age: 20 },
    { name: "Zhana", age: 10 }
]
```

You can return records with properties matching an exact value:
```js
> a.where(data, { age: 10 })
[ { name: 'Zhana', age: 10 } ]
```

or where NOT the value (prefix the property name with `!`)
```js
> a.where(data, { "!age": 10 })
[ { name: 'Dana', age: 30 }, { name: 'Yana', age: 20 } ]
```

match using a function:
```js
> function over10(age){ return age > 10; }
> a.where(data, { age: over10 })
[ { name: 'Dana', age: 30 }, { name: 'Yana', age: 20 } ]
```

match using a regular expression
```js
> a.where(data, { name: /ana/ })
[ { name: 'Dana', age: 30 },
  { name: 'Yana', age: 20 },
  { name: 'Zhana', age: 10 } ]
```

You can query to any arbitrary depth. So with deeper data, like this:
```js
> deepData = [
    { name: "Dana", favourite: { colour: "light red" } },
    { name: "Yana", favourite: { colour: "dark red" } },
    { name: "Zhana", favourite: { colour: [ "white", "red" ] } }
]
```

get records with `favourite.colour` values matching `/red/`
```js
> a.where(deepData, { favourite: { colour: /red/ } })
[ { name: 'Dana', favourite: { colour: 'light red' } },
  { name: 'Yana', favourite: { colour: 'dark red' } } ]
```

if the value you're looking for _maybe_ part of an array, prefix the property name with `+`. Now Zhana is included:
```js
> a.where(deepData, { favourite: { "+colour": /red/ } })
[ { name: 'Dana', favourite: { colour: 'light red' } },
  { name: 'Yana', favourite: { colour: 'dark red' } },
  { name: 'Zhana', favourite: { colour: [ "white", "red" ] } } ]
```

you can combine any of the above by supplying an array of queries. Records will be returned if _any_ of the queries match:
```js
> var nameBeginsWithY = { name: /^Y/ }
> var faveColourIncludesWhite = { favourite: { "+colour": "white" } }

> a.where(deepData, [ nameBeginsWithY, faveColourIncludesWhite ])
[ { name: 'Yana', favourite: { colour: 'dark red' } },
  { name: 'Zhana', favourite: { colour: [ "white", "red" ] } } ]
```




* * *

&copy; 2016 Lloyd Brookes <75pound@gmail.com>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
