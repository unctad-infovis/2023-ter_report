import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/styles.less';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartPie from './components/ChartPie.jsx';

function Figure11({ lang }) {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => ([{
    data: (data).map(el => ({
      dataLabels: {
        distance: -30,
        x: 0,
        y: 0
      },
      name: el.Name,
      selected: true,
      sliced: false,
      y: parseFloat(Object.values(el)[1]),
    })),
    name: 'Assistance'
  }]);

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-ter_report/' : './'}assets/data/2023-ter_report_figure11_${lang}.csv`;
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

  return (
    <div className="app">
      {dataFigure && (
      <ChartPie
        allow_decimals
        data={dataFigure}
        data_decimals={0}
        export_title_margin={0}
        idx="11"
        labels
        source="UNCTAD calculations."
        subtitle="Only 1.6% of total Official Development Assistance was directed to the ocean economy from 2013 to 2018"
        tick_interval={2}
        title="Official development assistance donut chart"
        xlabel=""
      />
      )}
    </div>
  );
}

Figure11.propTypes = {
  lang: PropTypes.string
};

Figure11.defaultProps = {
  lang: 'en'
};

export default Figure11;
