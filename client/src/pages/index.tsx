import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/Navbar";
import Templates from "../components/Templates";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Portfolio Builder</title>
        <meta name="description" content="helps build portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Templates />
    </div>
  );
};

export default Home;
