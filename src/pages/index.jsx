import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/Layout'


export default props => {

  return (
    <Layout>
      <div >
        yo
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    prismicHomepage {
      data {
        name {
          text
        }
        description {
          html
        }
        body {
          ... on PrismicHomepageBodySection {
            slice_type
            primary {
              title {
                text
              }
            }
            items {
              content {
                html
              }
            }
          }
          ... on PrismicHomepageBodySkills {
            slice_type
            primary {
              title {
                text
              }
            }
            items {
              content {
                html
              }
            }
          }
        }
      }
    }
  }
`
