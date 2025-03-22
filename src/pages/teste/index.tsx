import { GetServerSidePropsContext } from "next";

export default function Home({ cookie }: any) {
  return <h1>{cookie}</h1>;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      cookie: ctx.req.headers.cookie,
    },
  };
}
