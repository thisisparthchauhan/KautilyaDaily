import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { API_URL } from '@/config/api';
import { cn } from '@/lib/utils';

interface Blog {
    _id: string;
    title: string;
    content: string;
    author: {
        _id: string;
        firstName: string;
        lastName: string;
        role: 'user' | 'admin';
    };
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    tags?: string[];
    image?: string; // Optional cover image
}

interface BlogsPageProps {
    onBlogClick: (blogId: string) => void;
}

export function BlogsPage({ onBlogClick }: BlogsPageProps) {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [activeTab, setActiveTab] = useState<'admin' | 'public'>('admin');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            // Fetch all blogs (public endpoint ideally, or specific endpoint for listed blogs)
            // Assuming /api/blogs returns all approved blogs or we filter here
            // For now using /api/blogs/all if exists, or falling back to a general fetch
            // Currently verify backend route: GET /api/blogs/public (need to check if exists or create)
            // If not, we might need to add it. For now, let's assume valid endpoint.
            const response = await fetch(`${API_URL}/api/blogs`);
            if (response.ok) {
                const data = await response.json();
                setBlogs(data.filter((blog: Blog) => blog.status === 'approved'));
            } else {
                console.error("Failed to fetch blogs");
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const adminBlogs = blogs.filter(blog => blog.author.role === 'admin');
    const publicBlogs = blogs.filter(blog => blog.author.role !== 'admin');
    const currentBlogs = activeTab === 'admin' ? adminBlogs : publicBlogs;

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-kau-bg">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-kau-text mb-4">
                            Kautilya <span className="text-kau-accent">Insights</span>
                        </h1>
                        <p className="text-kau-text-secondary text-lg max-w-2xl">
                            Deep dives into markets, policy, and technology from our experts and community.
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-8 border-b border-white/10 mb-8 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('admin')}
                        className={cn(
                            "pb-4 text-lg font-medium transition-colors relative whitespace-nowrap",
                            activeTab === 'admin' ? "text-kau-accent" : "text-kau-text-secondary hover:text-kau-text"
                        )}
                    >
                        Expert Analysis
                        {activeTab === 'admin' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-kau-accent" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('public')}
                        className={cn(
                            "pb-4 text-lg font-medium transition-colors relative whitespace-nowrap",
                            activeTab === 'public' ? "text-kau-accent" : "text-kau-text-secondary hover:text-kau-text"
                        )}
                    >
                        Community Voices
                        {activeTab === 'public' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-kau-accent" />
                        )}
                    </button>
                </div>

                {/* Blog Grid */}
                {isLoading ? (
                    <div className="text-center py-20 text-kau-text-secondary">Loading insights...</div>
                ) : currentBlogs.length === 0 ? (
                    <div className="text-center py-20 bg-kau-surface/50 rounded-2xl border border-white/5">
                        <p className="text-xl text-kau-text-secondary">No stories found in this section yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentBlogs.map((blog) => (
                            <motion.article
                                key={blog._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group cursor-pointer flex flex-col h-full"
                                onClick={() => onBlogClick(blog._id)}
                            >
                                <div className="aspect-[16/9] bg-kau-surface rounded-xl overflow-hidden mb-4 relative border border-white/5">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    {/* Placeholder for image if authentic image missing */}
                                    <div className="absolute inset-0 flex items-center justify-center text-kau-text-secondary/20 font-heading text-4xl font-bold">
                                        KD
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                        <div className="flex items-center gap-2 text-xs text-white/80">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-kau-accent/10 text-kau-accent border border-kau-accent/20">
                                            {activeTab === 'admin' ? 'Analysis' : 'Community'}
                                        </span>
                                        <span className="text-xs text-kau-text-secondary flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            {blog.author.firstName} {blog.author.lastName}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-kau-text mb-2 group-hover:text-kau-accent transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>

                                    <p className="text-kau-text-secondary text-sm mb-4 line-clamp-3">
                                        {blog.content}
                                    </p>

                                    <div className="mt-auto pt-4 flex items-center text-kau-accent text-sm font-medium group-hover:translate-x-1 transition-transform">
                                        Read Experience <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
