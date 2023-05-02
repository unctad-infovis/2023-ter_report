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
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-ter_report/' : './'}assets/data/2023-ter_report_figure6_${lang}.csv`;
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
        data_decimals={0}
        export_title_margin={30}
        note={lang === 'fr' ? '<em>Note:</em> ' : (lang === 'es' ? '<em>Nota:</em> ' : '<em>Note:</em> ')}
        source={lang === 'fr' ? '<em>Note:</em> ' : (lang === 'es' ? '<em>Nota:</em> ' : '<em>Source:</em> ')}
        subtitle={lang === 'fr' ? '' : (lang === 'es' ? '' : 'Growth rate of ocean economy services from 2019 to 2020, goods and services, percentage')}
        suffix="%"
        title={lang === 'fr' ? '' : (lang === 'es' ? '' : 'Growth rate of services dropped more than goods in 2020 because of Covid-19')}
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
