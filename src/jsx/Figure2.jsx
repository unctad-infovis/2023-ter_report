import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartStackedGroupedColumn from './components/ChartStackedGroupedColumn.jsx';

import '../styles/styles.less';

function Figure2({ lang }) {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el, i) => {
    // const labels = Object.keys(el).filter(val => val !== 'Name');
    const values = Object.values(el).map(val => (parseFloat(val))).filter((val, j) => !Number.isNaN(val) && j > 0);
    return ({
      color: (i < 2) ? '#009edb' : (i < 4) ? 'rgba(0, 158, 219, 0.8)' : 'rgba(0, 158, 219, 0.6)',
      data: values,
      name: (i < 2) ? 'Year 2020' : (i < 4) ? 'Year 2021' : 'Year 2022',
      showInLegend: !((i % 2)),
      stack: el.Name
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-ter_report/' : './'}assets/data/2023-ter_report_figure2_en.csv`;
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
      <ChartStackedGroupedColumn
        data={dataFigure}
        data_decimals={0}
        idx="2"
        lang={lang}
        note={lang === 'fr' ? '<em>Note:</em> ' : (lang === 'es' ? '<em>Nota:</em> ' : '<em>Note:</em> Internet users are individuals who have used the Internet (from any location) in the last three months. The Internet can be used via a computer, mobile phone, personal digital assistant, games machine, digital TV, etc.')}
        show_first_label
        source={lang === 'fr' ? '<em>Note:</em> ' : (lang === 'es' ? '<em>Nota:</em> ' : '<em>Source:</em> UNCTAD calculation based on ITU (2022); Estimates for 2020 and 2021, forecasts for 2022.')}
        subtitle={lang === 'fr' ? '' : (lang === 'es' ? '' : 'Internet access for men and women, 2020–2022')}
        suffix="%"
        title={lang === 'fr' ? '' : (lang === 'es' ? '' : 'Gender gap in internet access is highest in least developed countries')}
        xcategories={lang === 'fr' ? [] : (lang === 'es' ? [] : ['Developed countries', 'Developing countries', 'Least developed countries'])}
        xlabel={lang === 'fr' ? '' : (lang === 'es' ? '' : '%')}
        ylabel=""
        ymax={100}
        ymin={0}
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

Figure2.propTypes = {
  lang: PropTypes.string
};

Figure2.defaultProps = {
  lang: 'en'
};

export default Figure2;
