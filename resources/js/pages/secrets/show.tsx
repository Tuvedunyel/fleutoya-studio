import Footer from '@/components/footer';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import HomeLayout from '@/layouts/home-layout';
import secrets from '@/routes/secrets';
import type { Secret } from '@/types';
import { Form, Head, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

type Props = { collection: { data: Secret }; decryptedSecret: string };
export default function Show({ collection, decryptedSecret }: Props) {
    const url = usePage().url;
    const key = new URLSearchParams(url.split('?')[1]).get('key') ?? '';
    const deleteRef = useRef(null);
    const action = secrets.update.form(collection.data.id);
    useEffect(() => {
        if (collection.data.status !== 'deleted' && decryptedSecret !== null) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
            <Form className="hidden" {...action}>
                {({ processing }) => (
                    <>
                        <input type="hidden" name="key" value={key} />
                        <Button disabled={processing} ref={deleteRef}>
                            Suppression des données
                        </Button>
                    </>
                )}
            </Form>
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
