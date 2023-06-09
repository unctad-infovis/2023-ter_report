import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
// import { transpose } from 'csv-transpose';
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLine.jsx';

import '../styles/styles.less';

function Figure7({ lang }) {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map(el => {
    const labels = Object.keys(el).filter(val => val !== 'Name').map(val => Date.UTC(parseInt(val, 10), 0, 1));
    const values = Object.values(el).map(val => (parseFloat(val)) / 1000000000).filter(val => !Number.isNaN(val));

    return ({
      data: values.map((e, i) => ({
        x: labels[i],
        y: e
      })),
      name: el.Name,
      yAxis: 0
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-ter_report/' : './'}assets/data/2023-ter_report_figure7_en.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON((body)))));
    } catch (error) {
      console.error(error);
    }
  }, [lang]);

  return (
    <div className="app">
      {dataFigure && (
      <ChartLine
        data={dataFigure}
        idx="7"
        lang={lang}
        line_width={5}
        note={false}
        show_first_label
        source={lang === 'fr' ? '<em>Source:</em>' : (lang === 'es' ? '<em>Fuente:</em> ' : '<em>Source:</em> UNCTAD based on OECD Fisheries Support Estimates data (2023).')}
        subtitle={lang === 'fr' ? '' : (lang === 'es' ? '' : 'Fisheries support estimates for 40 industrialized nations, 2010–2020, billions of US dollars')}
        suffix=" billion USD"
        title={lang === 'fr' ? '' : (lang === 'es' ? '' : 'Wrong turn: Fisheries subsidies are back on the rise')}
        xlabel={lang === 'fr' ? '' : (lang === 'es' ? '' : '')}
        ylabel=""
        ymax={15}
        ymin={0}
        ytickinterval={5}
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

Figure7.propTypes = {
  lang: PropTypes.string
};

Figure7.defaultProps = {
  lang: 'en'
};

export default Figure7;
