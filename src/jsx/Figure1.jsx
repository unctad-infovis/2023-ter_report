import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
// import { transpose } from 'csv-transpose';
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLine.jsx';

import '../styles/styles.less';

function Figure1({ lang }) {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map(el => {
    const labels = Object.keys(el).filter(val => val !== 'Name').map(val => Date.UTC(parseInt(val, 10), 0, 1));

    const values = Object.values(el).map(val => (parseFloat(val))).filter(val => !Number.isNaN(val));

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
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-ter_report/' : './'}assets/data/2023-ter_report_figure1_${lang}.csv`;
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
        idx="1"
        lang={lang}
        line_width={5}
        note={lang === 'fr' ? '<em>Note:</em>' : (lang === 'es' ? '<em>Nota:</em>' : '<em>Note:</em> Internet users are individuals who have used the Internet (from any location) in the last three months. The Internet can be used via a computer, mobile phone, personal digital assistant, games machine, digital TV, etc. Time series data are not yet available for enough developing countries to allow the calculation of group averages for 2022, but ITU forecasts are used.')}
        show_first_label
        source={lang === 'fr' ? '<em>Source:</em>' : (lang === 'es' ? '<em>Fuente:</em> ' : '<em>Source:</em> UNCTAD calculation based on ITU World Telecommunication/ICT Indicators Database, Jan 2023.')}
        subtitle={lang === 'fr' ? '' : (lang === 'es' ? '' : 'Share of population using the Internet, 2005–2022')}
        title={lang === 'fr' ? '' : (lang === 'es' ? '' : 'Internet usage in developing world in catching up slowly')}
        xlabel={lang === 'fr' ? '' : (lang === 'es' ? '' : '')}
        ylabel=""
        ymax={100}
        ymin={0}
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

Figure1.propTypes = {
  lang: PropTypes.string
};

Figure1.defaultProps = {
  lang: 'en'
};

export default Figure1;
