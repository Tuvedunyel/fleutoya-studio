import Footer from '@/components/footer';
import Header from '@/components/header';
import HomeLayout from '@/layouts/home-layout';
import { Head } from '@inertiajs/react';
import { TrafficCone } from 'lucide-react';

export default function Welcome() {
    return (
        <>
            <Head title="Studio Fleutoya  - Accueil">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
                <meta
                    name="description"
                    content="Studio Fleutoya, Il s'agit de mon site personnel. Je suis un développeur web fullstack spécialisé en Laravel et React."
                />
            </Head>
            <HomeLayout>
                <Header />
                <main>
                    <div className="container m-auto flex h-full min-h-[75vh] items-center justify-center gap-4">
                        <TrafficCone className="stroke-foreground" />
                        <h1 className="text-2xl font-semibold text-foreground">
                            Under construction
                        </h1>
                    </div>
                </main>
                <Footer />
            </HomeLayout>
        </>
    );
}
