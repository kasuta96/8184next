import CheckList from '@editorjs/checklist'
import Code from '@editorjs/code'
import Delimiter from '@editorjs/delimiter'
import Embed from '@editorjs/embed'
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
// import Table from '@editorjs/table'
// import Warning from '@editorjs/warning'
// import LinkTool from '@editorjs/link'
// import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'
// import SimpleImage from '@editorjs/simple-image'
import SimpleImage from './custom/simpleImage'
import Table from 'editorjs-table'
// import Trans from './custom/trans'

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
  image: SimpleImage,
  // trans: {
  //   class: Trans,
  //   inlineToolbar: true,
  //   config: {
  //     originalPlaceholder: 'Enter a original',
  //     translationPlaceholder: 'Enter a translation',
  //   },
  // },

}
