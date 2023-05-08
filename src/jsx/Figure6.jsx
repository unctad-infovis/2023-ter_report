import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
import { transpose } from 'csv-transpose';
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartBar from './components/ChartBar.jsx';

import '../styles/styles.less';

function Figure6({ lang }) {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map(el => {
    const values = Object.values(el);
    const keys = Object.keys(el);

    return ({
      data: values.map((val, i) => ({
        color: (i < 7) ? '#009edb' : '#72bf44',
        y: parseFloat(val),
      })).filter(val => !Number.isNaN(val.y)),
      labels: keys.filter(val => val !== 'Name'),
      name: el.Name
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-ter_report/' : './'}assets/data/2023-ter_report_figure6_en.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON(transpose(body)))));
    } catch (error) {
      console.error(error);
    }
  }, [lang]);

  return (
    <div className="app">
      {dataFigure && (
      <ChartBar
        idx="6"
        data={dataFigure}
        data_decimals={1}
        export_title_margin={30}
        note={false}
        source={lang === 'fr' ? '<em>Source:</em> ' : (lang === 'es' ? '<em>Fuente:</em> UNCTAD calculations based on UNCTADstat (accessed in January 2023).' : '<em>Source:</em> UNCTAD calculations based on UNCTADstat (accessed in January 2023).')}
        subtitle={lang === 'fr' ? 'Growth rate of ocean economy exports from 2019 to 2020, goods and services' : (lang === 'es' ? 'Growth rate of ocean economy exports from 2019 to 2020, goods and services' : 'Growth rate of ocean economy exports from 2019 to 2020, goods and services')}
        suffix="%"
        title={lang === 'fr' ? 'Ocean-based services hit hardest by COVID-' : (lang === 'es' ? 'Ocean-based services hit hardest by COVID-' : 'Ocean-based services hit hardest by COVID-19')}
        x_axis_labels_offset={-10}
        ymax={15}
        ymin={-80}
        ylabel=""
        y_tick_interval={10}
      />
      )}
    </div>
  );
}

Figure6.propTypes = {
  lang: PropTypes.string
};

Figure6.defaultProps = {
  lang: 'en'
};

export default Figure6;
