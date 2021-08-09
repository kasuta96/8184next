/** EditorJS-React Renderer
  *
  * A small library that provides functions to parse and render data saved by
  * EditorJS into react components
  *
  * @version 1.0.0
  * @created - 2021.08.01
  * @author - kasuta <kasuta96@gmail.com>
  *
  */

//#region imports
import React from 'react';
import HeaderOutput from './renderers/header/index.jsx';
import ParagraphOutput from './renderers/paragraph/index.jsx';
import ImageOutput from './renderers/image/index.jsx';
import EmbedOutput from './renderers/embed/index.jsx';
import ListOutput from './renderers/list/index.jsx';
import QuoteOutput from './renderers/quote/index.jsx';
import ChecklistOutput from './renderers/checklist/index.jsx';
import TableOutput from './renderers/table/index.jsx';
import DelimiterOutput from './renderers/delimiter/index.jsx';
import CodeOutput from './renderers/code/index.jsx';
//#endregion

const Output = ({ data, style, classNames, config, renderers }) => {
  if (!data || typeof data !== 'object') return '';
  if (!style || typeof style !== 'object') style = {};
  if (!classNames || typeof classNames !== 'object') classNames = {};
  if (!config || typeof config !== 'object') config = {};
  if (!renderers || typeof renderers !== 'object') renderers = {};

  return data.blocks.map((block, i) => {
    let Renderer = null;

    switch (block.type.toLowerCase()) {
      case 'code':
        Renderer = renderers.code || CodeOutput;
        return <Renderer key={i} data={block.data} style={style.code || {}} config={config.code || {}} classNames={classNames.code || {}} />;
      case 'header':
        Renderer = renderers.header || HeaderOutput;
        return <Renderer key={i} data={block.data} style={style.header || {}} config={config.header || {}} classNames={classNames.header || {}} />;
      case 'paragraph':
        Renderer = renderers.paragraph || ParagraphOutput;
        return <Renderer key={i} data={block.data} style={style.paragraph || {}} config={config.paragraph || {}}
          classNames={classNames.paragraph || {}} />;
      case 'image':
        Renderer = renderers.image || ImageOutput;
        return <Renderer key={i} data={block.data} />;
      case 'embed':
        Renderer = renderers.embed || EmbedOutput;
        return <Renderer key={i} data={block.data} />;
      case 'table':
        Renderer = renderers.table || TableOutput;
        return <Renderer key={i} data={block.data} style={style.table || {}} config={config.table || {}} classNames={classNames.table || {}} />;
      case 'list':
        Renderer = renderers.list || ListOutput;
        return <Renderer key={i} data={block.data} style={style.list || {}} config={config.list || {}} classNames={classNames.list || {}} />;
      case 'checklist':
        Renderer = renderers.checklist || ChecklistOutput;
        return <Renderer key={i} data={block.data} style={style.checklist || {}} config={config.checklist || {}}
          classNames={classNames.checklist || {}} />;
      case 'quote':
        Renderer = renderers.quote || QuoteOutput;
        return <Renderer key={i} data={block.data} style={style.quote || {}} config={config.quote || {}} classNames={classNames.quote || {}} />;
      case 'delimiter':
        Renderer = renderers.delimiter || DelimiterOutput;
        return <Renderer key={i} style={style.delimiter || {}} config={config.delimiter || {}} classNames={classNames.delimiter || {}} />;

      default: return '';
    }
  });
};

export {
  HeaderOutput, ParagraphOutput, ImageOutput, EmbedOutput, TableOutput, CodeOutput, ListOutput, QuoteOutput, DelimiterOutput, Output as default
};
