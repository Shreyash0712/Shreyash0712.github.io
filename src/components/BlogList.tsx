import type { Blog, SectionStyle } from '../types';

interface BlogListProps {
    blogs: Blog[];
    styles?: SectionStyle;
}

export const BlogList = ({ blogs, styles }: BlogListProps) => {
    return (
        <section id="blogs" style={{
            backgroundColor: styles?.bg,
            color: styles?.text,
            fontFamily: styles?.fontFamily,
            textAlign: styles?.textAlign,
            padding: '4rem 2rem',
            ...styles
        }}>
            <h2>Latest Posts</h2>
            <div className="grid">
                {blogs.length === 0 ? (
                    <p>No blogs published yet.</p>
                ) : (
                    blogs.map((blog) => (
                        <article key={blog.id} className="card" style={{
                            backgroundColor: styles?.cardBg || 'rgba(255,255,255,0.1)',
                            padding: '1.5rem',
                            borderRadius: '8px'
                        }}>
                            <h3>{blog.title}</h3>
                            <p>{blog.excerpt}</p>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
};
