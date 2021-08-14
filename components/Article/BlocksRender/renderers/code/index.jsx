/** CodeOutput
  *
  * @version 1.0.0
  * @created - 2021.08.01
  * @author - kasuta <kasuta96@gmail.com>
  * 
  */

//#region imports
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
//#endregion

const CodeOutput = ({ data, style, classNames, config }) => {
  if (!data) return '';
  if (!style || typeof style !== 'object') style = {
    container: '',
    code: ''
  };
  if (!config || typeof config !== 'object') config = {};
  if (!classNames || typeof classNames !== 'string') classNames = {
    container: 'bg-gray-300 p-5 my-8 rounded text-sm border-l-4 border-gray-700 overflow-x-auto',
    code: ''
  };

  let content = null;

  if (typeof data === 'string') content = data;
  else if (typeof data === 'object' && data.code && typeof data.code === 'string') content = data.code.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

  if (!content) return '';
  return (
    <div style={style.container} className={classNames.container}>
      <pre>
        <code style={style.code} className={classNames.code}>{ReactHtmlParser(content)}</code>
      </pre>
    </div>
  );

};

export default CodeOutput;
