import React, { useState } from "react";
import Layout from "../../components/Layout";
import Router from "next/router";
import dynamic from "next/dynamic";
import {
  options,
  useClearDataCallback,
  useSetData,
} from "../../components/Editor";
import { useSession } from "next-auth/client";
import AccessDenied from "../../components/Error/AccessDenied";

// get data if has id query
export const getServerSideProps = async ({ query }) => {
  if (query.id) {
    const res = await fetch(process.env.HOST + "/api/article/" + query.id);
    const article = await res.json();

    if (article?.status) {
      return {
        props: article,
      };
    } else {
      return {
        notFound: true,
      };
    }
  } else {
    return {
      props: {
        status: false,
      },
    };
  }
};

// CSR
const Editor = dynamic(
  () =>
    import("../../components/Editor/editor").then((mod) => mod.EditorContainer),
  { ssr: false }
);

const Create = (props) => {
  const [session] = useSession();
  const [title, setTitle] = useState(props?.body?.title || "");
  const [editor, setEditor] = useState(null);

  if (props?.status) {
    useSetData(editor, props.body.content);
  }

  // save handler
  // const onSave = useSaveCallback(title, editor);

  // load data
  // const {data, loading} = useLoadData()

  // set saved data
  // useSetData(editor, data);

  // clear data callback
  const clearData = useClearDataCallback(editor);

  // const disabled = editor === null || loading;

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const content = await editor.save();
      // const content = JSON.stringify(editorData)
      const body = { title, content };
      await fetch(process.env.HOST + `/api/article`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/a");
      console.log(body);
    } catch (error) {
      console.error(error);
    }
  };

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }
  return (
    <Layout>
      <section className="flex-grow min-h-screen p-5 mx-auto">
        <div className="lg:max-w-3xl mx-auto">
          <form onSubmit={submitData}>
            <div className="items-center md:flex md:space-x-4">
              <div className="w-full">
                <input
                  className="block w-full px-4 py-2 text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 rounded-xl focus:outline-none"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  type="text"
                  value={title}
                />
              </div>

              {/* <div className="w-full mt-4 md:mt-0">
              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white rounded-xl dark:bg-gray-800 dark:text-gray-300 focus:outline-none"
                type="email"
                placeholder="Something"
              />
            </div> */}
            </div>

            <div className="w-full mt-4">
              <div className="editorContainer">
                <Editor reInit editorRef={setEditor} options={options} />
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              <input
                disabled={!editor || !title}
                type="submit"
                value="Create"
                className="btn-primary disabled:bg-gray-300 cursor-pointer"
              />
              <a
                className="btn-black"
                href="#"
                onClick={() => Router.push("/a")}
              >
                Cancel
              </a>
              <a className="btn-black" href="#" onClick={clearData}>
                Clear
              </a>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Create;
