import React, { useEffect, useState } from "react"
import EditorJS from "@editorjs/editorjs"
import { tools } from "./tools"
import useTrans from "../../hooks/useTrans"

/**
 *
 * @param {EditorJS.Tool[]} toolsList
 * @param {*} param1
 * @param {EditorJS.EditorConfig} options
 */
export const useEditor = (toolsList, { data, editorRef }) => {
  const { t } = useTrans("editor")

  const [editorInstance, setEditor] = useState(null)

  // initialize
  useEffect(() => {
    // create instance
    const editor = new EditorJS({
      /**
       * Id of Element that should contain the Editor
       */
      holder: "editor-js",
      placeholder: t`Enter for new paragraph`,
      minHeight: 100,
      /**
       * Available Tools list.
       * Pass Tool's class or Settings object for each Tool you want to use
       */
      tools: toolsList,

      i18n: {
        messages: {
          /**
           * Other below: translation of different UI components of the editor.js core
           */
          ui: {
            blockTunes: {
              toggler: {
                "Click to tune": t`Click to tune`,
                "or drag to move": t`or drag to move`,
              },
            },
            inlineToolbar: {
              converter: {
                "Convert to": t`Convert to`,
              },
            },
            toolbar: {
              toolbox: {
                Add: t`Add`,
              },
            },
          },

          /**
           * Section for translation Tool Names: both block and inline tools
           */
          toolNames: {
            Text: t`Text`,
            Heading: t`Heading`,
            List: t`List`,
            Warning: t`Warning`,
            Checklist: t`Checklist`,
            Quote: t`Quote`,
            Code: t`Code`,
            Delimiter: t`Delimiter`,
            "Raw HTML": t`Raw HTML`,
            Table: t`Table`,
            Link: t`Link`,
            Marker: t`Marker`,
            Bold: t`Bold`,
            Italic: t`Italic`,
            InlineCode: t`InlineCode`,
            Image: t`Image`,
            Underline: t`Underline`,
            "Image URL": t`Image URL`,
            Translate: t`Translate`,
          },

          /**
           * Section for passing translations to the external tools classes
           */
          tools: {
            /**
             * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
             * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
             */
            warning: {
              // <-- 'Warning' tool will accept this dictionary section
              Title: t`Title`,
              Message: t`Message`,
            },

            /**
             * Link is the internal Inline Tool
             */
            link: {
              "Add a link": t`Add a link`,
            },
            /**
             * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
             */
            stub: {
              "The block can not be displayed correctly.": t`The block cannot be displayed correctly`,
            },
            image: {
              Caption: t`Caption`,
              "Select an Image": t`Select an Image`,
              "With border": t`With border`,
              "Stretch image": t`Stretch image`,
              "With background": t`With background`,
            },
            simpleImage: {
              "Paste an image URL": t`Paste an image URL`,
            },
            code: {
              "Enter a code": t`Enter a code`,
            },
            linkTool: {
              Link: t`Link`,
              "Couldn't fetch the link data": t`Couldn't fetch the link data`,
              "Couldn't get this link data, try the other one": t`Couldn't get this link data, try the other one`,
              "Wrong response format from the server": t`Wrong response format from the server`,
            },
            header: {
              Header: t`Header`,
            },
            paragraph: {
              "Enter something": t`Enter something`,
            },
            list: {
              Ordered: t`Ordered`,
              Unordered: t`Unordered`,
            },
            trans: {
              "Image URL": t`Image URL`,
              Translate: t`Translate`,
              "Paste an image URL": t`Paste an image URL`,
              "Enter original": t`Enter original`,
              "Enter translation": t`Enter translation`,
            },
          },

          /**
           * Section allows to translate Block Tunes
           */
          blockTunes: {
            /**
             * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
             * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
             *
             * Also, there are few internal block tunes: _delete",_"moveUp"_and_"moveDown
             */
            delete: {
              Delete: t`Delete`,
            },
            moveUp: {
              "Move up": t`Move up`,
            },
            moveDown: {
              "Move down": t`Move down`,
            },
          },
        },
      },

      /**
       * Previously saved data that should be rendered
       */
      data: data || {},

      defaultBlock: "paragraph",
    })

    setEditor(editor)

    // cleanup
    return () => {
      editor.isReady
        .then(() => {
          editor.destroy()
          setEditor(null)
        })
        .catch((e) => console.error("ERROR editor cleanup", e))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toolsList])

  // set reference
  useEffect(() => {
    if (!editorInstance) {
      return
    }
    // Send instance to the parent
    if (editorRef) {
      editorRef(editorInstance)
    }
  }, [editorInstance, editorRef])

  return { editor: editorInstance }
}

export const EditorContainer = ({ editorRef, children, data, options }) => {
  useEditor(tools, { data, editorRef }, options)

  return (
    <React.Fragment>
      {!children && (
        <div
          className="py-2 px-4 text-700 bg-50 dark:border-gray-600 rounded-xl shadow-lg focus:outline-none"
          id="editor-js"
        ></div>
      )}
      {children}
    </React.Fragment>
  )
}
