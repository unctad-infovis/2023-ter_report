import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
// import { transpose } from 'csv-transpose';
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLineTwoAxis from './components/ChartLineTwoAxis.jsx';

import '../styles/styles.less';

function Figure8({ lang }) {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el, i) => {
    const labels = Object.keys(el).filter(val => val !== 'Name').map(val => Date.UTC(parseInt(val, 10), 0, 1));
    const values = Object.values(el).map(val => ((parseFloat(val) * 1000) / 1000000000)).filter(val => !Number.isNaN(val));

    return ({
      data: values.map((e, j) => ({
        x: labels[j],
        y: e,
        dataLabels: {
          y: (i === 0 && j === 0) ? 40 : (i === 1 && j === 0) ? -10 : (i === 0) ? 40 : -10
        }
      })),
      name: el.Name,
      yAxis: i
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-ter_report/' : './'}assets/data/2023-ter_report_figure8_en.csv`;
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
      <ChartLineTwoAxis
        data={dataFigure}
        idx="8"
        lang={lang}
        line_width={5}
        note={false}
        show_first_label
        source={lang === 'fr' ? '<em>Source:</em> Prepared by UNCTAD secretariat based on FAO.' : (lang === 'es' ? '<em>Fuente:</em> Prepared by UNCTAD secretariat based on FAO.' : '<em>Source:</em> Prepared by UNCTAD secretariat based on FAO.')}
        subtitle={lang === 'fr' ? 'Value and volume of farmed seaweed, 2010–2020, billions of US dollars, millions of metric tons' : (lang === 'es' ? 'Value and volume of farmed seaweed, 2010–2020, billions of US dollars, millions of metric tons' : 'Value and volume of farmed seaweed, 2010–2020, billions of US dollars, millions of metric tons')}
        suffix=" billion USD"
        title={lang === 'fr' ? 'The seaweed farming boom' : (lang === 'es' ? 'The seaweed farming boom' : 'The seaweed farming boom')}
        title_margin={80}
        xlabel={lang === 'fr' ? '' : (lang === 'es' ? '' : '')}
        ylabel=""
        ymax={[undefined, undefined]}
        ymin={[0, 0]}
        ytickinterval={2}
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

Figure8.propTypes = {
  lang: PropTypes.string
};

Figure8.defaultProps = {
  lang: 'en'
};

export default Figure8;
