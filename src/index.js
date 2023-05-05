import React from 'react';

import { createRoot } from 'react-dom/client';

import Figure1 from './jsx/Figure1.jsx';
import Figure2 from './jsx/Figure2.jsx';
import Figure3 from './jsx/Figure3.jsx';
import Figure4 from './jsx/Figure4.jsx';
import Figure5 from './jsx/Figure5.jsx';
import Figure6 from './jsx/Figure6.jsx';
import Figure7 from './jsx/Figure7.jsx';
import Figure8 from './jsx/Figure8.jsx';
import Figure9 from './jsx/Figure9.jsx';
import Figure10 from './jsx/Figure10.jsx';
import Figure11 from './jsx/Figure11.jsx';
import Footer from './jsx/Footer.jsx';

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

const containerFigure8 = document.getElementById('app-root-2023-ter_report_figure8');
if (containerFigure8) {
  const root = createRoot(containerFigure8);
  root.render(<Figure8 lang={lang} />);
}

const containerFigure9 = document.getElementById('app-root-2023-ter_report_figure9');
if (containerFigure9) {
  const root = createRoot(containerFigure9);
  root.render(<Figure9 lang={lang} />);
}

const containerFigure10 = document.getElementById('app-root-2023-ter_report_figure10');
if (containerFigure10) {
  const root = createRoot(containerFigure10);
  root.render(<Figure10 lang={lang} />);
}

const containerFigure11 = document.getElementById('app-root-2023-ter_report_figure11');
if (containerFigure11) {
  const root = createRoot(containerFigure11);
  root.render(<Figure11 lang={lang} />);
}

const containerFooter = document.getElementById('app-root-2023-ter_report_footer');
if (containerFooter) {
  const root = createRoot(containerFooter);
  root.render(<Footer lang={lang} />);
}
