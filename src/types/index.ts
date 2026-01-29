export interface SectionStyle {
    bg?: string;
    text?: string;
    fontSize?: string;
    fontFamily?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    [key: string]: any;
}

export interface Theme {
    id: string;
    name: string;
    is_active: boolean;
    hero_section: SectionStyle;
    about_section: SectionStyle;
    skills_section: SectionStyle;
    blogs_section: SectionStyle;
    footer_section: SectionStyle;
    socials_section: SectionStyle;
    created_at: string;
    updated_at: string;
}

export interface HeroData {
    title: string;
    subtitle: string;
    ctaText?: string;
    ctaLink?: string;
}

export interface AboutData {
    bio: string;
    avatarUrl?: string;
    // skills are now in their own section in Data table
}

export interface SocialLink {
    title: string;
    url: string;
}

export type SocialsData = SocialLink[];

export interface Skill {
    title: string;
    score: number; // 0-100
}

export type SkillsData = Skill[];

export interface Data {
    id: string;
    hero: HeroData;
    about: AboutData;
    socials: SocialsData;
    skills: string[];
    seo: Record<string, any>;
    footer: { text: string };
    created_at: string;
    updated_at: string;
}

export interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image_url: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
    published_at: string;
}
