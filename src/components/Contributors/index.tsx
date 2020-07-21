import React from "react"
import styled from "styled-components"

import { Block } from "../../types"
import { PageBreak } from "styles"

const Container = styled.div`
  font-size: 12pt;
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

interface ContributorsProps {
  blocks: Block[]
}

const Contributors: React.FC<ContributorsProps> = ({ blocks }) => {
  const blocksWithNames = blocks.filter(b => !!b.user.full_name)
  let lastName = ""

  return (
    <Container className="page toc-page">
      {blocksWithNames
        .filter(
          (v, i, a) =>
            a.findIndex(t => t.user.full_name === v.user.full_name) === i
        )
        .sort(
          (one: any, two: any) =>
            one.user.full_name
              .replace(/\s/g, "") // strip weird characters
              .localeCompare(two.user.full_name.replace(/\s/g, "")) // compare with previous item
        )
        .map(b => {
          return (
            b.user.full_name !== lastName && (
              <Title dangerouslySetInnerHTML={{ __html: b.user.full_name }} />
            )
          )
        })}
      <PageBreak />
    </Container>
  )
}

export default Contributors
