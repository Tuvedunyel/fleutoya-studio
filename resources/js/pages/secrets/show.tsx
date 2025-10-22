import Footer from '@/components/footer';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import HomeLayout from '@/layouts/home-layout';
import secrets from '@/routes/secrets';
import type { Secret } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

type Props = { collection: { data: Secret }; decryptedSecret: string };
export default function Show({ collection, decryptedSecret }: Props) {
    const deleteRef = useRef(null);
    useEffect(() => {
        if (collection.data.status !== 'deleted' && decryptedSecret !== null) {
            // @ts-expect-error
            deleteRef!.current!.click();
        }
    });

    return (
        <>
            <Head title={`Studio Fleutoya - ${collection.data.title} `}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
                <meta
                    name="description"
                    content="Studio Fleutoya, site personnel"
                />
            </Head>
            <Link
                ref={deleteRef}
                href={secrets.edit({ secret: collection.data.id })}
            >
                Suppression des données
            </Link>
            <HomeLayout>
                <Header />
                <main>
                    <main>
                        <div className="container m-auto flex h-full min-h-[75vh] flex-col items-center justify-center gap-4">
                            <h1 className="mb-4 text-2xl font-bold text-foreground">
                                Bonjour {collection.data.name}
                            </h1>
                            <p className="mb-2 text-lg text-foreground">
                                {collection.data.message}
                            </p>
                            <Button
                                variant={
                                    collection.data.status === 'deleted'
                                        ? 'destructive'
                                        : 'outline'
                                }
                            >
                                {collection.data.status}
                            </Button>
                            <p className="mb-2 text-xl text-foreground">
                                Voici le message :{' '}
                            </p>
                            <strong className="mb-2 text-xl text-foreground">
                                {decryptedSecret}
                            </strong>
                        </div>
                    </main>
                </main>
                <Footer />
            </HomeLayout>
        </>
    );
}
