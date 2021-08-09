/** ChecklistOutput
  *
  * @version 1.0.0
  * @created - 2021.08.01
  * @author - kasuta <kasuta96@gmail.com>
  */

//#region imports
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { BadgeCheckIcon as CheckIcon } from '@heroicons/react/outline'
import { BadgeCheckIcon as CheckedIcon } from '@heroicons/react/solid'
//#endregion


const ChecklistOutput = ({ data, style, classNames, config }) => {
  if (!data || !data.items || !Array.isArray(data.items) || data.items.length < 1) return '';
  if (!style || typeof style !== 'object') style = {
    item: '',
    checkbox: '',
    label: '',
    container: ''
  };
  if (!config || typeof config !== 'object') config = {};
  if (!classNames || typeof classNames !== 'object' || Object.keys(classNames).length < 1) classNames = {
    item: 'flex items-center space-x-3 mb-3',
    label: 'text-gray-700 dark:text-white font-normal',
    container: 'mx-4 my-8'
  };

  let content = [];

  if (typeof data === 'object') {
    if (data.items && Array.isArray(data.items)) content = data.items.map((item, index) =>
      <div key={index} style={style.item} className={classNames.item}>
        {item.checked
          ?
          <CheckedIcon className="text-blue-600 h-6 w-6" />
          :
          <CheckIcon className="text-gray-400 h-6 w-6" />
        }
        <label style={style.label} className={classNames.label}>{ReactHtmlParser(item.text)}</label>
      </div>
    );
  }

  if (content.length <= 0) return '';

  return <div style={style.container} className={classNames.container}>{content}</div>;
};

export default ChecklistOutput;
