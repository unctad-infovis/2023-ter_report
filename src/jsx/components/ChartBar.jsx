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
import formatNr from '../helpers/FormatNr.js';

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
  data, data_decimals, export_title_margin, idx, labels_inside, prefix, note, source, subtitle, suffix, title, x_axis_labels_offset, xlabel, ylabel, ymax, ymin, y_tick_interval
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
        text: `${source} ${note ? (`<br /><span>${note}</span>`) : ''}`,
        verticalAlign: 'bottom',
        x: 0
      },
      chart: {
        events: {
          load() {
            // eslint-disable-next-line react/no-this-in-sfc
            this.renderer.image('https://storage.unctad.org/2023-ter_report/assets/img/unctad_logo.svg', 5, 15, 80, 100).add();
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
        },
        enabled: true,
        filename: '2023-unctad'
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
          enableMouseTracking: true,
          dataLabels: {
            align: (labels_inside) ? 'right' : undefined,
            inside: (labels_inside === true) ? true : undefined,
            enabled: true,
            formatter() {
              // eslint-disable-next-line react/no-this-in-sfc
              if (this.value > 10000) {
              // eslint-disable-next-line react/no-this-in-sfc
                return `${prefix}${formatNr(this.value, ' ')}`;
              }
              // eslint-disable-next-line react/no-this-in-sfc
              return (this.y !== 0) ? (suffix === '%') ? `${prefix}${formatNr(roundNr(this.y, data_decimals).toFixed(data_decimals), ' ', '', '', false, true)}${suffix}` : `${prefix}${roundNr(this.y, data_decimals).toFixed(data_decimals)}` : '';
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
        widthAdjust: -200,
        x: 100,
      },
      tooltip: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderRadius: 0,
        borderWidth: 1,
        crosshairs: false,
        formatter() {
          // eslint-disable-next-line react/no-this-in-sfc
          if (this.y === 0) return false;
          // eslint-disable-next-line react/no-this-in-sfc
          return `<div class="tooltip_container"><h3 class="tooltip_header">${this.x}</h3><div class="tooltip_row" style="color: ${this.points[0].color}"><span class="tooltip_value">${(suffix === '%') ? `${prefix}${formatNr(roundNr(this.points[0].y, data_decimals).toFixed(data_decimals), ' ', '', '', false, true)}` : `${prefix}${roundNr(this.points[0].y, data_decimals).toFixed(data_decimals)}`}${suffix}</span></div></div>`;
        },
        shadow: false,
        shared: true,
        useHTML: true
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
          y: x_axis_labels_offset
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
          color: 'rgba(124, 112, 103, 0.2)',
          value: 0.1,
          width: 1,
          zIndex: 9
        }],
        showFirstLabel: true,
        showLastLabel: true,
        tickInterval: y_tick_interval,
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
  }, [export_title_margin, data, data_decimals, idx, labels_inside, note, prefix, source, subtitle, suffix, title, x_axis_labels_offset, xlabel, ylabel, ymax, ymin, y_tick_interval]);

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
  x_axis_labels_offset: PropTypes.number,
  xlabel: PropTypes.string,
  ylabel: PropTypes.string,
  ymax: PropTypes.number,
  ymin: PropTypes.number,
  y_tick_interval: PropTypes.number
};

BarChart.defaultProps = {
  export_title_margin: 0,
  labels_inside: false,
  note: false,
  prefix: '',
  subtitle: false,
  suffix: '',
  x_axis_labels_offset: undefined,
  xlabel: '',
  ylabel: '',
  ymax: undefined,
  ymin: undefined,
  y_tick_interval: undefined
};

export default BarChart;
