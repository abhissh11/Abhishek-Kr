export const skills = [
    { name: "TypeScript", icon: "SiTypescript", category: "Core Engineering" },
    { name: "Python", icon: "SiPython", category: "Core Engineering" },
    { name: "HTML", icon: "SiHtml5", category: "Core Engineering" },
    { name: "React.js", icon: "FaReact", category: "Core Engineering" },
    { name: "Next.js", icon: "SiNextdotjs", category: "Core Engineering" },
    { name: "Node.js", icon: "FaNodeJs", category: "Core Engineering" },
    { name: "Express.js", icon: "SiExpress", category: "Core Engineering" },
    { name: "FastAPI", icon: "SiFastapi", category: "Core Engineering" },
    { name: "Tailwind CSS", icon: "SiTailwindcss", category: "Core Engineering" },
    { name: "shadcn/ui", icon: "SiShadcnui", category: "Core Engineering" },

    { name: "MongoDB", icon: "SiMongodb", category: "Databases & Cloud" },
    { name: "PostgreSQL", icon: "SiPostgresql", category: "Databases & Cloud" },
    { name: "MySQL", icon: "SiMysql", category: "Databases & Cloud" },
    { name: "Prisma", icon: "SiPrisma", category: "Databases & Cloud" },
    { name: "Redis", icon: "SiRedis", category: "Databases & Cloud" },
    { name: "Docker", icon: "FaDocker", category: "Databases & Cloud" },
    { name: "Lambda, S3 & RDS", icon: "FaAws", category: "Databases & Cloud" },

    { name: "Cursor", icon: "TbBrandVscode", category: "Tools & AI" },
    { name: "Copilot", icon: "TbBrandGithubCopilot", category: "Tools & AI" },
    { name: "Claude", icon: "BsClaude", category: "Tools & AI" },
    { name: "GitHub Actions", icon: "SiGithubactions", category: "Tools & AI" },
]

export const skillCategories = [
    {
        title: "Tools & AI",
        description: "The AI & tools I build with",
        color: "border-orange-500/30",
        skills: skills.filter(s => s.category === "Tools & AI")
    },
    {
        title: "Databases & Cloud",
        description: "Where the data lives and scales",
        color: "border-cyan-500/30",
        skills: skills.filter(s => s.category === "Databases & Cloud")
    },
    {
        title: "Core Engineering",
        description: "The foundation it runs on",
        color: "border-emerald-500/30",
        skills: skills.filter(s => s.category === "Core Engineering")
    }
]

export const workData = [
    {
        title: "Calqus - AI-powered Learning",
        description: "Calqus is an AI-powered learning platform that helps students learn new skills and concepts with ease.",
        image: "/images/calqus.png",
        link: "https://calqus.com"
    },
    {
        title: "Psychemasters - Mental Health Platform",
        description: "Psychemasters is an AI-powered mental health platform that provides online therapy and mental health resources to users.",
        image: "/images/psychemaster.png",
        link: "https://psychemasterindia.in"
    },
    {
        title: "GoTribe - Events",
        description: "GoTribe is an events platform where users can find and attend events happening around them.",
        image: "/images/gotribe.png",
        link: "https://github.com/abhissh11"
    },
    {
        title: "MagicSlides - Presentation Maker",
        description: "MagicSlides is an online presentation maker that helps you create beautiful and professional presentations with ease.",
        image: "/images/gotribe.png",
        link: "https://github.com/abhissh11"
    },
]