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

function StackedColumnChart({
  data, idx, note, source, suffix, subtitle, title, xcategories, xlabel, ylabel, ymax, ymin
}) {
  const chartRef = useRef();
  const isVisible = useIsVisible(chartRef, { once: true });

  const chartHeight = 650;
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
        type: 'column'
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
        },
        enabled: true,
        filename: '2023-unctad'
      },
      legend: {
        align: 'right',
        enabled: (data.length > 1),
        itemStyle: {
          color: '#000',
          cursor: 'default',
          fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: 400
        },
        layout: 'horizontal',
        margin: 10,
        verticalAlign: 'top'
      },
      plotOptions: {
        column: {
          animation: {
            duration: 3000,
          },
          cursor: 'pointer',
          dataLabels: {
            align: 'center',
            enabled: true,
            style: {
              color: '#fff',
              fontFamily: 'Roboto',
              fontSize: '16px',
              fontWeight: 400,
              textOutline: '0px solid #fff'
            },
            useHTML: true,
            verticalAlign: 'middle'
          },
          events: {
            legendItemClick() {
              return false;
            },
            mouseOver() {
              return false;
            }
          },
          groupPadding: 0.08,
          selected: true,
          lineWidth: 0,
          marker: {
            enabled: false,
            radius: 0,
            states: {
              hover: {
                animation: false,
                enabled: false,
                radius: 8
              }
            },
            symbol: 'circle'
          },
          stacking: 'normal',
          states: {
            hover: {
              halo: {
                size: 0
              },
              enabled: false,
              lineWidth: 0
            }
          }
        }
      },
      responsive: {
        rules: [{
          chartOptions: {
            title: {
              margin: 40
            }
          },
          condition: {
            maxWidth: 800
          }
        }, {
          chartOptions: {
            title: {
              style: {
                fontSize: '22px',
                lineHeight: '26px'
              }
            }
          },
          condition: {
            maxWidth: 450
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
        margin: 60,
        style: {
          color: '#000',
          fontSize: '30px',
          fontWeight: 700
        },
        text: title,
        widthAdjust: -160,
        x: 100,
      },
      tooltip: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderRadius: 0,
        borderWidth: 1,
        crosshairs: true,
        formatter() {
          // eslint-disable-next-line react/no-this-in-sfc
          return `<div class="tooltip_container"><h3 class="tooltip_header">${this.x}</h3><div class="tooltip_row" style="color: ${this.points[0].color}"><span class="tooltip_label">Domestic:</span> <span class="tooltip_value">${this.points[0].y}${suffix}</span></div><div class="tooltip_row" style="color: ${this.points[1].color}"><span class="tooltip_label">Cross-border:</span> <span class="tooltip_value">${this.points[1].y}${suffix}</span></div></div>`;
        },
        shadow: false,
        shared: true,
        useHTML: true
      },
      xAxis: {
        accessibility: {
          description: xlabel
        },
        allowDecimals: false,
        categories: xcategories,
        crosshair: {
          color: 'transparent',
          width: 1
        },
        labels: {
          rotation: 0,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          },
          y: 40
        },
        lineColor: 'transparent',
        lineWidth: 0,
        opposite: false,
        showFirstLabel: true,
        showLastLabel: true,
        tickWidth: 0,
        type: 'category',
        title: {
          text: null
        }
      },
      yAxis: {
        accessibility: {
          description: 'Value'
        },
        allowDecimals: false,
        gridLineColor: 'rgba(124, 112, 103, 0.2)',
        gridLineWidth: 1,
        gridLineDashStyle: 'shortdot',
        labels: {
          formatter() {
            // eslint-disable-next-line react/no-this-in-sfc
            return this.value === 0 ? 0 : this.value.toFixed(1);
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
        reversedStacks: false,
        startOnTick: false,
        showFirstLabel: true,
        showLastLabel: true,
        stackLabels: {
          align: 'center',
          enabled: true,
          formatter() {
            // eslint-disable-next-line react/no-this-in-sfc
            return `${this.total}`;
          },
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 600
          }
        },
        tickInterval: 0.2,
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
          verticalAlign: 'top'
        },
        type: 'linear'
      }
    });
    chartRef.current.querySelector(`#chartIdx${idx}`).style.opacity = 1;
  }, [data, idx, note, source, subtitle, suffix, title, xcategories, xlabel, ylabel, ymax, ymin]);

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

StackedColumnChart.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  idx: PropTypes.string.isRequired,
  note: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  source: PropTypes.string.isRequired,
  suffix: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  xcategories: PropTypes.instanceOf(Array).isRequired,
  xlabel: PropTypes.string,
  ylabel: PropTypes.string,
  ymax: PropTypes.number,
  ymin: PropTypes.number
};

StackedColumnChart.defaultProps = {
  note: false,
  subtitle: false,
  suffix: '',
  xlabel: 'Year',
  ylabel: '',
  ymax: undefined,
  ymin: undefined
};

export default StackedColumnChart;
