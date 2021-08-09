/** ParagraphOutput
  *
  * @version 1.0.0
  * @created - 2021.08.01
  * @author - kasuta <kasuta96@gmail.com>
  */

//#region imports
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
//#endregion

const ParagraphOutput = ({ data, style, classNames, config }) => {
  if (!data) return '';
  if (!style || typeof style !== 'object') style = {};
  if (!config || typeof config !== 'object') config = {};
  if (!classNames || typeof classNames !== 'string') classNames = 'my-8 text-gray-800';

  let content = null;

  if (typeof data === 'string') content = data;
  else if (typeof data === 'object' && data.text && typeof data.text === 'string') content = data.text;

  return content ? <p style={ style } className={ classNames }>{ ReactHtmlParser(content) }</p> : '';
};

export default ParagraphOutput;
