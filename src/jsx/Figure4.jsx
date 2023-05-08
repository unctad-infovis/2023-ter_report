import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
import { transpose } from 'csv-transpose';
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartBar from './components/ChartBar.jsx';

import '../styles/styles.less';

function Figure4({ lang }) {
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
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-ter_report/' : './'}assets/data/2023-ter_report_figure4_en.csv`;
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
        idx="4"
        data={dataFigure}
        data_decimals={0}
        export_title_margin={70}
        note={false}
        source={lang === 'fr' ? '<em>Source:</em> NCTAD estimates based on UNCTADstat (accessed in January 2023).' : (lang === 'es' ? '<em>Fuente:</em> NCTAD estimates based on UNCTADstat (accessed in January 2023).' : '<em>Source:</em> UNCTAD estimates based on UNCTADstat (accessed in January 2023).')}
        subtitle={lang === 'fr' ? 'Exports per category of ocean-based goods and services, 2020, billions of US dollars' : (lang === 'es' ? 'Exports per category of ocean-based goods and services, 2020, billions of US dollars' : 'Exports per category of ocean-based goods and services, 2020, billions of US dollars')}
        suffix=" billion USD"
        title={lang === 'fr' ? 'Sizing up the ocean economy' : (lang === 'es' ? 'Sizing up the ocean economy' : 'Sizing up the ocean economy')}
        x_axis_labels_offset={-10}
        ymax={350}
        ymin={0}
        ylabel=""
        y_tick_interval={50}
      />
      )}
    </div>
  );
}

Figure4.propTypes = {
  lang: PropTypes.string
};

Figure4.defaultProps = {
  lang: 'en'
};

export default Figure4;
