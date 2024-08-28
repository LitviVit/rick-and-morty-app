import Image from 'next/image';

export default function Loader() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Image
          src='/loader.gif'
          alt='Loading...'
          layout='responsive'
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}
