import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Calendar, Share2, Heart, Bookmark } from 'lucide-react';
import { API_ENDPOINTS } from '@/config/api';
// import { motion } from 'framer-motion';

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
    tags?: string[];
}

interface BlogDetailPageProps {
    blogId: string;
    onBack: () => void;
}

export function BlogDetailPage({ blogId, onBack }: BlogDetailPageProps) {
    const [blog, setBlog] = useState<Blog | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.blogs.byId(blogId));
                if (response.ok) {
                    const data = await response.json();
                    setBlog(data);
                }
            } catch (error) {
                console.error('Failed to fetch blog details', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (blogId) {
            fetchBlog();
        }
    }, [blogId]);

    if (isLoading) {
        return <div className="min-h-screen pt-24 flex justify-center text-kau-text-secondary">Loading story...</div>;
    }

    if (!blog) {
        return (
            <div className="min-h-screen pt-24 text-center ">
                <h2 className="text-xl text-kau-text mb-4">Story not found.</h2>
                <button onClick={onBack} className="text-kau-accent hover:underline">Back to Blogs</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-kau-bg pb-20">
            {/* Header / Hero */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-kau-surface">
                    {/* Placeholder for Hero Image */}
                    {blog.image ? (
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-kau-surface to-kau-bg flex items-center justify-center text-white/5 font-heading text-9xl font-bold select-none">
                            KD
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-kau-bg via-kau-bg/50 to-transparent" />
                </div>

                <div className="absolute top-0 left-0 p-6 md:p-8 z-20">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Experiences
                    </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-5xl mx-auto z-20">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-kau-accent uppercase bg-kau-accent/10 border border-kau-accent/20 rounded-full">
                        {blog.author.role === 'admin' ? 'Curated Analysis' : 'Community Story'}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-kau-accent flex items-center justify-center text-kau-bg font-bold text-lg">
                                {blog.author.firstName.charAt(0)}
                            </div>
                            <div>
                                <span className="block text-white font-medium">Written By</span>
                                <span className="text-kau-text-secondary">{blog.author.firstName} {blog.author.lastName}</span>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="flex flex-col">
                            <span className="block text-white font-medium">Published On</span>
                            <span className="text-kau-text-secondary flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="flex flex-col">
                            <span className="block text-white font-medium">Read Time</span>
                            <span className="text-kau-text-secondary flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                5 min read
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <article className="max-w-3xl mx-auto px-6 md:px-0 mt-12">
                <div className="prose prose-invert prose-lg max-w-none text-kau-text-secondary leading-relaxed">
                    {/* Split content by newlines for basic paragraph formatting since we don't have a rich text renderer yet */}
                    {blog.content.split('\n').map((paragraph, idx) => (
                        paragraph.trim() && <p key={idx} className="mb-6">{paragraph}</p>
                    ))}
                </div>

                {/* Footer Controls */}
                <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center text-kau-text-secondary">
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 hover:text-kau-accent transition-colors">
                            <Heart className="w-5 h-5" /> 24 Likes
                        </button>
                        <button className="flex items-center gap-2 hover:text-kau-accent transition-colors">
                            <Share2 className="w-5 h-5" /> Share
                        </button>
                    </div>
                    <button className="flex items-center gap-2 hover:text-kau-accent transition-colors">
                        <Bookmark className="w-5 h-5" /> Save
                    </button>
                </div>
            </article>
        </div>
    );
}
