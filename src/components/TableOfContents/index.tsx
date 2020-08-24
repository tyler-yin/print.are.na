import React from "react"
import styled from "styled-components"

import { Block } from "../../types"
import { PageBreak } from "styles/index"

const Container = styled.div`
  // font-family: 'Berthold Medium';
  // font-size: 11pt;
  // font-size: 12pt;
  font-size: 10pt;
  font-weight: bold;
  font-family: "Special Elite", cursive;
  display: flex;
  height: 100%;
  flex-direction: column;
  text-transform: capitalize;
`

const ContentsLine = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-decoration: none;
  color: black;
`

const Title = styled.span`
  margin-right: 0.175in;
  max-width: 3in;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.3;
`

interface TableOfContentsProps {
  blocks: Block[]
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ blocks }) => {
  const blocksWithTitles = blocks.filter(b => !!b.title)
  let lastTitle = ""

  return (
    <Container className="page toc-page">
      {blocksWithTitles.map(b => {
        return (
          b.title !== lastTitle && (
            <ContentsLine href={`#${b.id.toString()}`} className="toc-line">
              <Title dangerouslySetInnerHTML={{ __html: b.title }} />
            </ContentsLine>
          )
        )
      })}
      <PageBreak />
    </Container>
  )
}

export default TableOfContents
