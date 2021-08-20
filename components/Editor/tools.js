import CheckList from '@editorjs/checklist'
import Code from '@editorjs/code'
import Delimiter from '@editorjs/delimiter'
import Embed from '@editorjs/embed'
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'
import Table from 'editorjs-table'
import SimpleImage from './custom/simpleImage'
import Trans from './custom/trans'

import { storage } from '../../firebase'

export const tools = {
  header: {
    class: Header,
    inlineToolbar: ['link'],
    config: {
      levels: [2, 3, 4, 5, 6],
      defaultLevel: 4
    }
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true
  },
  embed: Embed,
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
    },
  },
  // warning: Warning,
  code: Code,
  // linkTool: LinkTool,
  raw: Raw,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  image: {
    class: Image,
    config: {
      /**
       * Custom uploader
       */
      uploader: {
        /**
         * Upload file to the server and return an uploaded image data
         * @param {File} file - file selected from the device or pasted by drag-n-drop
         * @return {Promise.<{success, file: {url}}>}
         */
        async uploadByFile(file) {
          // your own uploading logic here
          const filename = file.name
          const uploadTask = await storage.ref(`images/article/${filename}`).put(file)
          const imageUrl = await uploadTask.ref.getDownloadURL()
          return {
            success: 1,
            file: {
              url: imageUrl
            }
          }

        },

        /**
         * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
         * @param {string} url - pasted image URL
         * @return {Promise.<{success, file: {url}}>}
         */
        async uploadByUrl(url) {
          return {
            success: 1,
            file: {
              url: url,
            }
          }
        }
      }
    }
  },
  trans: {
    class: Trans,
    inlineToolbar: true,
    config: {
      originalPlaceholder: 'Enter a original',
      translationPlaceholder: 'Enter a translation',
    },
  },

}
