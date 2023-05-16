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
    <div className="app" id="app_footer">
      <div className="footer_container">
        <h2>What do you want to do next?</h2>
        <div className="download_button anchor_downloads"><a href="/publication/trade-and-environment-review-2023">Download the report</a></div>
        <div className="footer_elements">
          <div className="footer_element footer_element_1">
            <div className="footer_content anchor_video">
              <h3>Watch the video</h3>
              <div className="iframe_container youtube_iframe">
                <iframe src="https://www.youtube.com/embed/NJxALd9e1FA" title="Trade and Environment Review" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              <ul>
                <li>
                  <a href="https://youtu.be/I83M2618KIY" target="_blank" rel="noreferrer">Français</a>
                  {', '}
                  <a href="https://youtu.be/MxuCOLvslxk" target="_blank" rel="noreferrer">Español</a>
                  {', '}
                  <a href="https://youtu.be/zXttEgXDN6U" target="_blank" rel="noreferrer">العربية</a>
                  {', '}
                  <a href="https://youtu.be/hnr5TJ7emZo" target="_blank" rel="noreferrer">简体中文</a>
                  {', '}
                  <a href="https://youtu.be/0ObAeDLn0uI" target="_blank" rel="noreferrer">Русский</a>
                  {', '}
                  <a href="https://youtu.be/r-yU48NJQnw" target="_blank" rel="noreferrer">Português</a>
                  {', '}
                  <a href="https://youtu.be/b28pMRN3I1c" target="_blank" rel="noreferrer">Kiswahili</a>
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
                    <iframe src="https://www.youtube.com/embed/QqDYv5-bDhU" title="Trade and Environment Review press conference" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                  <ul>
                    <li><a href="#video" target="_blank" rel="noreferrer">Download the press conference</a></li>
                  </ul>
                </li>
              </ul>
              <ul>
                <li>
                  <h4>Download the report video</h4>
                  <ul>
                    <li>
                      <a href="https://vimeo.com/823774497" target="_blank" rel="noreferrer">English</a>
                      {', '}
                      <a href="https://vimeo.com/824210062" target="_blank" rel="noreferrer">Français</a>
                      {', '}
                      <a href="https://vimeo.com/824210366" target="_blank" rel="noreferrer">Español</a>
                      {', '}
                      <a href="https://vimeo.com/824209722" target="_blank" rel="noreferrer">العربية</a>
                      {', '}
                      <a href="https://vimeo.com/824209838" target="_blank" rel="noreferrer">简体中文</a>
                      {', '}
                      <a href="https://vimeo.com/826140188" target="_blank" rel="noreferrer">Русский</a>
                      {', '}
                      <a href="https://vimeo.com/824210255" target="_blank" rel="noreferrer">Português</a>
                      {', '}
                      <a href="https://vimeo.com/824210152" target="_blank" rel="noreferrer">Kiswahili</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <h4>Read the news article</h4>
                  <ul>
                    <li>
                      <a href="/news/global-blue-deal-urgently-needed-protect-and-invest-our-ocean" onClick={(event) => track(event.target.href)}>English</a>
                      {', '}
                      <a href="/fr/news/il-est-urgent-dadopter-un-pacte-bleu-mondial-pour-investir-et-proteger-nos-oceans" onClick={(event) => track(event.target.href)}>Français</a>
                      {', '}
                      <a href="/es/news/se-necesita-con-urgencia-un-pacto-azul-mundial-para-proteger-e-invertir-en-nuestro-oceano" onClick={(event) => track(event.target.href)}>Español</a>
                    </li>
                  </ul>
                </li>
              </ul>
              <h4><a href="/publication/trade-and-environment-review-2023">Download the report</a></h4>
              <div><a href="/publication/trade-and-environment-review-2023"><img src={`${window.location.href.includes('unctad') ? 'https://storage.unctad.org/2023-ter_report/' : './'}assets/img/2023-ter_report_cover.png`} alt="TER 2023 Cover" /></a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
