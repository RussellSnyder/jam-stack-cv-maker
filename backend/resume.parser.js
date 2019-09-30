const {parseImage} = require('./contentful.parser');

const {CONTENT_TYPES} = require('./contentful.service');

const {documentToHtmlString} = require('@contentful/rich-text-html-renderer');
const slugify = require('slugify');

function parseHighlights(section) {
  let {highlightTitle: title, highlights} = section.fields
  const entries = highlights.map(entry => {

    return {
      ...entry.fields,
      description: documentToHtmlString(entry.fields.long)
    }

  })

  return {
    title,
    entries
  }
}

function parseEducation(section) {
  let {title, educationEntries} = section.fields

  const entries = educationEntries.map(entry => {
    return {
      ...entry.fields,
      description: documentToHtmlString(entry.fields.description)
    }

  })

  return {
    title,
    entries
  }
}

function parseExperience(section) {
  let {title, entries} = section.fields

  entries = entries.map(entry => {
    return {
      ...entry.fields,
      description: documentToHtmlString(entry.fields.description)
    }

  })

  return {
    title,
    entries
  }
}

function parseGenericeSection(section) {
  let {title, entries} = section.fields

  entries = entries.map(entry => {
    return {
      ...entry.fields,
      value: documentToHtmlString(entry.fields.value)
    }

  })

  return {
    title,
    entries
  }
}

function parseReferences(referenceSection) {
  let {title, references} = referenceSection.fields

  return {
    title,
    referenceSection: documentToHtmlString(references)
  }
}

function parseHeading(heading) {
  return {
    ...heading.fields,
    photo: parseImage(heading.fields.photo)
  }
}


function parseResume(resume) {
  if (!resume) {
    return
  }

  let {title, heading, education, highlights, professionalExperience, otherAchievements, otherSections, references} = resume.fields

  return {
    slug: slugify(title, {
      lower: true
    }),
    heading: parseHeading(heading),
    education: parseEducation(education),
    highlights: parseHighlights(highlights),
    experience: parseExperience(professionalExperience),
    achievements: parseGenericeSection(otherAchievements),
    otherSections: otherSections.map(section => parseGenericeSection(section)),
    references: parseReferences(references),
  }
}

module.exports = {parseResume}
