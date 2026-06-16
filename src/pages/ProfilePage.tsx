import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, MapPin, Globe, PenTool, Settings as SettingsIcon, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { API_ENDPOINTS, API_URL } from '@/config/api';

interface Blog {
    _id: string;
    title: string;
    content: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
}

export function ProfilePage() {
    const { user, token, login } = useAuth();
    const [activeTab, setActiveTab] = useState<'info' | 'blogs' | 'settings'>('info');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Blog State
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isCreatingBlog, setIsCreatingBlog] = useState(false);
    const [newBlog, setNewBlog] = useState({ title: '', content: '' });

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailOrMobile: '',
        dob: '',
        location: '',
        country: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                emailOrMobile: user.emailOrMobile || '',
                dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
                location: user.location || '',
                country: user.country || '',
            });
        }
    }, [user]);

    // Fetch blogs when tab changes
    useEffect(() => {
        if (activeTab === 'blogs') {
            fetchBlogs();
        }
    }, [activeTab]);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${API_URL}/api/blogs/my-blogs`, {
                headers: { 'x-auth-token': token || '' },
            });
            if (response.ok) {
                const data = await response.json();
                setBlogs(data);
            }
        } catch (error) {
            console.error('Failed to fetch blogs', error);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const response = await fetch(API_ENDPOINTS.user.profile, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token || '',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update profile');
            }

            // Update local context
            login(token!, data);
            setMessage({ type: 'success', text: 'Profile updated successfully' });
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateBlog = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(API_ENDPOINTS.blogs.create, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token || '',
                },
                body: JSON.stringify(newBlog),
            });

            if (response.ok) {
                setNewBlog({ title: '', content: '' });
                setIsCreatingBlog(false);
                fetchBlogs(); // Refresh list
                alert('Blog submitted for approval!');
            } else {
                const data = await response.json();
                alert(`Failed to submit blog: ${data.message}`);
                console.error('Failed to create blog:', data);
            }
        } catch (error) {
            console.error('Failed to create blog', error);
            alert('An error occurred while submitting the blog.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-kau-bg">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-full bg-kau-surface border border-white/10 flex items-center justify-center text-kau-accent text-2xl font-bold">
                        {user?.firstName?.charAt(0)}
                        {user?.lastName?.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-kau-text">
                            {user?.firstName} {user?.lastName}
                        </h1>
                        <p className="text-kau-text-secondary">{user?.emailOrMobile}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-kau-text-secondary">
                            {user?.location && (
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" /> {user.location}
                                </span>
                            )}
                            {user?.country && (
                                <span className="flex items-center gap-1">
                                    <Globe className="w-4 h-4" /> {user.country}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-white/10 mb-8">
                    <button
                        onClick={() => setActiveTab('info')}
                        className={cn(
                            'px-4 py-2 text-sm font-medium transition-colors relative',
                            activeTab === 'info' ? 'text-kau-text' : 'text-kau-text-secondary hover:text-kau-text'
                        )}
                    >
                        <User className="w-4 h-4 inline-block mr-2" />
                        Personal Info
                        {activeTab === 'info' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-kau-accent" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('blogs')}
                        className={cn(
                            'px-4 py-2 text-sm font-medium transition-colors relative',
                            activeTab === 'blogs' ? 'text-kau-text' : 'text-kau-text-secondary hover:text-kau-text'
                        )}
                    >
                        <PenTool className="w-4 h-4 inline-block mr-2" />
                        My Blogs
                        {activeTab === 'blogs' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-kau-accent" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={cn(
                            'px-4 py-2 text-sm font-medium transition-colors relative',
                            activeTab === 'settings' ? 'text-kau-text' : 'text-kau-text-secondary hover:text-kau-text'
                        )}
                    >
                        <SettingsIcon className="w-4 h-4 inline-block mr-2" />
                        Settings
                        {activeTab === 'settings' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-kau-accent" />
                        )}
                    </button>
                </div>

                {/* Content */}
                <div className="bg-kau-surface border border-white/5 rounded-xl p-6 md:p-8">
                    {activeTab === 'info' && (
                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            {message && (
                                <div className={cn("p-4 rounded-lg", message.type === 'success' ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400")}>
                                    {message.text}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-kau-text-secondary">First Name</label>
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-kau-text focus:outline-none focus:border-kau-accent transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-kau-text-secondary">Last Name</label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-kau-text focus:outline-none focus:border-kau-accent transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-kau-text-secondary">Date of Birth</label>
                                    <input
                                        type="date"
                                        value={formData.dob}
                                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-kau-text focus:outline-none focus:border-kau-accent transition-colors [color-scheme:dark]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-kau-text-secondary">Email / Mobile</label>
                                    <input
                                        type="text"
                                        value={formData.emailOrMobile}
                                        disabled
                                        className="w-full bg-black/10 border border-white/5 rounded-lg px-4 py-2 text-kau-text-secondary cursor-not-allowed"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-kau-text-secondary">Location</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="e.g. Mumbai, India"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-kau-text focus:outline-none focus:border-kau-accent transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-kau-text-secondary">Country</label>
                                    <input
                                        type="text"
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                        placeholder="e.g. India"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-kau-text focus:outline-none focus:border-kau-accent transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-6 py-2 bg-kau-accent text-kau-bg font-medium rounded-lg hover:bg-kau-accent/90 transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === 'blogs' && (
                        <div>
                            {!isCreatingBlog ? (
                                <>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-semibold text-kau-text">My Blogs</h2>
                                        <button
                                            onClick={() => setIsCreatingBlog(true)}
                                            className="flex items-center gap-2 px-4 py-2 bg-kau-accent text-kau-bg font-medium rounded-lg hover:bg-kau-accent/90 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" /> Write Blog
                                        </button>
                                    </div>

                                    {blogs.length === 0 ? (
                                        <div className="text-center py-12">
                                            <PenTool className="w-12 h-12 text-kau-text-secondary mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-kau-text mb-2">No blogs yet</h3>
                                            <p className="text-kau-text-secondary">Share your insights with the community.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {blogs.map((blog) => (
                                                <div key={blog._id} className="bg-black/20 border border-white/5 rounded-lg p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="text-lg font-medium text-kau-text">{blog.title}</h3>
                                                        <span className={cn(
                                                            "px-2 py-1 text-xs font-medium rounded-full",
                                                            blog.status === 'approved' ? "bg-green-500/10 text-green-400" :
                                                                blog.status === 'rejected' ? "bg-red-500/10 text-red-400" :
                                                                    "bg-yellow-500/10 text-yellow-400"
                                                        )}>
                                                            {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                                                        </span>
                                                    </div>
                                                    <p className="text-kau-text-secondary text-sm line-clamp-2">{blog.content}</p>
                                                    <div className="mt-2 text-xs text-kau-text-secondary">
                                                        {new Date(blog.createdAt).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <form onSubmit={handleCreateBlog} className="space-y-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold text-kau-text">Write New Blog</h2>
                                        <button
                                            type="button"
                                            onClick={() => setIsCreatingBlog(false)}
                                            className="p-1 hover:bg-white/10 rounded-full transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <input
                                        type="text"
                                        placeholder="Blog Title"
                                        value={newBlog.title}
                                        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-kau-text focus:outline-none focus:border-kau-accent transition-colors"
                                        required
                                    />

                                    <textarea
                                        placeholder="Write your content here..."
                                        rows={10}
                                        value={newBlog.content}
                                        onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-kau-text focus:outline-none focus:border-kau-accent transition-colors resize-none"
                                        required
                                    />

                                    <div className="flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsCreatingBlog(false)}
                                            className="px-4 py-2 text-sm font-medium text-kau-text-secondary hover:text-kau-text transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="px-6 py-2 bg-kau-accent text-kau-bg font-medium rounded-lg hover:bg-kau-accent/90 transition-colors disabled:opacity-50"
                                        >
                                            {isLoading ? 'Publishing...' : 'Submit for Approval'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="text-center py-12">
                            <SettingsIcon className="w-12 h-12 text-kau-text-secondary mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-kau-text mb-2">Account Settings</h3>
                            <p className="text-kau-text-secondary">Coming soon...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
