import React, { /* useState,  useEffect, useRef */ } from 'react';

const analytics = window.gtag || undefined;

function Footer() {
  const track = (name) => {
    if (typeof analytics !== 'undefined') {
      analytics('event', 'Press material', {
        event_category: '2023-ter_report',
        event_label: name,
        transport_type: 'beacon'
      });
    }
  };
  return (
    <div className="app">
      <div className="footer_container">
        <h2>What do you want to do next?</h2>
        <div className="download_button anchor_downloads"><a href="/publication/trade-and-environment-review-2023">Download the report</a></div>
        <div className="footer_elements">
          <div className="footer_element footer_element_1">
            <div className="footer_content anchor_video">
              <h3>Watch the video</h3>
              <div className="iframe_container youtube_iframe">
                <iframe src="" title="Video 1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              <ul>
                <li>
                  <a href="#video" target="_blank" rel="noreferrer">Français</a>
                  {', '}
                  <a href="#video" target="_blank" rel="noreferrer">Español</a>
                  {', '}
                  <a href="#video" target="_blank" rel="noreferrer">العربية</a>
                  {', '}
                  <a href="#video" target="_blank" rel="noreferrer">简体中文</a>
                  {', '}
                  <a href="#video" target="_blank" rel="noreferrer">Русский</a>
                  {', '}
                  <a href="#video" target="_blank" rel="noreferrer">Português</a>
                </li>
              </ul>
            </div>
            <div className="footer_content anchor_podcasts">
              <h3>Podcasts</h3>
              <p>Listen to the Weekly Tradecast episodes that explore some of the main issues in the report</p>
              <div className="iframe_container">
                <iframe title="The Weekly Tradecast by UNCTAD" height="150" width="100%" style={{ border: 'none', minWidth: 'min(100%, 430px)' }} scrolling="no" data-name="pb-iframe-player" src="https://www.podbean.com/player-v2/?i=quwzf-12a95b2-pb&btn-skin=009EDB&download=1&font-color=000000&fonts=Verdana&from=pb6admin&logo_link=none&rtl=0&share=1&size=240&skin=ffffff" allowFullScreen />
                <span className="text"><a href="/podcast/changing-course-shift-policies-needed-avert-global-recession">Blue Deal: Charting a new ocean economy</a></span>
              </div>
              <ul className="podcasts_container">
                <li>
                  <span className="icon" />
                  <span className="text"><a href="/podcast/not-fantastic-when-its-plastic-stemming-tide-ocean-rubbish">Not fantastic when it’s plastic</a></span>
                </li>
                <li>
                  <span className="icon" />
                  <span className="text"><a href="/podcast/sea-trouble-turning-our-ships-green">Sea of trouble</a></span>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_element footer_element_2">
            <div className="footer_content anchor_press">
              <h3>Press material</h3>
              <ul className="hidden">
                <li>
                  <h4>Press conference</h4>
                  <div className="iframe_container youtube_iframe">
                    <iframe src="https://www.youtube.com/embed/QqDYv5-bDhU" title="Video 2" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                  <ul>
                    <li><a href="#video" target="_blank" rel="noreferrer">Download the press conference</a></li>
                  </ul>
                </li>
              </ul>
              <ul className="hidden">
                <li>
                  <h4>Download the report video</h4>
                  <ul>
                    <li>
                      <a href="#video" target="_blank" rel="noreferrer">English</a>
                      {', '}
                      <a href="#video" target="_blank" rel="noreferrer">Français</a>
                      {', '}
                      <a href="#video" target="_blank" rel="noreferrer">Español</a>
                      {', '}
                      <a href="#video" target="_blank" rel="noreferrer">العربية</a>
                      {', '}
                      <a href="#video" target="_blank" rel="noreferrer">简体中文</a>
                      {', '}
                      <a href="#video" target="_blank" rel="noreferrer">Русский</a>
                      {', '}
                      <a href="#video" target="_blank" rel="noreferrer">Português</a>
                    </li>
                  </ul>
                </li>
                <li className="hidden">
                  <h4>Read the news article</h4>
                  <ul>
                    <li>
                      <a href="/press-material/unctad-warns-policy-induced-global-recession-inadequate-financial-support-leaves" onClick={(event) => track(event.target.href)}>English</a>
                      {', '}
                      <a href="/fr/press-material/la-cnuced-met-en-garde-contre-une-recession-mondiale-induite-par-les-politiques" onClick={(event) => track(event.target.href)}>Français</a>
                      {', '}
                      <a href="/es/press-material/la-unctad-advierte-de-una-ralentizacion-mundial-provocada-por-los-ajustes-de" onClick={(event) => track(event.target.href)}>Español</a>
                      {', '}
                    </li>
                  </ul>
                </li>
              </ul>
              <h4><a href="/publication/trade-and-environment-review-2023">Download the report</a></h4>
              <div><a href="/publication/trade-and-environment-review-2023"><img src={`${window.location.href.includes('unctad') ? 'https://storage.unctad.org/2023-ter_report/' : './'}assets/img/2023-ter_report_cover.jpg`} alt="TER 2023 Cover" /></a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
