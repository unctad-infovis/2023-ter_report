import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

// https://www.highcharts.com/
import Highcharts from 'highcharts';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import highchartsExporting from 'highcharts/modules/exporting';
import highchartsExportData from 'highcharts/modules/export-data';

// Load helpers.
import roundNr from '../helpers/RoundNr.js';

highchartsAccessibility(Highcharts);
highchartsExporting(Highcharts);
highchartsExportData(Highcharts);

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    downloadCSV: 'Download CSV data',
    thousandsSep: ','
  }
});
Highcharts.SVGRenderer.prototype.symbols.download = (x, y, w, h) => {
  const path = [
    // Arrow stem
    'M', x + w * 0.5, y,
    'L', x + w * 0.5, y + h * 0.7,
    // Arrow head
    'M', x + w * 0.3, y + h * 0.5,
    'L', x + w * 0.5, y + h * 0.7,
    'L', x + w * 0.7, y + h * 0.5,
    // Box
    'M', x, y + h * 0.9,
    'L', x, y + h,
    'L', x + w, y + h,
    'L', x + w, y + h * 0.9
  ];
  return path;
};

function BarChart({
  data, data_decimals, export_title_margin, idx, labels_inside, prefix, note, source, subtitle, suffix, title, xlabel, ylabel, ymax, ymin
}) {
  const chartRef = useRef();

  const chartHeight = 750;
  const isVisible = useIsVisible(chartRef, { once: true });
  const createChart = useCallback(() => {
    Highcharts.chart(`chartIdx${idx}`, {
      caption: {
        align: 'left',
        margin: 15,
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontSize: '14px'
        },
        text: `<em>Source:</em> ${source} ${note ? (`<br /><em>Note:</em> <span>${note}</span>`) : ''}`,
        verticalAlign: 'bottom',
        x: 0
      },
      chart: {
        events: {
          load() {
            // eslint-disable-next-line react/no-this-in-sfc
            this.renderer.image('https://unctad.org/sites/default/files/2022-11/unctad_logo.svg', 5, 15, 80, 100).add();
          }
        },
        height: chartHeight,
        resetZoomButton: {
          theme: {
            fill: '#fff',
            r: 0,
            states: {
              hover: {
                fill: '#0077b8',
                stroke: 'transparent',
                style: {
                  color: '#fff'
                }
              }
            },
            stroke: '#7c7067',
            style: {
              fontFamily: 'Roboto',
              fontSize: '13px',
              fontWeight: 400
            }
          }
        },
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontFamily: 'Roboto',
          fontWeight: 400
        },
        type: 'bar'
      },
      colors: ['#009edb'],
      credits: {
        enabled: false
      },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: ['viewFullscreen', 'separator', 'downloadPNG', 'downloadPDF', 'separator', 'downloadCSV'],
            symbol: 'download',
            symbolFill: '#000'
          }
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        bar: {
          animation: {
            duration: 2000,
          },
          cursor: 'default',
          enableMouseTracking: false,
          dataLabels: {
            align: (labels_inside) ? 'right' : undefined,
            inside: (labels_inside === true) ? true : undefined,
            enabled: true,
            formatter() {
              // eslint-disable-next-line react/no-this-in-sfc
              return (this.y !== 0) ? `${prefix}${roundNr(this.y, data_decimals).toFixed(data_decimals)}${suffix}` : '';
            },
            color: (labels_inside) ? '#fff' : 'rgba(0, 0, 0, 0.8)',
            style: {
              fontFamily: 'Roboto',
              fontSize: '18px',
              fontWeight: 400,
              textOutline: 'none'
            }
          },
          pointWidth: 35
        }
      },
      responsive: {
        rules: [{
          chartOptions: {
            legend: {
              layout: 'horizontal'
            }
          },
          condition: {
            maxWidth: 500
          }
        }]
      },
      series: data,
      subtitle: {
        align: 'left',
        enabled: true,
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '18px'
        },
        text: subtitle,
        widthAdjust: -144,
        x: 100,
      },
      title: {
        align: 'left',
        margin: export_title_margin,
        style: {
          color: '#000',
          fontSize: '30px',
          fontWeight: 700
        },
        text: title,
        widthAdjust: -180,
        x: 100,
      },
      tooltip: {
        enabled: false,
      },
      xAxis: {
        accessibility: {
          description: xlabel
        },
        categories: data[0].labels,
        labels: {
          allowOverlap: true,
          align: 'right',
          formatter: (el) => ((el.value === 'Goods' || el.value === 'Services') ? `<span class="x_axis_heading">${el.value}</span>` : (el.value !== '""') ? el.value : ''),
          reserveSpace: true,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 400,
            textOverflow: 'allow',
            wordBreak: 'break-all'
          },
          y: -10
        },
        lineColor: 'transparent',
        tickWidth: 0,
        title: {
          text: null
        }
      },
      yAxis: {
        accessibility: {
          description: 'Index'
        },
        allowDecimals: true,
        custom: {
          allowNegativeLog: true
        },
        gridLineColor: 'rgba(124, 112, 103, 0.2)',
        gridLineWidth: 1,
        gridLineDashStyle: 'shortdot',
        labels: {
          formatter() {
            // eslint-disable-next-line react/no-this-in-sfc
            return `${prefix}${this.value}`;
          },
          rotation: 0,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          }
        },
        endOnTick: false,
        lineColor: 'transparent',
        lineWidth: 0,
        max: ymax,
        min: ymin,
        opposite: false,
        startOnTick: false,
        plotLines: [{
          color: 'rgba(124, 112, 103, 0.6)',
          value: 0,
          width: 1
        }],
        showFirstLabel: true,
        showLastLabel: false,
        tickInterval: 50,
        title: {
          enabled: true,
          reserveSpace: true,
          rotation: 0,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          },
          text: ylabel,
          verticalAlign: 'top',
        },
        type: 'linear'
      }
    }, () => {
    });
    chartRef.current.querySelector(`#chartIdx${idx}`).style.opacity = 1;
  }, [export_title_margin, data, data_decimals, idx, labels_inside, note, prefix, source, subtitle, suffix, title, xlabel, ylabel, ymax, ymin]);

  useEffect(() => {
    if (isVisible === true) {
      setTimeout(() => {
        createChart();
      }, 300);
    }
  }, [createChart, isVisible]);

  return (
    <div className="chart_container" style={{ minHeight: chartHeight }}>
      <div ref={chartRef}>
        {(isVisible) && (<div className="chart" id={`chartIdx${idx}`} />)}
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

BarChart.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  data_decimals: PropTypes.number.isRequired,
  export_title_margin: PropTypes.number,
  idx: PropTypes.string.isRequired,
  labels_inside: PropTypes.bool,
  note: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  prefix: PropTypes.string,
  source: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  suffix: PropTypes.string,
  title: PropTypes.string.isRequired,
  xlabel: PropTypes.string,
  ylabel: PropTypes.string,
  ymax: PropTypes.number,
  ymin: PropTypes.number
};

BarChart.defaultProps = {
  export_title_margin: 0,
  labels_inside: false,
  note: false,
  prefix: '',
  subtitle: false,
  suffix: '',
  xlabel: '',
  ylabel: '',
  ymax: undefined,
  ymin: undefined
};

export default BarChart;
