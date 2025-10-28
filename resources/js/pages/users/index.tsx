import { CollectionPagination } from '@/components/collection-pagination';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { withAppLayout } from '@/layouts/app-layout';
import users from '@/routes/users';
import { BreadcrumbItem, PaginatedCollection, User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Plus, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

type Props = { collection: PaginatedCollection<User> };

export default withAppLayout(breadcrumbs, ({ collection }: Props) => {
    return (
        <>
            <Head title="Administration - Secret" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableCell colSpan={5}>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="#">
                                <Plus />
                                Créer un nouvel utilisateur (à venir)
                            </Link>
                        </Button>
                    </TableCell>
                    {collection.data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>
                                <Button
                                    variant={
                                        !item.email_verified_at
                                            ? 'destructive'
                                            : 'outline'
                                    }
                                >
                                    {!item.email_verified_at
                                        ? 'Not vérified'
                                        : 'Verified'}
                                </Button>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-end gap-2">
                                    <Button
                                        asChild
                                        size="icon"
                                        variant="outline"
                                    >
                                        <Link href="#">
                                            <Edit size={16} />
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="icon"
                                        variant="destructive-outline"
                                    >
                                        <Link
                                            href={users.destroy({
                                                user: item.id,
                                            })}
                                            onBefore={() =>
                                                confirm(
                                                    'Voulez-vous vraiment supprimer ce compte ?',
                                                )
                                            }
                                        >
                                            <Trash size={16} />
                                        </Link>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <CollectionPagination collection={collection} />
        </>
    );
});
