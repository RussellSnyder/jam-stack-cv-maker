const contentful = require('contentful')

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

if (process.env.CONTENTFUL_ACCESS_TOKEN && process.env.CONTENTFUL_SPACE_ID) {
    console.log(".env data read")
} else {
    console.error(".env data read not read!")
}


// Create Contentful Client
const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

// Give client to Models to access
const ResumeModel = require('./backend/resume.model')
const resumeModel = new ResumeModel(client)

exports.createPages = async ({ actions: { createPage } }) => {

    const allResumes = await resumeModel.getAllResumes()
            .catch(e => console.log(e))


  allResumes.forEach(resume => {
        createPage({
            path: `/resume/${resume.slug}/`,
            component: require.resolve("./src/templates/resume.js"),
            context: { ...resume },
        })
    })
}
