const _ = require('graphql')
const uuid = require('uuid/v1')
const benchmark = require('benchmark')
const columnify = require('columnify')

function randomObject() {
  return {
    id: randomId(),
    int1: randomInt(),
    int2: randomInt(),
    string1: randomString(),
    string2: randomString(),
    boolean1: randomBoolean(),
    boolean2: randomBoolean(),
    intArray: randomArray(randomInt),
    stringArray: randomArray(randomString),
    booleanArray: randomArray(randomBoolean)
  }
}

function randomId() {
  return uuid()
}

function randomInt() {
  return Math.floor(Math.random() * 1000000)
}

function randomLetter() {
  return String.fromCharCode(Math.floor(97 + Math.random() * 26))
}

function randomString() {
  return Array.from({ length: 16 }).map(randomLetter).join('')
}

function randomBoolean() {
  return Math.random() > 0.5 ? true : false
}

function randomArray(fn) {
  return Array.from({ length: 10 }).map(fn)
}

const DATA = Array.from({ length: 10000 }).map(randomObject)
const FOO_TYPE = new _.GraphQLObjectType({
  name: "Foo",
  fields: {
    id: { type: _.GraphQLID },
    int1: { type: _.GraphQLInt },
    int2: { type: _.GraphQLInt },
    string1: { type: _.GraphQLString },
    string2: { type: _.GraphQLString },
    boolean1: { type: _.GraphQLBoolean },
    boolean2: { type: _.GraphQLBoolean },
    stringArray: { type: new _.GraphQLList(_.GraphQLString) },
    intArray: { type: new _.GraphQLList(_.GraphQLInt) },
    booleanArray: { type: new _.GraphQLList(_.GraphQLBoolean) }
  }
})
const QUERY_TYPE = new _.GraphQLObjectType({
  name: "Query",
  description: "Query root of the system",
  fields: {
    foos: {
      description: "Return a list of Foo objects",
      type: new _.GraphQLList(FOO_TYPE),
      args: {
        count: {
          type: _.GraphQLInt
        }
      },
      resolve: (root, args, context) => {
        if (args.count > DATA.length) {
          throw new Error('Count exceeded maximum. To request more objects, increase the test data count.')
        } else {
          return DATA.slice(0, args.count - 1)
        }
      }
    }
  }
})
const SCHEMA = new _.GraphQLSchema({ query: QUERY_TYPE })
const ALL_FIELDS = `
  query($count: Int!) {
    foos(count: $count) {
      id
      int1
      int2
      string1
      string2
      boolean1
      boolean2
      stringArray
      intArray
      booleanArray
    }
  }
`
const NO_ARRAYS = `
  query($count: Int!) {
    foos(count: $count) {
      id
      int1
      int2
      string1
      string2
      boolean1
      boolean2
    }
  }
`
const ID_ONLY = `
  query($count: Int!) {
    foos(count: $count) {
      id
    }
  }
`

const SUITE = new benchmark.Suite()
;[10, 100, 1000, 10000].map(count => {
  SUITE.add(`${count} objects`, function(d) {
    _.graphql(SCHEMA, ALL_FIELDS, null, null, { count: count }).then(() => d.resolve())
  }, { defer: true })
})
;[10, 100, 1000, 10000].map(count => {
  SUITE.add(`${count} objects (no arrays)`, function(d) {
    _.graphql(SCHEMA, NO_ARRAYS, null, null, { count: count }).then(() => d.resolve())
  }, { defer: true })
})
;[10, 100, 1000, 10000].map(count => {
  SUITE.add(`${count} objects (id only)`, function(d) {
    _.graphql(SCHEMA, ID_ONLY, null, null, { count: count }).then(() => d.resolve())
  }, { defer: true })
})
SUITE.on('cycle', e => {
  console.log(e.target.toString())
})
SUITE.on('complete', e => {
  console.log('')
  console.log(columnify(SUITE.map(x => {
    return { name: x.name, ips: x.hz, average: `${x.stats.mean * 1000}ms`, deviation: `±${x.stats.rme}%` }
  }), {
    config: {
      ips: { align: 'right' },
      average: { align: 'right' },
      deviation: { align: 'right' }
    }
  }))
})
SUITE.run({ async: true })
