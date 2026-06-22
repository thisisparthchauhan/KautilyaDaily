import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Calendar, Share2, Heart, Bookmark, Check, User2 } from 'lucide-react';
import { API_ENDPOINTS } from '@/config/api';
import { useAuth } from '@/context/AuthContext';
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
    image?: string;
    likes: string[];
    savedBy: string[];
}

interface BlogDetailPageProps {
    blogId: string;
    onBack: () => void;
}

function readTime(content: string): string {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
}

export function BlogDetailPage({ blogId, onBack }: BlogDetailPageProps) {
    const { token, user } = useAuth();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.blogs.byId(blogId));
                if (response.ok) {
                    const data: Blog = await response.json();
                    setBlog(data);
                    setLikeCount(data.likes?.length ?? 0);
                    if (user) {
                        setLiked(data.likes?.some(id => id === user._id || id === (user as any).id) ?? false);
                        setSaved(data.savedBy?.some(id => id === user._id || id === (user as any).id) ?? false);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch blog', error);
            } finally {
                setIsLoading(false);
            }
        };
        if (blogId) fetchBlog();
    }, [blogId, user]);

    const handleLike = async () => {
        if (!token) return;
        try {
            const res = await fetch(API_ENDPOINTS.blogs.like(blogId), {
                method: 'POST',
                headers: { 'x-auth-token': token },
            });
            if (res.ok) {
                const data = await res.json();
                setLiked(data.liked);
                setLikeCount(data.likes);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async () => {
        if (!token) return;
        try {
            const res = await fetch(API_ENDPOINTS.blogs.save(blogId), {
                method: 'POST',
                headers: { 'x-auth-token': token },
            });
            if (res.ok) {
                const data = await res.json();
                setSaved(data.saved);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleShare = () => {
        const url = `${window.location.origin}/blogs/${blogId}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-3 text-kau-text-secondary">
                <div className="w-8 h-8 border-2 border-kau-accent border-t-transparent rounded-full animate-spin" />
                <span>Loading story...</span>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen pt-24 text-center">
                <h2 className="text-xl text-kau-text mb-4">Story not found.</h2>
                <button onClick={onBack} className="text-kau-accent hover:underline">Back to Blogs</button>
            </div>
        );
    }

    const authorInitial = blog.author.firstName.charAt(0).toUpperCase();
    const authorName = `${blog.author.firstName} ${blog.author.lastName}`;
    const isAdmin = blog.author.role === 'admin';

    return (
        <div className="min-h-screen bg-kau-bg pb-24">

            {/* Hero Banner */}
            <div className="relative h-[55vh] md:h-[65vh] w-full overflow-hidden">
                {blog.image ? (
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-kau-surface via-kau-bg to-black flex items-center justify-center">
                        <span className="text-white/5 font-heading text-[12rem] font-black select-none leading-none">KD</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-kau-bg via-kau-bg/60 to-transparent" />

                {/* Back button */}
                <div className="absolute top-6 left-6 z-20">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Blogs
                    </button>
                </div>

                {/* Hero content */}
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 md:px-12 max-w-4xl z-10">
                    <span className={cn(
                        "inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full border",
                        isAdmin
                            ? "text-kau-accent bg-kau-accent/10 border-kau-accent/30"
                            : "text-blue-400 bg-blue-500/10 border-blue-500/20"
                    )}>
                        {isAdmin ? 'Curated Analysis' : 'Community Story'}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight mb-6">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-white/70">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-full bg-kau-accent flex items-center justify-center text-kau-bg font-bold text-base shrink-0">
                                {authorInitial}
                            </div>
                            <div className="leading-tight">
                                <div className="text-white font-medium">{authorName}</div>
                                <div className="text-white/50 text-xs">{isAdmin ? 'Expert' : 'Contributor'}</div>
                            </div>
                        </div>
                        <div className="h-5 w-px bg-white/15 hidden md:block" />
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(blog.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <div className="h-5 w-px bg-white/15 hidden md:block" />
                        <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {readTime(blog.content)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Article body */}
            <div className="max-w-3xl mx-auto px-6 md:px-4 mt-10">

                {/* Action bar */}
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-1">
                        <button
                            onClick={handleLike}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm font-medium",
                                liked
                                    ? "bg-red-500/10 border-red-500/30 text-red-400"
                                    : "border-white/10 text-kau-text-secondary hover:border-white/20 hover:text-kau-text"
                            )}
                        >
                            <Heart className={cn("w-4 h-4", liked && "fill-red-400")} />
                            {likeCount > 0 ? likeCount : ''} {likeCount === 1 ? 'Like' : 'Likes'}
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleShare}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm font-medium",
                                copied
                                    ? "bg-green-500/10 border-green-500/30 text-green-400"
                                    : "border-white/10 text-kau-text-secondary hover:border-white/20 hover:text-kau-text"
                            )}
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                            {copied ? 'Copied!' : 'Share'}
                        </button>
                        <button
                            onClick={handleSave}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm font-medium",
                                saved
                                    ? "bg-kau-accent/10 border-kau-accent/30 text-kau-accent"
                                    : "border-white/10 text-kau-text-secondary hover:border-white/20 hover:text-kau-text"
                            )}
                        >
                            <Bookmark className={cn("w-4 h-4", saved && "fill-kau-accent")} />
                            {saved ? 'Saved' : 'Save'}
                        </button>
                    </div>
                </div>

                {/* Content */}
                <article className="prose prose-invert prose-lg max-w-none">
                    {blog.content.split('\n').map((paragraph, idx) =>
                        paragraph.trim()
                            ? <p key={idx} className="mb-6 text-kau-text-secondary leading-relaxed text-lg">{paragraph}</p>
                            : null
                    )}
                </article>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-4 p-6 bg-kau-surface rounded-xl border border-white/5">
                        <div className="w-12 h-12 rounded-full bg-kau-accent flex items-center justify-center text-kau-bg font-bold text-xl shrink-0">
                            {authorInitial}
                        </div>
                        <div>
                            <div className="text-kau-text font-semibold">{authorName}</div>
                            <div className="text-kau-text-secondary text-sm mt-0.5 flex items-center gap-1">
                                <User2 className="w-3 h-3" />
                                {isAdmin ? 'Kautilya Daily Expert' : 'Community Contributor'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
