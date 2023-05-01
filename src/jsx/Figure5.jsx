import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartStackedBar from './components/ChartStackedBar.jsx';

import '../styles/styles.less';

function Figure5({ lang }) {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

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
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-ter_report/' : './'}assets/data/2023-ter_report_figure5_${lang}.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON(body))));
    } catch (error) {
      console.error(error);
    }
  }, [lang]);
  //
  return (
    <div className="app">
      {dataFigure && (
      <ChartStackedBar
        data={dataFigure}
        data_decimals={0}
        idx="5"
        lang={lang}
        note={lang === 'fr' ? '<em>Note:</em> ' : (lang === 'es' ? '<em>Nota:</em> ' : '<em>Note:</em> ')}
        show_first_label
        source={lang === 'fr' ? '<em>Note:</em> ' : (lang === 'es' ? '<em>Nota:</em> ' : '<em>Source:</em> ')}
        subtitle={lang === 'fr' ? '' : (lang === 'es' ? '' : 'European Union and 10 biggest exporting countries, goods and services, billions of dollars')}
        suffix=""
        title={lang === 'fr' ? '' : (lang === 'es' ? '' : 'European Union is by far the biggest exporter in ocean economy')}
        xcategories={['Goods', 'Services']}
        xlabel={lang === 'fr' ? '' : (lang === 'es' ? '' : '')}
        ymax={500}
        ylabel=""
      />
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
