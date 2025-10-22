import TopActions from '@/components/top-actions';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { withAppLayout } from '@/layouts/app-layout';
import secrets from '@/routes/secrets';
import { BreadcrumbItem, Secret } from '@/types';
import { Form } from '@inertiajs/react';
import { Save } from 'lucide-react';

type Props = {
    secret: Secret;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Secrets',
        href: secrets.index().url,
    },
    {
        title: 'Créer un secret',
        href: '',
    },
];

export default withAppLayout<Props>(breadcrumbs, ({ secret }) => {
    const action = secrets.store.form();

    return (
        <Form {...action} className="space-y-4">
            {({ errors, processing }) => (
                <>
                    <FormField
                        label="Nom"
                        htmlFor="name"
                        error={errors['name']}
                    >
                        <Input
                            id="name"
                            name="name"
                            defaultValue={secret.name}
                            aria-invalid={!!errors['name']}
                            placeholder="Jon Doe"
                        />
                    </FormField>
                    <FormField
                        label="Titre"
                        htmlFor="title"
                        error={errors['title']}
                    >
                        <Input
                            id="title"
                            name="title"
                            defaultValue={secret.title}
                            aria-invalid={!!errors['title']}
                            placeholder="Mon super secret"
                        />
                    </FormField>
                    <FormField
                        label="Destinataire"
                        htmlFor="recipient"
                        error={errors['recipient']}
                    >
                        <Input
                            type="email"
                            id="recipient"
                            name="recipient"
                            defaultValue={secret.recipient}
                            aria-invalid={!!errors['recipient']}
                            placeholder="jondoe@email.com"
                        />
                    </FormField>
                    <FormField
                        label="Message"
                        htmlFor="message"
                        error={errors['message']}
                    >
                        <Textarea
                            id="message"
                            name="message"
                            defaultValue={secret.message}
                            aria-invalid={!!errors['message']}
                            placeholder="Tapez votre message ici"
                        />
                    </FormField>
                    <FormField
                        label="Secret"
                        htmlFor="secret"
                        error={errors['secret']}
                    >
                        <Textarea
                            id="secret"
                            name="secret"
                            defaultValue={secret.secret}
                            aria-invalid={!!errors['secret']}
                            placeholder="Tapez votre secret ici"
                        />
                    </FormField>
                    <TopActions>
                        <Button disabled={processing}>
                            <Save /> Enregistrer
                        </Button>
                    </TopActions>
                </>
            )}
        </Form>
    );
});
