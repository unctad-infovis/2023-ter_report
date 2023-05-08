import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLineTwoAxis from './components/ChartLineTwoAxis.jsx';

import '../styles/styles.less';

function Figure10({ lang }) {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el, i) => {
    const divider = (i === 0) ? 1000000 : 1000;
    const labels = Object.keys(el).filter(val => val !== 'Name').map(val => Date.UTC(parseInt(val, 10), 0, 1));
    const values = Object.values(el).map(val => (parseFloat(val) / divider)).filter(val => !Number.isNaN(val));

    return ({
      data: values.map((e, j) => ({
        x: labels[j],
        y: e,
        dataLabels: {
          y: (i === 0 && j === 0) ? -10 : (i === 1 && j === 0) ? 30 : (i === 0) ? 40 : -10
        }
      })),
      name: el.Name,
      yAxis: i
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-ter_report/' : './'}assets/data/2023-ter_report_figure10_en.csv`;
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
      <ChartLineTwoAxis
        idx="10"
        data={dataFigure}
        note="Total plastics trade has been aggregated across five stages of the life-cycle of plastics: primary forms of plastics, intermediate forms of plastics, intermediate manufactured plastic products, final manufactured plastic products, and plastic waste. The hierarchy table used for the aggregation of Harmonized-System six-digit is available on the UNCTADstat Classifications website."
        source="UNCTADstat based on calculations using UN Comtrade."
        subtitle="Value and volume of global plastic goods exports between 2005 and 2021, billions of US dollars, millions of metric tons"
        suffix=""
        xlabel=""
        title="The soaring global plastics trade"
        ylabel=""
        ymax={[1400, 400]}
        ymin={[400, 160]}
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

Figure10.propTypes = {
  lang: PropTypes.string
};

Figure10.defaultProps = {
  lang: 'en'
};

export default Figure10;
