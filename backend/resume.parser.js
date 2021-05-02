const { parseImage } = require('./contentful.parser');

const { CONTENT_TYPES } = require('./contentful.service');

const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const slugify = require('slugify');

function parseHighlights(section) {
  let { highlightTitle: title, highlights } = section.fields
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
  let { title, educationEntries } = section.fields

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
  let { title, entries } = section.fields

  entries = entries.map(entry => {
    let { techStack, description } = entry.fields;
    techStack = techStack.split(", ");

    return {
      ...entry.fields,
      techStack: techStack,
      description: documentToHtmlString(description)
    }

  })

  return {
    title,
    entries
  }
}

function parseGenericSection(section) {
  let { id, title, entries } = section.fields

  entries = entries.map(entry => {
    return {
      ...entry.fields,
      value: documentToHtmlString(entry.fields.value)
    }

  })

  console.log({entries});
  return {
    id,
    title,
    entries
  }
}

function parseReferences(referenceSection) {
  let { title, references } = referenceSection.fields

  return {
    title,
    referenceSection: documentToHtmlString(references)
  }
}

function parseRecommendations(rawRecommendations) {
  const recommendations = rawRecommendations.map(recommendation => {
    const downloadLink = recommendation.fields.recommendation.fields.file.url;

    return {
      ...recommendation.fields,
      recommendation: downloadLink
    }
  });


  return {
    title: 'Recommendations',
    recommendations
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

  let { title, heading, education, professionalExperience, publicSpeakingEvents, openSourceProjects, otherSections, references, recommendations } = resume.fields

  return {
    slug: slugify(title, {
      lower: true
    }),
    heading: parseHeading(heading),
    education: parseEducation(education),
    recommendations: parseRecommendations(recommendations),
    experience: parseExperience(professionalExperience),
    publicSpeakingEvents: parseGenericSection(publicSpeakingEvents),
    openSourceProjects: parseGenericSection(openSourceProjects),
    otherSections: otherSections.map(section => parseGenericSection(section)),
    references: parseReferences(references),
  }
}

module.exports = { parseResume }
