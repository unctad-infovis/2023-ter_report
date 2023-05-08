import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartStackedBar from './components/ChartStackedBar.jsx';

import '../styles/styles.less';

function Figure5({ lang }) {
  // Data states.
  const [dataFigure1, setDataFigure1] = useState(false);
  const [dataFigure2, setDataFigure2] = useState(false);
  const [activeGraph, setActiveGraph] = useState(1);

  const cleanData = (data) => data.map((el) => {
    // const labels = Object.keys(el).filter(val => val !== 'Name');
    const values = Object.values(el).map(val => (parseFloat(val) / 1000)).filter(val => !Number.isNaN(val));
    return ({
      data: values,
      name: el.Name,
      labels: Object.keys(el).filter(val => val !== 'Name'),
      showInLegend: true,
      xAxis: 0
    });
  });

  useEffect(() => {
    try {
      fetch(`${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-ter_report/' : './'}assets/data/2023-ter_report_figure5b_en.csv`)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure1(cleanData(CSVtoJSON(body))));
    } catch (error) {
      console.error(error);
    }

    try {
      fetch(`${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-ter_report/' : './'}assets/data/2023-ter_report_figure5a_en.csv`)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure2(cleanData(CSVtoJSON(body))));
    } catch (error) {
      console.error(error);
    }
  }, [lang]);

  const changeActiveGraph = (idx) => {
    setActiveGraph(idx);
  };

  return (
    <div className="app">
      <div className="buttons_container">
        <div className="button_label">Show:</div>
        <div className="button_container">
          <button type="button" className={activeGraph === 1 ? 'active' : ''} onClick={() => changeActiveGraph(1)}>Developing economies</button>
        </div>
        <div className="button_container">
          <button type="button" className={activeGraph === 2 ? 'active' : ''} onClick={() => changeActiveGraph(2)}>All economies</button>
        </div>
      </div>
      {dataFigure1 && (
        <div className={activeGraph === 1 ? 'chart_wrapper active' : 'chart_wrapper'}>
          <ChartStackedBar
            data={dataFigure1}
            data_decimals={0}
            idx="5b"
            lang={lang}
            note={false}
            show_first_label
            source={lang === 'fr' ? '<em>Note:</em> ' : (lang === 'es' ? '<em>Nota:</em> ' : '<em>Source:</em> UNCTAD ranking based on UNCTADstat (accessed in January 2023).')}
            subtitle={lang === 'fr' ? '' : (lang === 'es' ? '' : 'Combined exports of goods and services, 2020, billions of US dollars')}
            suffix=""
            title={lang === 'fr' ? '' : (lang === 'es' ? '' : 'Top 10 ocean economy exporters among developing countries (excluding China)')}
            xcategories={['Goods', 'Services']}
            xlabel={lang === 'fr' ? '' : (lang === 'es' ? '' : '')}
            ymax={40}
            ylabel=""
          />
        </div>
      )}
      {dataFigure2 && (
        <div className={activeGraph === 2 ? 'chart_wrapper active' : 'chart_wrapper'}>
          <ChartStackedBar
            data={dataFigure2}
            data_decimals={0}
            idx="5a"
            lang={lang}
            note={false}
            show_first_label
            source={lang === 'fr' ? '<em>Note:</em> ' : (lang === 'es' ? '<em>Nota:</em> ' : '<em>Source:</em> UNCTAD ranking based on UNCTADstat (accessed in January 2023).')}
            subtitle={lang === 'fr' ? '' : (lang === 'es' ? '' : 'Combined exports of goods and services, 2020, billions of US dollars')}
            suffix=""
            title={lang === 'fr' ? '' : (lang === 'es' ? '' : 'Top 10 ocean economy exporters in the world')}
            xcategories={['Goods', 'Services']}
            xlabel={lang === 'fr' ? '' : (lang === 'es' ? '' : '')}
            ymax={500}
            ylabel=""
          />
        </div>
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

Figure5.propTypes = {
  lang: PropTypes.string
};

Figure5.defaultProps = {
  lang: 'en'
};

export default Figure5;
