import React from 'react';

import { createRoot } from 'react-dom/client';

import Figure1 from './jsx/Figure1.jsx';
import Figure2 from './jsx/Figure2.jsx';

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
