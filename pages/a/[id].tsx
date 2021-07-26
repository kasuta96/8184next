import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { ArticleProps } from "../../components/Article/Article";
import prisma from '../../lib/db'
import { useSession } from "next-auth/client";


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const article = await prisma.article.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    select: {
      title: true,
      slug: true,
      description: true,
      thumbnail: true,
      tags: true,
      author: {
        select: {
          name: true,
          id: true
        },
      },
      content:true,
      published:true
    },

  });
  return {
    props: article,
  };
};

async function publishArticle(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/a")
}

async function deleteArticle(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/article/${id}`, {
    method: "DELETE",
  });
  await Router.push("/a")
}

const Article: React.FC<ArticleProps> = (props) => {
  const [session, loading] = useSession();
  if (loading) {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const articleBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
        {!props.published && userHasValidSession && articleBelongsToUser && (
          <button onClick={() => publishArticle(props.id)}>Publish</button>
        )}
        {userHasValidSession && articleBelongsToUser && (
          <button onClick={() => deleteArticle(props.id)}>Delete</button>
        )}
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Article;
