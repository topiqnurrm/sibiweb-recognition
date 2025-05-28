import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Testing</h1>
      <br/>
      <Link href="/posts">POSTING PAGE</Link>
      <br/>
      <Link href="/albums">ALBUM PAGE</Link>
    </>
  );
}
