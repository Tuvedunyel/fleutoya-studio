import { Cookie, Info, Mail, Scale } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full text-[#1b1b18] dark:text-[#EDEDEC]">
            <div className="container m-auto flex flex-col gap-8">
                <div className="flex w-full justify-center gap-8">
                    <ul>
                        <li className="flex items-center gap-2 text-center">
                            <Cookie size={22} strokeWidth={2} />
                            Privacy Police
                        </li>
                        <li className="flex items-center gap-2 text-center">
                            <Scale size={22} strokeWidth={2} />
                            Legals & Terms
                        </li>
                    </ul>
                    <ul>
                        <li className="flex items-center gap-2 text-center">
                            <Mail size={22} strokeWidth={2} />
                            Contact
                        </li>
                        <li className="flex items-center gap-2 text-center">
                            <Info size={22} strokeWidth={2} />
                            Support
                        </li>
                    </ul>
                </div>
                <div className="flex justify-center">
                    <p>© 2025 Studio Fleutoya. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
