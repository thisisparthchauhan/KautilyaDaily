import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Users, FileText, LogOut, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { API_ENDPOINTS } from '@/config/api';

export function AdminDashboard() {
    const { user, token, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<'users' | 'blogs'>('users');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Temp Check for Admin Access (Frontend only, backend protects data)
    if (user?.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-kau-bg text-kau-text">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
                    <p className="text-kau-text-secondary">You do not have permission to view this page.</p>
                    <a href="/" className="mt-4 inline-block text-kau-accent hover:underline">Return Home</a>
                </div>
            </div>
        );
    }

    const AdminSidebar = () => (
        <div className="h-full bg-kau-surface border-r border-white/5 flex flex-col">
            <div className="p-6 border-b border-white/5">
                <h1 className="text-xl font-heading font-bold text-kau-text">
                    Admin<span className="text-kau-accent">Panel</span>
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <button
                    onClick={() => { setActiveTab('users'); setIsMobileMenuOpen(false); }}
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                        activeTab === 'users' ? "bg-kau-accent text-kau-bg" : "text-kau-text-secondary hover:text-kau-text hover:bg-white/5"
                    )}
                >
                    <Users className="w-5 h-5" /> Users
                </button>
                <button
                    onClick={() => { setActiveTab('blogs'); setIsMobileMenuOpen(false); }}
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                        activeTab === 'blogs' ? "bg-kau-accent text-kau-bg" : "text-kau-text-secondary hover:text-kau-text hover:bg-white/5"
                    )}
                >
                    <FileText className="w-5 h-5" /> Blogs
                </button>
            </nav>

            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 px-4 py-3 text-sm text-kau-text mb-2">
                    <div className="w-8 h-8 rounded-full bg-kau-accent/20 flex items-center justify-center text-kau-accent font-bold">
                        {user.firstName.charAt(0)}
                    </div>
                    <div>
                        <p className="font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-kau-text-secondary capitalize">{user.role}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg transition-colors"
                >
                    <LogOut className="w-5 h-5" /> Sign Out
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-kau-bg text-kau-text flex">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 fixed inset-y-0 left-0">
                <AdminSidebar />
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-kau-surface border-b border-white/5 flex items-center justify-between px-4 z-50">
                <span className="font-heading text-lg font-bold text-kau-text">
                    Admin<span className="text-kau-accent">Panel</span>
                </span>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-kau-text">
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm pt-16">
                    <div className="w-64 h-full">
                        <AdminSidebar />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8 w-full overflow-hidden">
                {activeTab === 'users' && (
                    <UserManagement token={token || ''} />
                )}

                {activeTab === 'blogs' && (
                    <BlogManagement token={token || ''} />
                )}
            </div>
        </div>
    );
}

function UserManagement({ token }: { token: string }) {
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch(API_ENDPOINTS.admin.users, {
                headers: { 'x-auth-token': token },
            });
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleRole = async (userId: string, currentRole: string) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        try {
            await fetch(API_ENDPOINTS.admin.updateUserRole(userId), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ role: newRole }),
            });
            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    if (isLoading) return <div className="text-kau-text">Loading users...</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">User Management</h2>
            <div className="bg-kau-surface border border-white/5 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black/20 border-b border-white/5">
                            <tr>
                                <th className="p-4 text-sm font-medium text-kau-text-secondary">Name</th>
                                <th className="p-4 text-sm font-medium text-kau-text-secondary">Email/Mobile</th>
                                <th className="p-4 text-sm font-medium text-kau-text-secondary">Role</th>
                                <th className="p-4 text-sm font-medium text-kau-text-secondary">Joined</th>
                                <th className="p-4 text-sm font-medium text-kau-text-secondary">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-kau-text">{user.firstName} {user.lastName}</td>
                                    <td className="p-4 text-kau-text-secondary">{user.emailOrMobile}</td>
                                    <td className="p-4">
                                        <span className={cn(
                                            "px-2 py-1 text-xs font-medium rounded-full",
                                            user.role === 'admin' ? "bg-kau-accent/20 text-kau-accent" : "bg-white/10 text-kau-text-secondary"
                                        )}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4 text-kau-text-secondary text-sm">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => toggleRole(user._id, user.role)}
                                            className="text-xs text-kau-accent hover:underline"
                                            disabled={user.role === 'admin' && user.emailOrMobile === 'chauhanparth165@gmail.com'}
                                        >
                                            {user.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                                        </button>
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

function BlogManagement({ token }: { token: string }) {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, [filter]);

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const url = filter === 'all'
                ? API_ENDPOINTS.admin.blogs
                : `${API_ENDPOINTS.admin.blogs}?status=${filter}`;

            const res = await fetch(url, {
                headers: { 'x-auth-token': token },
            });
            const data = await res.json();
            setBlogs(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const updateStatus = async (blogId: string, status: string) => {
        try {
            await fetch(API_ENDPOINTS.admin.updateBlogStatus(blogId), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ status }),
            });
            fetchBlogs();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Blog Approval</h2>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                    className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-kau-text focus:outline-none focus:border-kau-accent"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {isLoading ? (
                <div className="text-kau-text">Loading blogs...</div>
            ) : (
                <div className="grid gap-4">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="bg-kau-surface border border-white/5 rounded-xl p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-medium text-kau-text">{blog.title}</h3>
                                    <p className="text-sm text-kau-text-secondary">
                                        by {blog.author?.firstName} {blog.author?.lastName} • {new Date(blog.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className={cn(
                                    "px-2 py-1 text-xs font-medium rounded-full",
                                    blog.status === 'approved' ? "bg-green-500/10 text-green-400" :
                                        blog.status === 'rejected' ? "bg-red-500/10 text-red-400" :
                                            "bg-yellow-500/10 text-yellow-400"
                                )}>
                                    {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                                </span>
                            </div>
                            <p className="text-kau-text-secondary text-sm mb-6 whitespace-pre-wrap">{blog.content}</p>

                            <div className="flex justify-end gap-3 border-t border-white/5 pt-4">
                                {blog.status !== 'approved' && (
                                    <button
                                        onClick={() => updateStatus(blog._id, 'approved')}
                                        className="px-4 py-2 text-sm font-medium text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                                    >
                                        Approve
                                    </button>
                                )}
                                {blog.status !== 'rejected' && (
                                    <button
                                        onClick={() => updateStatus(blog._id, 'rejected')}
                                        className="px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        Reject
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    {blogs.length === 0 && (
                        <div className="text-center py-12 text-kau-text-secondary">
                            No blogs found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
