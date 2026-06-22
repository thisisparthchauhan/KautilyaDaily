import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
    Users, FileText, LogOut, Menu, X, CheckCircle,
    XCircle, Clock, Eye, ChevronDown, ChevronUp,
    TrendingUp, Shield, Calendar, Tag
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { API_ENDPOINTS } from '@/config/api';

export function AdminDashboard() {
    const { user, token, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'blogs' | 'users'>('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (user?.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-kau-bg text-kau-text">
                <div className="text-center">
                    <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
                    <p className="text-kau-text-secondary">You do not have permission to view this page.</p>
                    <a href="/" className="mt-4 inline-block text-kau-accent hover:underline">Return Home</a>
                </div>
            </div>
        );
    }

    const navItems = [
        { id: 'overview', label: 'Overview', icon: TrendingUp },
        { id: 'blogs', label: 'Blogs', icon: FileText },
        { id: 'users', label: 'Users', icon: Users },
    ] as const;

    const Sidebar = () => (
        <div className="h-full bg-kau-surface border-r border-white/5 flex flex-col">
            <div className="p-6 border-b border-white/5">
                <h1 className="text-xl font-heading font-bold text-kau-text">
                    Admin<span className="text-kau-accent">Panel</span>
                </h1>
                <p className="text-xs text-kau-text-secondary mt-1">Kautilya Daily</p>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => { setActiveTab(id); setIsMobileMenuOpen(false); }}
                        className={cn(
                            'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                            activeTab === id
                                ? 'bg-kau-accent text-kau-bg'
                                : 'text-kau-text-secondary hover:text-kau-text hover:bg-white/5'
                        )}
                    >
                        <Icon className="w-4 h-4" /> {label}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-kau-accent flex items-center justify-center text-kau-bg font-bold text-sm">
                        {user.firstName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-kau-text truncate">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-kau-accent">Admin</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg transition-colors"
                >
                    <LogOut className="w-4 h-4" /> Sign Out
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-kau-bg text-kau-text flex">
            <div className="hidden lg:block w-60 fixed inset-y-0 left-0 z-30">
                <Sidebar />
            </div>

            <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-kau-surface border-b border-white/5 flex items-center justify-between px-4 z-50">
                <span className="font-heading font-bold text-kau-text">Admin<span className="text-kau-accent">Panel</span></span>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm pt-14">
                    <div className="w-60 h-full"><Sidebar /></div>
                </div>
            )}

            <div className="flex-1 lg:ml-60 p-4 md:p-8 pt-18 lg:pt-8 w-full min-h-screen">
                <div className="pt-16 lg:pt-0">
                    {activeTab === 'overview' && <Overview token={token || ''} onGoToBlogs={() => setActiveTab('blogs')} />}
                    {activeTab === 'blogs' && <BlogManagement token={token || ''} />}
                    {activeTab === 'users' && <UserManagement token={token || ''} />}
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: any; color: string }) {
    return (
        <div className="bg-kau-surface border border-white/5 rounded-xl p-5 flex items-center gap-4">
            <div className={cn('w-11 h-11 rounded-lg flex items-center justify-center', color)}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-2xl font-bold text-kau-text">{value}</p>
                <p className="text-sm text-kau-text-secondary">{label}</p>
            </div>
        </div>
    );
}

function Overview({ token, onGoToBlogs }: { token: string; onGoToBlogs: () => void }) {
    const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0, users: 0 });
    const [pendingBlogs, setPendingBlogs] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [blogsRes, usersRes] = await Promise.all([
                    fetch(API_ENDPOINTS.admin.blogs, { headers: { 'x-auth-token': token } }),
                    fetch(API_ENDPOINTS.admin.users, { headers: { 'x-auth-token': token } }),
                ]);
                const blogs = await blogsRes.json();
                const users = await usersRes.json();
                setStats({
                    total: blogs.length,
                    pending: blogs.filter((b: any) => b.status === 'pending').length,
                    approved: blogs.filter((b: any) => b.status === 'approved').length,
                    rejected: blogs.filter((b: any) => b.status === 'rejected').length,
                    users: users.length,
                });
                setPendingBlogs(blogs.filter((b: any) => b.status === 'pending').slice(0, 3));
            } catch (err) { console.error(err); }
        };
        fetchData();
    }, [token]);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-kau-text">Overview</h2>
                <p className="text-kau-text-secondary text-sm mt-1">Welcome back, here's what's happening.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Users" value={stats.users} icon={Users} color="bg-blue-500/10 text-blue-400" />
                <StatCard label="Pending Review" value={stats.pending} icon={Clock} color="bg-yellow-500/10 text-yellow-400" />
                <StatCard label="Published" value={stats.approved} icon={CheckCircle} color="bg-green-500/10 text-green-400" />
                <StatCard label="Rejected" value={stats.rejected} icon={XCircle} color="bg-red-500/10 text-red-400" />
            </div>

            {pendingBlogs.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-kau-text">Needs Review</h3>
                        <button onClick={onGoToBlogs} className="text-sm text-kau-accent hover:underline">View all →</button>
                    </div>
                    <div className="space-y-3">
                        {pendingBlogs.map(blog => (
                            <div key={blog._id} className="bg-kau-surface border border-yellow-500/20 rounded-xl p-4 flex items-center gap-4">
                                {blog.image && <img src={blog.image} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />}
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-kau-text truncate">{blog.title}</p>
                                    <p className="text-sm text-kau-text-secondary mt-0.5">
                                        by {blog.author?.firstName} {blog.author?.lastName} · {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </p>
                                </div>
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-400 shrink-0">Pending</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function BlogManagement({ token }: { token: string }) {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
    const [isLoading, setIsLoading] = useState(true);
    const [previewBlog, setPreviewBlog] = useState<any | null>(null);
    const [counts, setCounts] = useState({ pending: 0, approved: 0, rejected: 0, all: 0 });

    useEffect(() => { fetchBlogs(); }, [filter]);

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(API_ENDPOINTS.admin.blogs, { headers: { 'x-auth-token': token } });
            const all = await res.json();
            setCounts({
                all: all.length,
                pending: all.filter((b: any) => b.status === 'pending').length,
                approved: all.filter((b: any) => b.status === 'approved').length,
                rejected: all.filter((b: any) => b.status === 'rejected').length,
            });
            setBlogs(filter === 'all' ? all : all.filter((b: any) => b.status === filter));
        } catch (err) { console.error(err); }
        finally { setIsLoading(false); }
    };

    const updateStatus = async (blogId: string, status: string) => {
        try {
            await fetch(API_ENDPOINTS.admin.updateBlogStatus(blogId), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ status }),
            });
            setPreviewBlog(null);
            fetchBlogs();
        } catch (err) { console.error(err); }
    };

    const tabs = [
        { id: 'pending', label: 'Pending', count: counts.pending, color: 'text-yellow-400' },
        { id: 'approved', label: 'Approved', count: counts.approved, color: 'text-green-400' },
        { id: 'rejected', label: 'Rejected', count: counts.rejected, color: 'text-red-400' },
        { id: 'all', label: 'All', count: counts.all, color: 'text-kau-text-secondary' },
    ] as const;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-kau-text">Blog Management</h2>

            {/* Filter tabs */}
            <div className="flex gap-1 bg-kau-surface border border-white/5 rounded-xl p-1 w-fit">
                {tabs.map(({ id, label, count, color }) => (
                    <button
                        key={id}
                        onClick={() => setFilter(id)}
                        className={cn(
                            'px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
                            filter === id ? 'bg-white/10 text-kau-text' : 'text-kau-text-secondary hover:text-kau-text'
                        )}
                    >
                        {label}
                        <span className={cn('text-xs font-bold', color)}>{count}</span>
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="flex items-center gap-3 text-kau-text-secondary py-8">
                    <div className="w-5 h-5 border-2 border-kau-accent border-t-transparent rounded-full animate-spin" />
                    Loading blogs...
                </div>
            ) : blogs.length === 0 ? (
                <div className="text-center py-16 bg-kau-surface border border-white/5 rounded-xl">
                    <FileText className="w-10 h-10 text-kau-text-secondary mx-auto mb-3" />
                    <p className="text-kau-text-secondary">No {filter} blogs found.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {blogs.map((blog) => (
                        <BlogCard
                            key={blog._id}
                            blog={blog}
                            onPreview={() => setPreviewBlog(blog)}
                            onApprove={() => updateStatus(blog._id, 'approved')}
                            onReject={() => updateStatus(blog._id, 'rejected')}
                        />
                    ))}
                </div>
            )}

            {/* Preview Modal */}
            {previewBlog && (
                <BlogPreviewModal
                    blog={previewBlog}
                    onClose={() => setPreviewBlog(null)}
                    onApprove={() => updateStatus(previewBlog._id, 'approved')}
                    onReject={() => updateStatus(previewBlog._id, 'rejected')}
                />
            )}
        </div>
    );
}

function BlogCard({ blog, onPreview, onApprove, onReject }: {
    blog: any; onPreview: () => void; onApprove: () => void; onReject: () => void;
}) {
    const [expanded, setExpanded] = useState(false);
    const statusColors: Record<string, string> = {
        pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        approved: 'bg-green-500/10 text-green-400 border-green-500/20',
        rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
    };

    const wordCount = blog.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
    const readTime = Math.max(1, Math.round(wordCount / 200));

    return (
        <div className="bg-kau-surface border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors">
            <div className="p-5">
                <div className="flex gap-4">
                    {/* Cover image */}
                    {blog.image && (
                        <img src={blog.image} alt="" className="w-20 h-20 rounded-lg object-cover shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                            <h3 className="text-base font-semibold text-kau-text leading-snug">{blog.title}</h3>
                            <span className={cn('px-2 py-0.5 text-xs font-medium rounded-full border shrink-0', statusColors[blog.status])}>
                                {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                            </span>
                        </div>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-kau-text-secondary">
                            <span className="flex items-center gap-1">
                                <div className="w-5 h-5 rounded-full bg-kau-accent/20 flex items-center justify-center text-kau-accent text-xs font-bold">
                                    {blog.author?.firstName?.charAt(0)}
                                </div>
                                {blog.author?.firstName} {blog.author?.lastName}
                            </span>
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readTime} min read</span>
                            {blog.category && blog.category !== 'General' && (
                                <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{blog.category}</span>
                            )}
                        </div>

                        {/* Content preview */}
                        <div className={cn('mt-3 text-sm text-kau-text-secondary overflow-hidden transition-all', expanded ? '' : 'max-h-12')}>
                            <div dangerouslySetInnerHTML={{ __html: blog.content }} className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-headings:my-1" />
                        </div>
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="mt-1 flex items-center gap-1 text-xs text-kau-accent hover:underline"
                        >
                            {expanded ? <><ChevronUp className="w-3 h-3" />Show less</> : <><ChevronDown className="w-3 h-3" />Read more</>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="px-5 py-3 border-t border-white/5 bg-black/10 flex items-center justify-between">
                <button onClick={onPreview} className="flex items-center gap-1.5 text-sm text-kau-text-secondary hover:text-kau-text transition-colors">
                    <Eye className="w-4 h-4" /> Full Preview
                </button>
                <div className="flex gap-2">
                    {blog.status !== 'approved' && (
                        <button onClick={onApprove} className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-green-400 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-lg transition-colors">
                            <CheckCircle className="w-4 h-4" /> Approve
                        </button>
                    )}
                    {blog.status !== 'rejected' && (
                        <button onClick={onReject} className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition-colors">
                            <XCircle className="w-4 h-4" /> Reject
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function BlogPreviewModal({ blog, onClose, onApprove, onReject }: {
    blog: any; onClose: () => void; onApprove: () => void; onReject: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-kau-bg border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {/* Modal header */}
                <div className="sticky top-0 bg-kau-bg border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
                    <div>
                        <p className="text-xs text-kau-text-secondary uppercase tracking-wider">Blog Preview</p>
                        <p className="text-sm text-kau-text-secondary mt-0.5">by {blog.author?.firstName} {blog.author?.lastName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {blog.status !== 'approved' && (
                            <button onClick={onApprove} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-green-400 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-lg transition-colors">
                                <CheckCircle className="w-4 h-4" /> Approve
                            </button>
                        )}
                        {blog.status !== 'rejected' && (
                            <button onClick={onReject} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition-colors">
                                <XCircle className="w-4 h-4" /> Reject
                            </button>
                        )}
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-kau-text-secondary">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Blog content */}
                <div className="p-6">
                    {blog.image && (
                        <img src={blog.image} alt={blog.title} className="w-full h-56 object-cover rounded-xl mb-6" />
                    )}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {blog.category && blog.category !== 'General' && (
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-kau-accent/10 text-kau-accent border border-kau-accent/20">{blog.category}</span>
                        )}
                        <span className="text-xs text-kau-text-secondary flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold text-kau-text mb-6">{blog.title}</h1>
                    <div
                        className="prose prose-invert prose-lg max-w-none prose-headings:text-kau-text prose-p:text-kau-text-secondary prose-strong:text-kau-text prose-blockquote:border-kau-accent"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </div>
        </div>
    );
}

function UserManagement({ token }: { token: string }) {
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user: currentUser } = useAuth();

    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch(API_ENDPOINTS.admin.users, { headers: { 'x-auth-token': token } });
            setUsers(await res.json());
        } catch (err) { console.error(err); }
        finally { setIsLoading(false); }
    };

    const toggleRole = async (userId: string, currentRole: string) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        try {
            await fetch(API_ENDPOINTS.admin.updateUserRole(userId), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ role: newRole }),
            });
            fetchUsers();
        } catch (err) { console.error(err); }
    };

    if (isLoading) return (
        <div className="flex items-center gap-3 text-kau-text-secondary py-8">
            <div className="w-5 h-5 border-2 border-kau-accent border-t-transparent rounded-full animate-spin" />
            Loading users...
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-kau-text">User Management</h2>
                <span className="text-sm text-kau-text-secondary">{users.length} total users</span>
            </div>

            <div className="bg-kau-surface border border-white/5 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-white/5 bg-black/20">
                            <tr>
                                <th className="px-5 py-3 text-xs font-medium text-kau-text-secondary uppercase tracking-wider">User</th>
                                <th className="px-5 py-3 text-xs font-medium text-kau-text-secondary uppercase tracking-wider">Email</th>
                                <th className="px-5 py-3 text-xs font-medium text-kau-text-secondary uppercase tracking-wider">Role</th>
                                <th className="px-5 py-3 text-xs font-medium text-kau-text-secondary uppercase tracking-wider">Joined</th>
                                <th className="px-5 py-3 text-xs font-medium text-kau-text-secondary uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map((u) => (
                                <tr key={u._id} className="hover:bg-white/3 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-kau-accent/20 flex items-center justify-center text-kau-accent font-bold text-sm shrink-0">
                                                {u.firstName?.charAt(0)}
                                            </div>
                                            <span className="text-sm font-medium text-kau-text">{u.firstName} {u.lastName}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-kau-text-secondary">{u.emailOrMobile}</td>
                                    <td className="px-5 py-4">
                                        <span className={cn(
                                            'px-2 py-1 text-xs font-medium rounded-full',
                                            u.role === 'admin' ? 'bg-kau-accent/10 text-kau-accent' : 'bg-white/5 text-kau-text-secondary'
                                        )}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-kau-text-secondary">
                                        {new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td className="px-5 py-4">
                                        {u._id !== currentUser?._id && (
                                            <button
                                                onClick={() => toggleRole(u._id, u.role)}
                                                className={cn(
                                                    'text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors',
                                                    u.role === 'admin'
                                                        ? 'text-red-400 border-red-500/20 hover:bg-red-500/10'
                                                        : 'text-kau-accent border-kau-accent/20 hover:bg-kau-accent/10'
                                                )}
                                            >
                                                {u.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
