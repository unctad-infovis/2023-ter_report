import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartStackedColumn from './components/ChartStackedColumn.jsx';

import '../styles/styles.less';

function Figure3({ lang }) {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el) => {
    // const labels = Object.keys(el).filter(val => val !== 'Name');
    const values = Object.values(el).map(val => (parseFloat(val))).filter(val => !Number.isNaN(val));
    return ({
      data: values,
      name: el.Name,
      showInLegend: true,
      xAxis: 0
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-ter_report/' : './'}assets/data/2023-ter_report_figure3_en.csv`;
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
      <ChartStackedColumn
        data={dataFigure}
        data_decimals={0}
        idx="3"
        lang={lang}
        note={lang === 'fr' ? '<em>Note:</em> ' : (lang === 'es' ? '<em>Nota:</em> ' : '<em>Note:</em> Cross-border refers to purchases sourced from outside the purchaser’s country of residence. Following the transaction, the goods are delivered from overseas to the purchaser’s location.')}
        show_first_label
        source={lang === 'fr' ? '<em>Note:</em> ' : (lang === 'es' ? '<em>Nota:</em> ' : '<em>Source:</em> UNCTAD estimate, based on national data.')}
        subtitle={lang === 'fr' ? '' : (lang === 'es' ? '' : 'Global e-commerce estimates, 2017–2019, billions of US dollars')}
        suffix=" billion USD"
        title={lang === 'fr' ? '' : (lang === 'es' ? '' : 'E-commerce grows within and across borders')}
        xcategories={[2017, 2018, 2019]}
        xlabel={lang === 'fr' ? '' : (lang === 'es' ? '' : '%')}
        ylabel=""
        ymax={1.6}
        ymin={0}
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

Figure3.propTypes = {
  lang: PropTypes.string
};

Figure3.defaultProps = {
  lang: 'en'
};

export default Figure3;
