import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from "../index"

function Footer() {
    return (
        <footer className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-10 border-t border-indigo-900">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
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
                        <li><Link className="hover:underline hover:text-indigo-300" to="/">Features</Link></li>
                        <li><Link className="hover:underline hover:text-indigo-300" to="/">Pricing</Link></li>
                        <li><Link className="hover:underline hover:text-indigo-300" to="/">Affiliate Program</Link></li>
                        <li><Link className="hover:underline hover:text-indigo-300" to="/">Press Kit</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-2">
                        <li><Link className="hover:underline hover:text-indigo-300" to="/">Account</Link></li>
                        <li><Link className="hover:underline hover:text-indigo-300" to="/">Help</Link></li>
                        <li><Link className="hover:underline hover:text-indigo-300" to="/">Contact Us</Link></li>
                        <li><Link className="hover:underline hover:text-indigo-300" to="/">Customer Support</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2">
                        <li><Link className="hover:underline hover:text-indigo-300" to="/">Terms & Conditions</Link></li>
                        <li><Link className="hover:underline hover:text-indigo-300" to="/">Privacy Policy</Link></li>
                        <li><Link className="hover:underline hover:text-indigo-300" to="/">Licensing</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer
