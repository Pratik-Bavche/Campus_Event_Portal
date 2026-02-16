"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterClub() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        category: 'Technical',
        president: '',
        contact: '',
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create new request object
        const newRequest = {
            id: Date.now(), // simple unique id
            ...formData,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: 'Pending',
            documents: [{ type: 'Registration Request', name: 'Form_Data.pdf' }]
        };

        // Save to localStorage
        const existingRequests = JSON.parse(localStorage.getItem('club_requests') || '[]');
        localStorage.setItem('club_requests', JSON.stringify([...existingRequests, newRequest]));

        alert('Registration Submitted Successfully!');
        router.push('/');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-6">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-zinc-200">
                <h2 className="text-2xl font-bold mb-6 text-center">Register New Club</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1">Club Name</label>
                        <input
                            required
                            type="text"
                            className="w-full p-2 border border-zinc-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1">Category</label>
                        <select
                            className="w-full p-2 border border-zinc-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option>Technical</option>
                            <option>Cultural</option>
                            <option>Sports</option>
                            <option>Service</option>
                            <option>Arts</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1">President Name</label>
                        <input
                            required
                            type="text"
                            className="w-full p-2 border border-zinc-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.president}
                            onChange={(e) => setFormData({ ...formData, president: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1">Contact Number</label>
                        <input
                            required
                            type="tel"
                            className="w-full p-2 border border-zinc-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.contact}
                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1">Description</label>
                        <textarea
                            className="w-full p-2 border border-zinc-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition">
                        Submit Request
                    </button>

                    <Link href="/" className="text-center text-sm text-zinc-500 hover:text-zinc-800">
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
    );
}
