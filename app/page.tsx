import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>sibiweb-recognition</h1>
      <br />
      <Link
        href="/albums"
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#0070f3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        📷 Mulai Deteksi Isyarat
      </Link>
    </>
  );
}
