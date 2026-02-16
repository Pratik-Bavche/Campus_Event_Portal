"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowLeft, CheckCircle, Clock, XCircle, FileText } from 'lucide-react';

export default function CheckStatusPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState<any>(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const storedRequests = JSON.parse(localStorage.getItem('club_requests') || '[]');

        // Find club by name (case insensitive)
        const found = storedRequests.find((req: any) =>
            req.name.toLowerCase() === searchQuery.toLowerCase()
        );

        setResult(found || null);
        setSearched(true);
    };

    return (
        <div className="flex min-h-screen flex-col items-center bg-zinc-50 p-6">
            <Link href="/" className="self-start text-zinc-500 hover:text-zinc-900 mb-8 flex items-center gap-2">
                <ArrowLeft size={20} /> Back to Home
            </Link>

            <div className="w-full max-w-lg">
                <h1 className="text-3xl font-bold text-center mb-2">Check Registration Status</h1>
                <p className="text-center text-zinc-500 mb-8">Enter your club name to check the approval status.</p>

                <form onSubmit={handleSearch} className="flex gap-2 mb-8">
                    <input
                        type="text"
                        required
                        placeholder="Enter Club Name..."
                        className="flex-1 p-3 border border-zinc-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="bg-blue-600 text-white px-6 rounded-lg font-semibold hover:bg-blue-700 transition">
                        Check
                    </button>
                </form>

                {searched && (
                    <div className="animate-fade-in">
                        {result ? (
                            <div className="bg-white rounded-xl shadow-md border border-zinc-200 overflow-hidden">
                                <div className={`p-6 border-b border-zinc-100 flex items-center gap-4 ${result.status === 'Approved' ? 'bg-green-50' :
                                        result.status === 'Rejected' ? 'bg-red-50' : 'bg-yellow-50'
                                    }`}>
                                    {result.status === 'Approved' && <CheckCircle className="text-green-600" size={32} />}
                                    {result.status === 'Rejected' && <XCircle className="text-red-600" size={32} />}
                                    {result.status === 'Pending' && <Clock className="text-yellow-600" size={32} />}

                                    <div>
                                        <h2 className="text-xl font-bold text-zinc-900">{result.name}</h2>
                                        <span className={`text-sm font-semibold ${result.status === 'Approved' ? 'text-green-700' :
                                                result.status === 'Rejected' ? 'text-red-700' : 'text-yellow-700'
                                            }`}>
                                            Status: {result.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-zinc-500 block">Category</span>
                                            <span className="font-medium">{result.category}</span>
                                        </div>
                                        <div>
                                            <span className="text-zinc-500 block">Submitted On</span>
                                            <span className="font-medium">{result.date}</span>
                                        </div>
                                        <div>
                                            <span className="text-zinc-500 block">President</span>
                                            <span className="font-medium">{result.president}</span>
                                        </div>
                                    </div>

                                    {result.status === 'Approved' && (
                                        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100 text-green-800 text-sm">
                                            🎉 Congratulations! Your club has been approved. You can now log in to the portal using your registered credentials.
                                        </div>
                                    )}
                                    {result.status === 'Rejected' && (
                                        <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100 text-red-800 text-sm">
                                            Your application was not approved. Please contact the administration for more details or submit a new request.
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center p-8 bg-white rounded-xl border border-zinc-200 shadow-sm">
                                <Search className="mx-auto text-zinc-300 mb-3" size={48} />
                                <h3 className="text-lg font-semibold text-zinc-900">No Application Found</h3>
                                <p className="text-zinc-500">We couldn't find any club registration with that name.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
