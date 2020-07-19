import { createGlobalStyle } from "styled-components"
import styled from "styled-components"

const Style = createGlobalStyle`
  html {
    // font-family: 'Arial';
    // font-size: 13pt;
    font-size; 14pt;
    font-family: "Special Elite", cursive;
  }

  body {
    margin: 0;
    padding: 0;
    // background-image: url('/dmd-bg.png') !important;
  }

  ol {
    margin-top: 0;
    margin-bottom: 0;
    list-style-type: upper-roman;
    padding-left: 0.35in;
  }

  blockquote {
    margin-left: 0;
    margin-right: 0;
  }

  .📖-root .book-container {
    opacity: 1;
  }

  .📖-running-header {
    position: absolute;
    bottom: 0in !important;
    min-height: 0.3in;
    pointer-events: none;
    text-align: center;
  }

  .📖-right .📖-running-header {
    text-align: right;
    width: var(--bindery-page-width);
  }

  .📖-page.📖-left .page-header {
    // padding-left: 0.35in;
    padding-left: 0in;
  }

  .page.📖-continuation.📖-continues {
    margin-top: 0.335in;
  }

  .toc-page.page.📖-continuation.📖-continues {
    margin-top: 0;
  }

  .📖-flow-box {
    margin-bottom: var(--bindery-margin-outer);
  }

  .📖-footer {
    display: none;
  }

  .📖-footer p {
    margin-bottom: 8pt;
  }

  @page {
    size: var(--bindery-page-width) var(--bindery-page-height);
    margin: 0 !important;
    width: var(--bindery-page-width) !important;
    height: var(--bindery-page-height) !important;
  }
`

const PageBreak = styled.hr`
  display: none;
`

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`

export { Style, PageBreak, Link }
