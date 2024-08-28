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
          src='https://user-images.githubusercontent.com/44013819/109408845-28a0fc80-796c-11eb-9da0-44406ff89ccd.gif'
          alt='Loading...'
          layout='responsive'
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}
