import React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

const toKebabCase = str => {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join("-")
}

const Tags = ({ data }) => {
  const tags = data.allMarkdownRemark.group
  const isListPage = data.isListPage ? false : true

  tags.sort((a, b) => {
    return a.fieldValue.length - b.fieldValue.length
  })

  return (
    <Layout title="All Tags">
      <h1>모든 태그</h1>
      {isListPage ? (
        <StyledUlItem>
          {tags.map(tag => (
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to={`/tags/${toKebabCase(tag.fieldValue)}/`}
            >
              <StyledListItem key={tag.fieldValue}>
                {tag.fieldValue} ({tag.totalCount})
              </StyledListItem>
            </Link>
          ))}
        </StyledUlItem>
      ) : (
        <ul>
          {tags.map(tag => (
            <li key={tag.fieldValue}>
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={`/tags/${toKebabCase(tag.fieldValue)}/`}
              >
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  )
}

const StyledUlItem = styled.ul`
  padding: 0;
  margin-top: 30px;
  list-style: none;
  display: grid;
  justify-items: left;
  grid-gap: var(--size-600);
  grid-template-columns: repeat(auto-fit, minmax(20ch, 0.7fr));
  @media screen and (max-width: 500px) {
    & {
      display: block;
    }
  }
`

const StyledListItem = styled.li`
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 8px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.75);
  }
  @media screen and (max-width: 500px) {
    & {
      margin-top: var(--size-600);
    }
  }
`
export default Tags

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
