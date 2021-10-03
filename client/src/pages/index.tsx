import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/Navbar";
import Templates from "../components/Templates";
import TemplateFooter from "../components/Templates/TemplateFooter";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Portfolio Builder</title>
        <meta name="description" content="helps build portfolio" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <NavBar />
      <Templates />
      <TemplateFooter />
    </div>
  );
};

export default Home;
