/** ListOutput
  *
  * @version 1.0.0
  * @created - 2021.08.01
  * @author - kasuta <kasuta96@gmail.com>
  */

//#region imports
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
//#endregion

const validListStyles = ['ordered', 'unordered'];

const ListOutput = ({ data, style, classNames, config }) => {
  if (!data) return '';
  if (!style || typeof style !== 'object') style = {};
  if (!config || typeof config !== 'object') config = {};
  if (!classNames || typeof classNames !== 'object' || Object.keys(classNames).length < 1) classNames = {
    container: 'text-gray-600 my-8 mx-4',
    item: ''
  };

  let content = [], listType = 'ordered';

  if (typeof data === 'string') content.push(data);
  else if (typeof data === 'object') {
    if (data.style && validListStyles.includes(data.style)) listType = data.style;
  
    if (data.items && Array.isArray(data.items))
      content = data.items.map((item, index) =>

        <li key={index} className="flex relative pb-3">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 mr-3 rounded-full inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">
            {listType == 'ordered' ? index+1 : ''}
          </div>
          <div className="flex-grow flex sm:items-center items-start flex-col sm:flex-row">
            <p style={style.item} className={classNames.item}>{ReactHtmlParser(item)}</p>
          </div>
        </li>

      );
  }

  if (content.length <= 0) return '';

  return <ul style={style.container} className={classNames.container}>{content}</ul>;
};

export default ListOutput;
