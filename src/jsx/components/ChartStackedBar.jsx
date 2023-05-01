import React, {
  useEffect, useCallback, useRef, memo
} from 'react';
import PropTypes from 'prop-types';

// https://www.highcharts.com/
import Highcharts from 'highcharts';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import highchartsExporting from 'highcharts/modules/exporting';
import highchartsExportData from 'highcharts/modules/export-data';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

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

function StackedBarChart({
  data, data_decimals, export_title_margin, idx, note, source, standalone, subtitle, suffix, title, xlabel, xlabelrotation, ymax, ymin
}) {
  const chartRef = useRef();

  console.log(data);

  const chartHeight = 700;
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
        useHTML: true,
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
              fontSize: 13,
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
      colors: ['#009edb', '#72bf44'],
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
        align: 'right',
        enabled: (data.length > 1),
        itemDistance: 30,
        itemStyle: {
          color: '#000',
          cursor: 'pointer',
          fontFamily: 'Roboto',
          fontSize: '16px',
          fontWeight: 400
        },
        layout: 'horizontal',
        reversed: false,
        useHTML: true,
        verticalAlign: 'top',
        x: -20
      },
      plotOptions: {
        bar: {
          animation: {
            duration: 2000,
          },
          cursor: 'default',
          enableMouseTracking: true,
          groupPadding: 0.05,
          dataLabels: {
            style: {
              color: '#fff',
              fontFamily: 'Roboto',
              fontSize: '13px',
              fontWeight: 400,
              textOutline: 0
            }
          },
          events: {
            legendItemClick(e) {
              e.preventDefault();
            },
          },
          stacking: 'normal'
        }
      },
      responsive: {
        rules: [{
          chartOptions: {
            legend: {
              layout: 'horizontal'
            },
            title: {
              margin: 0,
              style: {
                fontSize: '26px',
                lineHeight: '30px'
              }
            }
          },
          condition: {
            maxWidth: 500
          }
        }, {
          chartOptions: {
            chart: {
              height: chartHeight + 100
            },
            legend: {
              layout: 'horizontal'
            }
          },
          condition: {
            maxWidth: 450
          }
        }, {
          chartOptions: {
            chart: {
              height: chartHeight + 150
            },
            legend: {
              layout: 'horizontal'
            }
          },
          condition: {
            maxWidth: 350
          }
        }]
      },
      series: data,
      xAxis: {
        accessibility: {
          description: xlabel
        },
        allowDecimals: false,
        categories: data[0].labels,
        crosshair: {
          color: 'rgba(124, 112, 103, 0.2)',
          width: 1
        },
        labels: {
          allowOverlap: true,
          rotation: xlabelrotation,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          }
        },
        lineColor: 'transparent',
        lineWidth: 0,
        opposite: false,
        showFirstLabel: true,
        showLastLabel: true,
        tickWidth: 1,
        title: {
          enabled: false,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          },
          text: xlabel
        }
      },
      subtitle: {
        align: 'left',
        enabled: true,
        widthAdjust: -144,
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '18px'
        },
        x: 100,
        text: subtitle
      },
      title: {
        align: 'left',
        margin: export_title_margin,
        widthAdjust: -160,
        style: {
          color: '#000',
          fontSize: '30px',
          fontWeight: 700,
          lineHeight: '34px'
        },
        x: 100,
        text: title
      },
      tooltip: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderRadius: 0,
        borderWidth: 1,
        crosshairs: false,
        formatter() {
          // eslint-disable-next-line react/no-this-in-sfc
          const values = this.points.map(point => [point.series.name, point.y, point.color]);
          const rows = [];
          rows.push(values.map(point => `<div style="color: ${point[2]}"><span class="tooltip_label">${(point[0]) ? `${point[0]}: ` : ''}</span><span class="tooltip_value">${roundNr(point[1], data_decimals)} billion USD</span></div>`).join(''));
          // eslint-disable-next-line react/no-this-in-sfc
          return `<div class="tooltip_container"><h3 class="tooltip_header">${xlabel} ${this.points[0].key}</h3>${rows}</div>`;
        },
        shadow: false,
        shared: true,
        useHTML: true
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
          formatter: (el) => `${formatNr(el.value)}${suffix}`,
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
        reversedStacks: false,
        showFirstLabel: true,
        showLastLabel: true,
        stackLabels: {
          enabled: true,
          formatter() {
            // eslint-disable-next-line react/no-this-in-sfc
            return `${roundNr(this.total, 0)}${suffix}`;
          },
          style: {
            color: '#000',
            fontSize: '16px',
            fontWeight: 400,
            textOutline: 'none'
          },
          y: 0
        },
        startOnTick: false,
        tickInterval: ymax / 5,
        title: {
          enabled: true,
          reserveSpace: false,
          rotation: 0,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          },
          text: null,
          y: 10
        },
        type: 'linear'
      }
    });
    chartRef.current.querySelector(`#chartIdx${idx}`).style.opacity = 1;
  }, [idx, data, data_decimals, export_title_margin, note, source, subtitle, suffix, title, xlabel, xlabelrotation, ymax, ymin]);

  useEffect(() => {
    if (isVisible === true) {
      setTimeout(() => {
        createChart();
      }, 300);
    }
  }, [createChart, isVisible]);

  return (
    <div className="chart_container" style={(standalone) ? { minHeight: chartHeight } : { minHeight: chartHeight }}>
      <div ref={chartRef}>
        {(isVisible) && (<div className="chart" id={`chartIdx${idx}`} />)}
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

StackedBarChart.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  data_decimals: PropTypes.number.isRequired,
  export_title_margin: PropTypes.number,
  idx: PropTypes.string.isRequired,
  note: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  source: PropTypes.string.isRequired,
  standalone: PropTypes.bool,
  subtitle: PropTypes.string,
  suffix: PropTypes.string,
  title: PropTypes.string.isRequired,
  xlabel: PropTypes.string,
  xlabelrotation: PropTypes.number,
  ymax: PropTypes.number,
  ymin: PropTypes.number
};

StackedBarChart.defaultProps = {
  export_title_margin: 20,
  note: false,
  standalone: false,
  subtitle: false,
  suffix: '',
  xlabel: '',
  xlabelrotation: 0,
  ymax: undefined,
  ymin: undefined
};

export default memo(StackedBarChart);
