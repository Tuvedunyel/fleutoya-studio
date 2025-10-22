import AppLogo from '@/components/app-logo';
import { dashboard, home, login } from '@/routes';
import type { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const { auth } = usePage<SharedData>().props;

    return (
        <header className="mb-10 w-full py-4 text-sm not-has-[nav]:hidden">
            <div className="container m-auto flex items-center justify-between">
                <a
                    href={home().url}
                    className="peer/menu-button flex h-12 items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm text-foreground ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-0! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0"
                >
                    <AppLogo />
                </a>
                <nav className="flex items-center justify-end gap-4">
                    {auth.user ? (
                        <Link
                            href={dashboard()}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-foreground hover:border-muted-foreground dark:border-foreground"
                        >
                            Tableau de bord
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="inline-block rounded-sm border border-transparent bg-background px-5 py-1.5 text-sm leading-normal text-foreground hover:border-muted-foreground"
                            >
                                Log in
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
