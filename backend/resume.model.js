'use strict';
const {CONTENT_TYPES} = require('./contentful.service')
const {parseResume} = require('./resume.parser')

module.exports = class BlogPostModel {
  constructor(client) {
    this.client = client;
  }

  getAllResumes() {
    const {client} = this;

    return client.getEntries({
      content_type: CONTENT_TYPES.RESUME,
      include: 10
    })
      .then(function (entries) {

        return client.parseEntries(entries)
      })
      .then(function (entries) {
        return entries.items.map(function (entry, i) {
          return parseResume(entry)
        })
      })
      .catch(e => console.log(e))
  };
}
