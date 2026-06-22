import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Heart, Clock, X } from 'lucide-react';
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
    status: 'approved';
    createdAt: string;
    category?: string;
    image?: string;
    likes: string[];
}

interface BlogsPageProps {
    onBlogClick: (blogId: string) => void;
}

const CATEGORIES = ['All', 'Markets', 'Economy', 'Tech', 'Policy', 'General'] as const;

function readTime(content: string) {
    const words = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
    return `${Math.max(1, Math.round(words / 200))} min`;
}

export function BlogsPage({ onBlogClick }: BlogsPageProps) {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [activeTab, setActiveTab] = useState<'expert' | 'community'>('expert');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`${API_URL}/api/blogs`);
                if (response.ok) setBlogs(await response.json());
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const expertBlogs = blogs.filter(b => b.author.role === 'admin');
    const communityBlogs = blogs.filter(b => b.author.role !== 'admin');
    const sourceBlogs = activeTab === 'expert' ? expertBlogs : communityBlogs;

    const filtered = useMemo(() => {
        let result = sourceBlogs;
        if (selectedCategory !== 'All') {
            result = result.filter(b => (b.category || 'General') === selectedCategory);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(b =>
                b.title.toLowerCase().includes(q) ||
                b.content.replace(/<[^>]*>/g, '').toLowerCase().includes(q) ||
                `${b.author.firstName} ${b.author.lastName}`.toLowerCase().includes(q)
            );
        }
        return result;
    }, [sourceBlogs, selectedCategory, searchQuery]);

    return (
        <div className="min-h-screen pt-24 pb-16 bg-kau-bg">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-kau-text mb-3">
                        Kautilya <span className="text-kau-accent">Insights</span>
                    </h1>
                    <p className="text-kau-text-secondary text-lg max-w-2xl">
                        Deep dives into markets, policy, and technology from our experts and community.
                    </p>
                </div>

                {/* Search */}
                <div className="relative mb-8 max-w-lg">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-kau-text-secondary" />
                    <input
                        type="text"
                        placeholder="Search blogs, topics, authors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-kau-surface border border-white/10 rounded-xl pl-11 pr-10 py-3 text-kau-text placeholder-kau-text-secondary/50 focus:outline-none focus:border-kau-accent transition-colors text-sm"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-kau-text-secondary hover:text-kau-text">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Source tabs + category filters row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                    {/* Expert / Community tabs */}
                    <div className="flex gap-1 bg-kau-surface border border-white/5 rounded-xl p-1 w-fit shrink-0">
                        {[
                            { id: 'expert', label: 'Expert Analysis', count: expertBlogs.length },
                            { id: 'community', label: 'Community Voices', count: communityBlogs.length },
                        ].map(({ id, label, count }) => (
                            <button
                                key={id}
                                onClick={() => { setActiveTab(id as any); setSelectedCategory('All'); }}
                                className={cn(
                                    'px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap',
                                    activeTab === id ? 'bg-kau-accent text-kau-bg' : 'text-kau-text-secondary hover:text-kau-text'
                                )}
                            >
                                {label}
                                <span className={cn('text-xs font-bold', activeTab === id ? 'text-kau-bg/70' : 'text-kau-text-secondary/60')}>{count}</span>
                            </button>
                        ))}
                    </div>

                    {/* Category pills */}
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={cn(
                                    'px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition-all shrink-0',
                                    selectedCategory === cat
                                        ? 'bg-white/10 border-white/20 text-kau-text'
                                        : 'border-white/5 text-kau-text-secondary hover:border-white/15 hover:text-kau-text'
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results count */}
                {(searchQuery || selectedCategory !== 'All') && !isLoading && (
                    <p className="text-sm text-kau-text-secondary mb-6">
                        {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                        {searchQuery && <> for "<span className="text-kau-text">{searchQuery}</span>"</>}
                        {selectedCategory !== 'All' && <> in <span className="text-kau-text">{selectedCategory}</span></>}
                    </p>
                )}

                {/* Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-kau-surface rounded-2xl overflow-hidden animate-pulse">
                                <div className="aspect-[16/9] bg-white/5" />
                                <div className="p-5 space-y-3">
                                    <div className="h-3 bg-white/5 rounded w-1/3" />
                                    <div className="h-5 bg-white/5 rounded w-3/4" />
                                    <div className="h-3 bg-white/5 rounded w-full" />
                                    <div className="h-3 bg-white/5 rounded w-2/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 bg-kau-surface/40 rounded-2xl border border-white/5">
                        <Search className="w-10 h-10 text-kau-text-secondary mx-auto mb-3 opacity-40" />
                        <p className="text-lg text-kau-text mb-1">No blogs found</p>
                        <p className="text-sm text-kau-text-secondary">
                            {searchQuery ? 'Try a different search term' : 'No stories in this category yet'}
                        </p>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((blog, i) => (
                                <BlogCard key={blog._id} blog={blog} index={i} activeTab={activeTab} onClick={() => onBlogClick(blog._id)} />
                            ))}
                        </div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}

function BlogCard({ blog, index, activeTab, onClick }: {
    blog: Blog; index: number; activeTab: string; onClick: () => void;
}) {
    const plainText = blog.content.replace(/<[^>]*>/g, '');
    const isExpert = blog.author.role === 'admin';

    return (
        <motion.article
            key={blog._id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ delay: index * 0.04 }}
            className="group cursor-pointer flex flex-col bg-kau-surface border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all hover:-translate-y-0.5"
            onClick={onClick}
        >
            {/* Cover image */}
            <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-kau-surface to-black shrink-0">
                {blog.image ? (
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white/5 font-heading text-6xl font-black select-none">KD</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Category badge on image */}
                {blog.category && blog.category !== 'General' && (
                    <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-sm text-white/80 border border-white/10">
                            {blog.category}
                        </span>
                    </div>
                )}

                {/* Date on image */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-white/70 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <Calendar className="w-3 h-3" />
                    {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col p-5">
                {/* Author + type */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-kau-accent/20 flex items-center justify-center text-kau-accent text-xs font-bold shrink-0">
                        {blog.author.firstName.charAt(0)}
                    </div>
                    <span className="text-xs text-kau-text-secondary">
                        {blog.author.firstName} {blog.author.lastName}
                    </span>
                    <span className={cn(
                        'ml-auto px-2 py-0.5 text-xs font-medium rounded-full',
                        isExpert ? 'bg-kau-accent/10 text-kau-accent' : 'bg-blue-500/10 text-blue-400'
                    )}>
                        {isExpert ? 'Expert' : 'Community'}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-kau-text mb-2 group-hover:text-kau-accent transition-colors line-clamp-2 leading-snug">
                    {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-kau-text-secondary text-sm line-clamp-2 leading-relaxed mb-4">
                    {plainText}
                </p>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between text-xs text-kau-text-secondary border-t border-white/5 pt-3">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />{readTime(blog.content)}
                        </span>
                        {(blog.likes?.length ?? 0) > 0 && (
                            <span className="flex items-center gap-1">
                                <Heart className="w-3 h-3 fill-red-400 text-red-400" />{blog.likes.length}
                            </span>
                        )}
                    </div>
                    <span className="flex items-center gap-1 text-kau-accent font-medium group-hover:translate-x-0.5 transition-transform">
                        Read <ArrowRight className="w-3 h-3" />
                    </span>
                </div>
            </div>
        </motion.article>
    );
}
