import Head from "next/head";

export default function Home() {

  return (
    <>
      <Head>
        <title>modpack.dev</title>
        <meta
          name="description"
          content="Tools and stuff to help you create modpacks"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-1 flex-col items-center">
        <span className="font-extrabold tracking-tight text-white md:text-5xl">
          modpack.dev
        </span>
        <br />
        <span className="font-extrabold tracking-tight text-white md:text-lg">
          Tools and stuff helping you create modpacks
        </span>
      </div>
    </>
  );
}