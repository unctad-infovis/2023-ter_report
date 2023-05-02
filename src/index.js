import React from 'react';

import { createRoot } from 'react-dom/client';

import Figure1 from './jsx/Figure1.jsx';
import Figure2 from './jsx/Figure2.jsx';
import Figure3 from './jsx/Figure3.jsx';
import Figure4 from './jsx/Figure4.jsx';
import Figure5 from './jsx/Figure5.jsx';
import Figure6 from './jsx/Figure6.jsx';
import Figure7 from './jsx/Figure7.jsx';

let lang = 'en';
if (window.location.href.includes('/fr/')) {
  lang = 'fr';
}
if (window.location.href.includes('/es/')) {
  lang = 'es';
}

const containerFigure1 = document.getElementById('app-root-2023-ter_report_figure1');
if (containerFigure1) {
  const root = createRoot(containerFigure1);
  root.render(<Figure1 lang={lang} />);
}

const containerFigure2 = document.getElementById('app-root-2023-ter_report_figure2');
if (containerFigure2) {
  const root = createRoot(containerFigure2);
  root.render(<Figure2 lang={lang} />);
}

const containerFigure3 = document.getElementById('app-root-2023-ter_report_figure3');
if (containerFigure3) {
  const root = createRoot(containerFigure3);
  root.render(<Figure3 lang={lang} />);
}

const containerFigure4 = document.getElementById('app-root-2023-ter_report_figure4');
if (containerFigure4) {
  const root = createRoot(containerFigure4);
  root.render(<Figure4 lang={lang} />);
}

const containerFigure5 = document.getElementById('app-root-2023-ter_report_figure5');
if (containerFigure5) {
  const root = createRoot(containerFigure5);
  root.render(<Figure5 lang={lang} />);
}

const containerFigure6 = document.getElementById('app-root-2023-ter_report_figure6');
if (containerFigure6) {
  const root = createRoot(containerFigure6);
  root.render(<Figure6 lang={lang} />);
}

const containerFigure7 = document.getElementById('app-root-2023-ter_report_figure7');
if (containerFigure7) {
  const root = createRoot(containerFigure7);
  root.render(<Figure7 lang={lang} />);
}
