import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from "../index";

function Footer() {
    return (
        <footer className="backdrop-blur-md bg-white/10 border-t border-white/20 py-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-white">
                <div>
                    <div className="mb-5">
                        <Logo width="120px" />
                    </div>
                    <p className="text-sm text-gray-300">
                        &copy; {new Date().getFullYear()} Postify. All Rights Reserved.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Company</h3>
                    <ul className="space-y-2">
                        <li><Link className="hover:text-indigo-300 hover:underline hover:underline-offset-4 transition" to="/">Pricing</Link></li>
                        <li><Link className="hover:text-indigo-300 hover:underline hover:underline-offset-4 transition" to="/">Features</Link></li>
                        <li><Link className="hover:text-indigo-300 hover:underline hover:underline-offset-4 transition" to="/">Affiliate Program</Link></li>
                        <li><Link className="hover:text-indigo-300 hover:underline hover:underline-offset-4 transition" to="/">Press Kit</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-2">
                        <li><Link className="hover:text-indigo-300 hover:underline hover:underline-offset-4 transition" to="/">Account</Link></li>
                        <li><Link className="hover:text-indigo-300 hover:underline hover:underline-offset-4 transition" to="/">Help</Link></li>
                        <li><Link className="hover:text-indigo-300 hover:underline hover:underline-offset-4 transition" to="/">Contact Us</Link></li>
                        <li><Link className="hover:text-indigo-300 hover:underline hover:underline-offset-4 transition" to="/">Customer Support</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2">
                        <li><Link className="hover:text-indigo-300 hover:underline hover:underline-offset-4 transition" to="/">Terms & Conditions</Link></li>
                        <li><Link className="hover:text-indigo-300 hover:underline hover:underline-offset-4 transition" to="/">Privacy Policy</Link></li>
                        <li><Link className="hover:text-indigo-300 hover:underline hover:underline-offset-4 transition" to="/">Licensing</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
