import FlappyBird from '@/components/FlappyBird';

import Head from 'next/head';
import Link from 'next/link';
export default function Home() {
    return (
        <>
            <Head>
                <title>Flappy Rocket</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <h1>Flappy Rocket</h1>
            <FlappyBird />
            <h3>Tap Tap or Click Click</h3>
            <div className="project-github">
      <p>This project is in </p>
      <Link href="https://github.com/diegoperea20/Flappy-Rocket">
        <img width="96" height="96" src="https://img.icons8.com/fluency/96/github.png" alt="github"/>
      </Link>
    </div>
        </>
    );
}
