import React from "react"
import styled from "styled-components"

import { Link } from "styles/index"

const Title = styled.span``

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 12pt;
  margin-bottom: 0.175in;
  max-width: 5.5in;
  min-height: 0.175in;
  overflow: hidden;
  font-weight: normal;
  // font-weight: bold;

  // adjust to align with page numbers
  margin-top: -0.1em;
`

const Anchor = styled.a`
  display: none;
`

interface PageHeaderProps {
  title: string
  id: number
}

const Header: React.FC<PageHeaderProps> = ({ title, id }) => {
  return (
    <Container className="page-header">
      <Link
        href={`https://www.are.na/block/${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Title dangerouslySetInnerHTML={{ __html: title }} />
      </Link>
      <Anchor id={id.toString()} />
    </Container>
  )
}

export default Header
