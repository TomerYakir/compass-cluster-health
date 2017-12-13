# compass-cluster-health [![][travis_img]][travis_url] [![][npm_img]][npm_url]

> This plugin adds Sharding information for compass connections to sharded clusters.

## Installation

```
cd ~/.mongodb/compass/plugins
git clone git@github.com:tomeryakir/compass-cluster-health.git
cd compass-cluster-health
npm install

```

## Usage

Start Compass (1.10-beta or above) and connect to a sharded cluster via a `mongos` instance. You should be able to see a `CLUSTER HEALTH` tab in the main cluster view.

If you have authentication enabled in your cluster the minimum privileges the user will require is:
- `clusterMonitor` on admin database.
- `read` on all sharded databases or `readAnyDatabase` on the admin database.

## License

Apache 2


Apache 2.0

[travis_img]: https://img.shields.io/travis/mongodb-js/component-template.svg?style=flat-square
[travis_url]: https://travis-ci.org/mongodb-js/component-template
[npm_img]: https://img.shields.io/npm/v/mongodb-component-template.svg?style=flat-square
[npm_url]: https://www.npmjs.org/package/mongodb-component-template
[react-storybook]: https://github.com/kadirahq/react-storybook
[enzyme]: http://airbnb.io/enzyme/
[enzyme-chai]: https://github.com/producthunt/chai-enzyme
[jsdom]: https://github.com/tmpvar/jsdom
