import Threads from '../theme/threads';
import '../styles/Home.css';
import A4Layout from './A4Layout';

const Home = () => {
  return (
    <>
      <div style={{ width: '100%', height: '100%', position: 'fixed'}} >
        <Threads
          amplitude={1}
          distance={0.6}
          enableMouseInteraction={false}
        />
      </div>
      <div className="bg-black w-screen h-screen flex items-center justify-between px-8">
        <div className="flex flex-col justify-center text-white">
          <div className="heading text-3xl font-semiboldheading m-50">
            Welcome to <br /> My Portfolio
          </div>
        </div>

        <div className="flex items-center justify-center">
          <A4Layout />
        </div>
      </div>
    </>
  );
};

export default Home;
