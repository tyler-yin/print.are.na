import React, { useState, useEffect, useRef, useCallback } from "react"
import styled from "styled-components"
import { useLocation, useHistory } from "react-router-dom"
import { renderToString } from "react-dom/server"
import { RouteComponentProps } from "react-router"
import Bindery, { Controls } from "@broskoski/bindery"
import { isChrome } from "react-device-detect"
import * as QueryString from "query-string"

import { API } from "lib/api"
import { parseChannelContents } from "lib/parseChannelContents"
import { Block, Channel } from "../../types"

import LoadingPage from "components/LoadingPage"

import PageHeader from "components/PageHeader"
import Page from "components/Page"
import SectionPage from "components/SectionPage"
import AboutPage from "components/AboutPage"
import TableOfContents from "components/TableOfContents"
import Contributors from "components/Contributors"
import TitlePage from "components/TitlePage"
import Notice from "components/Notice"
import { NoticeContainer } from "components/NoticeContainer"

import CoverSpread from "components/CoverSpread"

import { URLOptions } from "types"

const BookContainer = styled.div`
  opacity: 0;
`

interface BookProps {
  channel: Channel
  contents: Block[]
}

const defaultOptions: URLOptions = {
  author: true,
  description: true,
  source: true,
  toc: true,
  defaultTo: "preview",
  bleed: "0.25in",
}

const Book: React.FC<BookProps> = ({ channel, contents }) => {
  const bookRef = useRef(null)
  const [rendered, setRendered] = useState(false)
  const [mode, setMode] = useState("interior")
  const [alphabetical, setAlphabetical] = useState(true)
  const location = useLocation()
  const options: URLOptions = {
    ...defaultOptions,
    ...QueryString.parse(location.search, { parseBooleans: true }),
  }

  const handleClick = useCallback(() => {
    setMode("cover")
  }, [setMode])

  useEffect(() => {
    alphabetical &&
      !rendered &&
      contents.sort(
        (one: any, two: any) =>
          one.generated_title
            .replace(/\s/g, "") // strip weird characters
            .localeCompare(two.generated_title.replace(/\s/g, "")) // compare with previous item
      )
  }, [alphabetical, contents, rendered])

  useEffect(() => {
    if (bookRef.current && !rendered) {
      const header = Bindery.RunningHeader({
        render: (page: any) => {
          return renderToString(<PageHeader page={page} />)
        },
      })

      const coverButton = Controls.btnMain(
        {
          onclick: handleClick,
        },
        "Cover"
      )

      const view = options.defaultTo
        ? {
            print: Bindery.View.PRINT,
            preview: Bindery.View.PREVIEW,
            flipbook: Bindery.View.FLIPBOOK,
            undefined: "",
          }[options.defaultTo]
        : Bindery.View.PREVIEW

      Bindery.makeBook({
        content: bookRef.current,
        view,
        controlOptions: {
          layout: false,
          views: true,
          marks: false,
          extraControls: coverButton,
        },
        printSetup: {
          layout: Bindery.Layout.PAGES,
          bleed: "0in",
        },
        pageSetup: {
          size: {
            width: "5.5in",
            height: "8.5in",
          },
          margin: {
            top: "0.3in",
            inner: "0.65in",
            outer: "0.35in",
            bottom: "0.55in",
          },
        },
        rules: [
          // TOC
          Bindery.PageReference({
            selector: ".toc-page a",
            replace: (element: HTMLAnchorElement, pageNumber: number) => {
              let number = document.createElement("div")
              number.innerHTML = `<div>${pageNumber}</div>`
              element.appendChild(number)
              return element
            },
          }),
          // Start of book contents
          Bindery.PageBreak({
            selector: ".toc-start",
            position: "before",
            continue: "left",
          }),
          // Start of book contents
          Bindery.PageBreak({
            selector: ".contents-start",
            position: "before",
            continue: "left",
          }),
          // Normal page
          header,
          Bindery.PageBreak({
            selector: "hr",
            position: "after",
          }),
        ],
      })
      setRendered(true)
    }
  }, [bookRef, handleClick, options.defaultTo, rendered])

  useEffect(() => {
    if (rendered) {
      window.isReadyForPDF = true
    }
  }, [rendered])

  const hasTOC = contents.filter(b => !!b.title).length > 0
  const hasAboutPage = channel.metadata && channel.metadata.description !== ""

  const author =
    (channel.owner &&
      (channel.owner.class === "User"
        ? channel.owner.username
        : channel.owner.name)) ||
    (channel.group && channel.group.name) ||
    channel.user.username ||
    ""

  return (
    <>
      {mode === "cover" && (
        <CoverSpread
          bookRef={bookRef}
          channel={channel}
          onClose={() => {
            setMode("book")
          }}
        />
      )}
      <BookContainer className="book-container" ref={bookRef}>
        <TitlePage title="testing cover" author=" " channel={channel} />

        <SectionPage title="" />
        <SectionPage title="Dictionary of Dark Matters" />


        {hasAboutPage && (
            <>
            <SectionPage title="Contributors" />
            {/* <Contributors blocks={contents} /> */}

              {/* <div className="margin-top"></div> */}

              <div className="center">
                  <div className="contributors authorstyle author134492">American Artist</div>
                  <div className="contributors authorstyle author173746"><span className="contrib">angus fletcher</span></div>
                  <div className="contributors authorstyle author173511">brontë velez</div>
                  <div className="contributors authorstyle author173508">Cameron Granger</div>
                  <div className="contributors authorstyle author13842">connor trotter</div>
                  <div className="contributors authorstyle author37613">David Lisbon</div>
                  <div className="contributors authorstyle author173746">Diana Marin</div>
                  <div className="contributors authorstyle author173830">Heather Snyder Quinn</div>
                  <div className="contributors authorstyle author72134">ilona altman</div>
                  <div className="contributors authorstyle author173499">Jessica Rajko</div>
                  <div className="contributors authorstyle author173500">Kevin He</div>
                  <div className="contributors authorstyle author173503">Krystal Maughan</div>
                  <div className="contributors authorstyle author17810">Lauren Gardner</div>
                  <div className="contributors authorstyle author173730">Lauren Monzon</div>
                  <div className="contributors authorstyle author173505">LeAnne Wagner</div>
                  <div className="contributors authorstyle author173501">Lissa Aguilar</div>
                  <div className="contributors authorstyle author160124">Lluvia Nisaye</div>
                  <div className="contributors authorstyle author102862">Makayla Bailey</div>
                  <div className="contributors authorstyle author173495">Makshya Tolbert</div>
                  <div className="contributors authorstyle author126808">Matt Ross</div>
                  <div className="contributors authorstyle author173613">Miranda Shou</div>
                  <div className="contributors authorstyle author173502">Paras Sanghavi</div>
                  <div className="contributors authorstyle author162734">rahel aima</div>
                  <div className="contributors authorstyle author23411">Ryan Patterson</div>
                  <div className="contributors authorstyle author173494">Sara K.R.</div>
                  <div className="contributors authorstyle author173737">Sus Labowitz<sup className="wordinline">*</sup></div>
                  <div className="contributors authorstyle author159845">Tash Nikol Smith</div>
                  <div className="contributors authorstyle author173506">Teresa Snider-Stein</div>
                  <div className="contributors authorstyle author7454">Timur Fattahov</div>
                  <div className="contributors authorstyle author173534">Trevor Tatham</div>
                  <div className="contributors authorstyle author173504">Tristan Sauer</div>
                  <div className="contributors authorstyle author25047">Tyler Yin<sup className="wordinline">*</sup></div>
                  <div className="contributors authorstyle author88210">Zainab Aliyu<sup className="wordinline">*</sup></div>
              </div>

              <p className="Asterisk">
                <span className="neutral">* Asterisk indicates that the contributor also has illustrations sprinkled throughout book in the color of their name.</span>
              </p>

              <Contributors blocks={contents} />



            <SectionPage title="About" />






            <p className="About">
              <span className="author88210">Welcome to the Dictionary of <u>Dark Matters</u>.</span>
              <sup className="wordinline">186</sup>
              <span className="author88210"> During the Summer of 2020, Dark Matters was taught by </span>
              <span className="author134492">American Artist with the assistance of Zainab Aliyu. </span>
              <span className="author88210">For ten weeks, we stewarded</span>
              <span className="author134492"> and taught </span>
              <span className="author88210">this class over </span>
              <span className="author134492">the video platform <u>Zoom</u>. </span>
              <sup className="wordinline">559 </sup>
              <span className="author88210"> Thirty-two students </span>
              <span className="author134492">convened over and through national borders </span>
              <span className="author88210">to <u>study</u> </span>
              <sup className="wordinline">482</sup>
              <span className="author88210"> alongside us and with one another. We engaged in intimate practices of unlearning, deep listening and reflection. Most importantly, we studied “under the university,” a framing we borrow from theorist</span>
              <span className="author134492">s </span>
              <span className="author88210">Fred Moten </span>
              <span className="author134492">and Stefano Harney.</span>
            </p>

            <p className="About">
              <span className="author134492">The class, titled Dark Matters: <i>On Blackness, <u>Surveillance</u></i>,</span>
              <sup className="wordinline">487 </sup>
              <span className="author134492"> <i>and the Whiteness of the Screen</i>, takes it's namesake from Simone Browne's book <i>Dark Matters: On the Surveillance of Blackness</i>. </span>
              <span className="author88210">This critical text winds </span>
              <span className="author134492">personal, political and pop-cultural narratives of <u>racial gaze</u></span>
              <sup className="wordinline">442 </sup>
              <span className="author134492"> and <u>sousveillance </u></span>
              <sup className="wordinline">476 </sup>
              <span className="author134492"> to address the origins of so many recurring dynamics of power that operate through high technology. The readings in our class began with Wendy Chun's critique of </span>
              <span className="author88210"><u>software</u> </span>
              <sup className="wordinline">473 </sup>
              <span className="author88210">and </span>
              <span className="author134492"><u>ideology</u>'s </span>
              <sup className="wordinline">313 </sup>
              <span className="author134492">tendencies towards</span>

            </p>

            <p className="About">
              <span className="author134492"><u>obfuscation</u>, </span>
              <sup className="wordinline">386 </sup>
              <span className="author88210">as well as </span>
              <span className="author134492">American Artist's <u>Black Gooey Universe</u> </span>
              <sup className="wordinline">100 </sup>
              <span className="author88210">and imagining of an unsovereign technology. </span>
              <span className="author134492">Over the four </span>
              <span className="author88210">sessions </span>
              <span className="author134492">that this class has been taught, we have introduced authors to the curriculum such as Jackie Wang, David N. Pellow, Lisa Sun-Hee Park and Ruha Benjamin. </span>
              <span className="author88210">Selected work by these authors hold </span>
              <span className="author134492">the origins of the <u>interface</u> </span>
              <sup className="wordinline">100 </sup>
              <span className="author134492">to account for the continuation of <u>racial capitalism</u>, </span>
              <sup className="wordinline">100 </sup>
              <span className="author134492">the <u>debt state</u>, </span>
              <sup className="wordinline">100 </sup>
              <span className="author134492"><u>colonialism</u>, </span>
              <sup className="wordinline">100 </sup>
              <span className="author134492">the <u>white racial frame</u>, </span>
              <sup className="wordinline">100 </sup>
              <span className="author134492">and other </span>
              <span className="author88210">global practices that are deeply rooted in American colonial history.</span>
            </p>

            <p className="About">
              <span className="author88210">Dark Matters reminds us about the </span>
              <span className="author134492"><u>panoptic</u> </span>
              <sup className="wordinline">100 </sup>
              <span className="author88210">models and codes that construct the world we live in, their underlying ideologies, as well as the need for our consistent </span>
              <span className="author134492"><u>reckoning</u>. </span>
              <sup className="wordinline">100 </sup>
              <span className="author88210">This class has given us intentional time to tend to ourselves as we contend with this </span>
              <span className="author134492"><u>predatory state,</u> </span>
              <sup className="wordinline">100 </sup>
              <span className="author88210">to study the material while existing within the systems we are learning to name. Together, we studied theory, but theory is nothing without the lived experiences that inform it. </span>
              <span className="author134492">The duration of our time together coincided </span>
              <span className="author88210">with </span>
              <span className="author134492">the </span>
              <span className="author88210">COVID</span>
              <span className="author134492">-19</span>
            </p>

            <p className="About">
              <span className="author134492">pandemic, </span>
              <span className="author88210">the ongoing movement for Black </span>
              <span className="author88210"> Lives </span>
              <span className="author134492">(particularly in response to the murder of George Floyd), </span>
              <span className="author88210">and </span>
              <span className="author134492">the calling out </span>
              <span className="author88210">of </span>
              <span className="author134492">various </span>
              <span className="author88210">academic institutions and places of work </span>
              <span className="author134492">(including our own) for their perpetuation of <u>anti-blackness</u>.  </span>
              <sup className="wordinline">100 </sup>
              <span className="author134492">These issues framed all of our </span>
              <span className="author88210">conversations and largely </span>
              <span className="author134492">informed our <u>communal ethic</u> </span>
              <sup className="wordinline">100 </sup>
              <span className="author134492">of </span>
              <span className="author88210">shar</span>
              <span className="author134492">ing, </span>
              <span className="author88210">creat</span>
              <span className="author134492">ing </span>
              <span className="author88210">and relat</span>
              <span className="author134492">ing </span>
              <span className="author88210">with </span>
              <span className="author134492">one an</span>
              <span className="author88210">other. Through our co-learning, we can better understand how structures are compromised, and we can begin to imagine strategies for future resistance, and what an outside to the structures </span>
              <span className="author134492">we participate in </span>
              <span className="author88210">might actually look and feel like.</span>
            </p>

            <p className="About">
              <span className="author134492">The book you are reading is the culmination of all of that thought. It is a 500+ page (and growing) collaborative <u>people's dictionary</u></span>
              <sup className="wordinline">100 </sup>
              <span className="author134492"> written </span>
              <span className="author88210">over the course of ten weeks. </span>
              <span className="author134492">It is an <u>abundance</u></span>
              <sup className="wordinline">100 </sup>
              <span className="author134492">of poetry, prose, creative writing, personal history and illustration </span>
              <span className="author88210">filled with terms we have come across during our time together. </span>
              <span className="author134492">For <u>transparency</u>, </span>
              <sup className="wordinline">100 </sup>
              <span className="author88210">every voice within the dictionary is uniquely represented with the contributor's preference in typography. By </span>

            </p>

            <p className="About">
              <span className="author88210">archiving our histories and inserting our </span>
              <span className="author134492"><u>human</u> </span>
              <sup className="wordinline">100 </sup>
              <span className="author88210">experiences into the critical theories we are learning, we are looking inwardly and actively engaging with the way we move through the world. It feels increasingly necessary, helping us to ask not only about the technologies, processes and policies that govern civil liberties, but also about whose bodies and freedoms </span>
              <span className="author134492">remain captive.</span>
            </p>

            <p className="About">
              <span className="author134492">We would like to thank the School for Poetic Computation for holding space for us and Lauren Gardner for her immense support. A special thanks to Ingrid Burrington, Simone Browne, Zach Blas, Rashida Richardson, Stephanie Dinkins and Tsige Tafesse for joining our students in conversation throughout the term.</span>
            </p>

            <p className="About">
              <span className="author88210">This book was designed by   edited by  , and assembled with the support of Are.na and Callil Capuozzo. </span>
            </p>

            <p className="About">
              <span className="sc-fzqBZW kjNSqW neutral">— contributed by American Aritst and Zainab Aliyu</span>
            </p>




            {/* <AboutPage
              description={channel.metadata && channel.metadata.description}
            /> */}
            </>
        )}




        {hasTOC && options.toc && (
          <>
            <div className="toc-start" />
            <SectionPage title="Terms" />
            <TableOfContents blocks={contents} />
          </>
        )}

        <div className="contents-start" />

        {/* Here's how you might do custom inserts
{contents.map((b, i) =>
          i % 20 === 0 ? (
            <Page block={b} key={b.id} options={options} />
          ) : (
            <>
              <div>wow!</div>
              <Page block={b} key={b.id} options={options} />
            </>
          )
        )}

*/}

        {contents.map((b, i) => (
          <Page block={b} key={i} options={options} />
        ))}
        {/* <SectionPage title="Contributors" />
        <Contributors blocks={contents} /> */}
      </BookContainer>
    </>
  )
}

type BookWrapperProps = RouteComponentProps<{ slug: string }>

const BookWrapper: React.FC<BookWrapperProps> = ({
  match: {
    params: { slug },
  },
  location: { search },
}) => {
  const history = useHistory()
  const location = useLocation()
  const options: URLOptions = {
    ...defaultOptions,
    ...QueryString.parse(location.search, { parseBooleans: true }),
  }

  const [channel, setChannel] = useState<any | null>(null)
  const [contents, setContents] = useState<null | Block[]>(null)
  const [totalPages, setTotalPages] = useState<null | number>(null)

  const api = new API()

  useEffect(() => {
    if (!channel) {
      api
        .getFullChannel("dark-matters-dictionary", {
          onGetTotal: setTotalPages,
          isShare: options.isShare,
          reverse: options.reverse,
        })
        .then(channel => setChannel(channel))
        .catch((error: Error) => {
          switch (error.message) {
            case "Unauthorized":
              return history.push(`/error/unauthorized`)
            case "Not Found":
              return history.push(`/error/not_found`)
            default:
              return history.push(`/error/unknown`)
          }
        })
    }
  }, [channel, slug, api, history, options.isShare, options.reverse])

  useEffect(() => {
    if (channel && channel.contents) {
      parseChannelContents(channel.contents, options.reverse).then(
        parsedContents => {
          setContents(parsedContents)
        }
      )
    }
  }, [channel, options.reverse])

  return (
    <>
      {(!channel || !contents) && (
        <LoadingPage slug={slug} totalPages={totalPages} />
      )}
      {channel && contents && <Book channel={channel} contents={contents} />}

    </>
  )
}

export default BookWrapper
