const contentful = require('contentful');
const fs = require('fs');
const path = require('path');

const METHOD_OPTIONS_DEFAULTS = {
  shouldDumpData: false,
};

module.exports = class DataService {
  constructor(config) {
    if (this.constructor.instance) return this.constructor.instance;

    this.contentClient = contentful.createClient(config);

    this.constructor.instance = this;
  }

  static dumpData(name, data, basePath = __dirname) {
    fs.writeFileSync(path.join(basePath, `${name}.dump.json`), JSON.stringify(data));
  }

  async getFilms(opts) {
    const options = { ...METHOD_OPTIONS_DEFAULTS, ...opts };
    const data = await this.contentClient.getEntries({
      content_type: 'film',
    });

    // sort all films by order or publish date
    data.items.sort((a, b) => (a.fields.order && b.fields.order
      ? a.fields.order - b.fields.order : a.sys.createdAt - b.sys.createdAt));

    // split films into categories
    const films = {};

    data.items.forEach((item) => {
      if (films[item.fields.category]) {
        films[item.fields.category].push(item.fields);
      } else {
        films[item.fields.category] = [item.fields];
      }
    });

    if (options.shouldDumpData) DataService.dumpData('films', films);

    return films;
  }

  async getAbout(opts) {
    const options = { ...METHOD_OPTIONS_DEFAULTS, ...opts };
    const data = await this.contentClient.getEntries({
      content_type: 'about',
    });

    if (options.shouldDumpData) DataService.dumpData('about', data.items[0].fields);

    return data.items[0].fields;
  }

  async getMetaInfo(opts) {
    const options = { ...METHOD_OPTIONS_DEFAULTS, ...opts };
    const data = await this.contentClient.getEntries({
      content_type: 'metaInfo',
    });

    if (options.shouldDumpData) DataService.dumpData('meta', data.items[0].fields);

    return data.items[0].fields;
  }
};
