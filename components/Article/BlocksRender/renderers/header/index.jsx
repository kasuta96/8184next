/** HeaderOutput
  *
  * @version 1.0.0
  * @created - 2021.08.01
  * @author - kasuta <kasuta96@gmail.com>
  */

//#region imports
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
//#endregion

const HeaderOutput = ({ data, style, classNames, config }) => {
  if (!data) return '';
  if (!style || typeof style !== 'object') style = {};
  if (!config || typeof config !== 'object') config = {};
  if (!classNames || typeof classNames !== 'string') classNames = 'font-bold mb-4 mt-8';

  let content = null;

  if (typeof data === 'string') content = data;
  else if (typeof data === 'object' && data.text && typeof data.text === 'string') content = data.text;

  if (!content) return '';
  if (typeof data === 'object' && data.level && typeof data.level === 'number') {
    switch (data.level) {
      case 1: return <h1 style={ style } className={ classNames }>{ ReactHtmlParser(content) }</h1>;
      case 2: return <h2 style={ style } className={ classNames }>{ ReactHtmlParser(content) }</h2>;
      case 3: return <h3 style={ style } className={ classNames }>{ ReactHtmlParser(content) }</h3>;
      case 4: return <h4 style={ style } className={ classNames }>{ ReactHtmlParser(content) }</h4>;
      case 5: return <h5 style={ style } className={ classNames }>{ ReactHtmlParser(content) }</h5>;
      case 6: return <h6 style={ style } className={ classNames }>{ ReactHtmlParser(content) }</h6>;
      default: return <h4 style={ style } className={ classNames }>{ ReactHtmlParser(content) }</h4>;
    }
  }

  return <h4 style={ style } className={ classNames }>{ ReactHtmlParser(content) }</h4>;
};

export default HeaderOutput;
