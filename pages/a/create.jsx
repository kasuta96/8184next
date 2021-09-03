import React, { useState, useEffect } from "react";
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
import { Accordion } from "../../components/Tailwind/Accordion";

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
  const [thumbnail, setThumbnail] = useState(props?.body?.thumbnail || "");
  const [description, setDescription] = useState(
    props?.body?.description || ""
  );
  const [tags, setTags] = useState(props?.body?.tags || "");
  const [submitBtn, setSubmitBtn] = useState({
    disabled: false,
    content: "Create",
  });
  const [fetchType, setFetchType] = useState({
    method: "POST",
    url: `${process.env.HOST}/api/article`,
  });

  if (props?.status) {
    useSetData(editor, props.body.content);
    useEffect(() => {
      if (props.body.author.id === session?.id) {
        console.log("edit");
        setFetchType({
          method: "PUT",
          url: `${process.env.HOST}/api/article`,
        });
        setSubmitBtn({
          disabled: false,
          content: "Update",
        });
      }
    }, [session]);
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
    let prevSubmitBtn = submitBtn;
    setSubmitBtn({
      disabled: true,
      content: "Loading...",
    });
    try {
      const content = await editor.save();
      const id = props.body?.id || "";
      const body = { title, content, description, thumbnail, tags, id };
      const res = await fetch(fetchType.url, {
        method: fetchType.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      if (result.route) {
        Router.push(result.route);
      }
    } catch (error) {
      console.log(error);
      setSubmitBtn(prevSubmitBtn);
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
            <div className="mt-6">
              <Accordion
                title={<p className="text-lg">More option</p>}
                content={
                  <>
                    <div className="w-full mb-3">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <textarea
                        className="block w-full py-2 px-4 bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 placeholder-gray-400 rounded-xl text-base focus:outline-none"
                        placeholder="Enter your description"
                        name="description"
                        rows="5"
                        cols="40"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="w-full mb-3">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                        htmlFor="thumbnail"
                      >
                        Thumbnail
                      </label>
                      <input
                        className="block w-full py-2 px-4 bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 placeholder-gray-400 rounded-xl text-base focus:outline-none"
                        placeholder="Enter image URL"
                        name="thumbnail"
                        onChange={(e) => setThumbnail(e.target.value)}
                        value={thumbnail}
                      />
                    </div>
                    <div className="w-full mb-3">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                        htmlFor="tags"
                      >
                        Tags
                        <span className="text-muted">
                          (separate by comma ',')
                        </span>
                      </label>
                      <input
                        className="block w-full py-2 px-4 bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 placeholder-gray-400 rounded-xl text-base focus:outline-none"
                        placeholder="Enter keywords"
                        name="tags"
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                      />
                    </div>
                  </>
                }
              />
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              <button
                disabled={!editor || !title || submitBtn.disabled}
                type="submit"
                className="btn-primary disabled:bg-gray-300 cursor-pointer"
              >
                {submitBtn.content}
              </button>
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
