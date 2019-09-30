require('dotenv').config({
  path: `.env`,
})

module.exports = {
  plugins: [
    'gatsby-plugin-less',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'resume-test',
        accessToken: process.env.API_KEY,
      },
    },
  ],
  siteMetadata: {
    name: "Russell Snyder",
    dob: "November 12, 1987",
    location: "Berlin, Germany",
    workStatus: "Unrestricted Work"
  }
}
