/** ImageOutput
  *
  * @version 1.0.0
  * @created - 2021.08.01
  * @author - kasuta <kasuta96@gmail.com>
  */

//#region imports
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
//#endregion

const ImageOutput = ({ data }) => {

  if (!data || (!data.url && !data.file?.url)) return 'nothing';

  let classNames = 'my-8 simple-image text-center';
  let url = data.url || data.file?.url;

  if (data.withBorder) classNames += ' withBorder';
  if (data.withBackground) classNames += ' withBackground';
  if (data.stretched) classNames += ' stretched';

  return (
    <figure className={classNames}>
      <img src={url} alt={data.caption || ''} />
      {data.caption && <figcaption className="text-gray-500 text-sm mt-4">{ReactHtmlParser(data.caption)}</figcaption>}
    </figure>
  );
};

export default ImageOutput;
