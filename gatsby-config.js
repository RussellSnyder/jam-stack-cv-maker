require('dotenv').config({
  path: `.env`,
})

module.exports = {
  plugins: [
    'gatsby-plugin-less',
    'gatsby-plugin-react-helmet'
  ]
}
