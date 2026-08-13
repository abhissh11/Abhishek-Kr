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

export function calculateDuration(startDateStr: string, endDateStr: string): string {
    const monthsMap: Record<string, number> = {
        jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
        jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
    };

    const parseDate = (str: string) => {
        if (!str || str.trim().toLowerCase() === "present") {
            const now = new Date();
            return { year: now.getFullYear(), month: now.getMonth() };
        }
        const parts = str.trim().split(/\s+/);
        const mStr = parts[0]?.substring(0, 3).toLowerCase();
        const m = monthsMap[mStr] !== undefined ? monthsMap[mStr] : 0;
        const y = parseInt(parts[1] || `${new Date().getFullYear()}`, 10);
        return { year: y, month: m };
    };

    const start = parseDate(startDateStr);
    const end = parseDate(endDateStr);

    const totalMonths = (end.year - start.year) * 12 + (end.month - start.month) + 1;
    const validMonths = Math.max(1, totalMonths);

    if (validMonths < 12) {
        return `${validMonths} mo${validMonths > 1 ? "s" : ""}`;
    }

    const yrs = Math.floor(validMonths / 12);
    const mos = validMonths % 12;

    if (mos === 0) {
        return `${yrs} yr${yrs > 1 ? "s" : ""}`;
    }
    return `${yrs} yr${yrs > 1 ? "s" : ""} ${mos} mo${mos > 1 ? "s" : ""}`;
}

export function formatExperienceDate(startDateStr: string, endDateStr: string): string {
    if (!startDateStr) return "";
    const duration = calculateDuration(startDateStr, endDateStr);
    const displayEnd = !endDateStr || endDateStr.trim().toLowerCase() === "present" ? "Present" : endDateStr;
    return `${startDateStr} – ${displayEnd} · ${duration}`;
}

export const experiences = [
    {
        company: "Wissenhive",
        role: "Software Engineer",
        jobType: "Full-time",
        startDate: "Jan 2026",
        endDate: "Present",
        roleTag: "SOFTWARE ENGINEER",
        logoImage: "/images/wissenhive.jpeg",
        logoBg: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
        logoIcon: "W",
        description: "Delivered 20+ production LMS modules using Next.js, Express, and MongoDB. Hardened platform security with JWT auth, custom rate limiting, and RBAC. Architected an async notification system using BullMQ and Node.js workers processing 100K+ alerts without API latency. Established structured code review standards reducing post-release bugs by 10% and collaborated with QA to resolve defects 20% faster.",
        stats: [
            { value: "100K+", label: "ALERTS PROCESSED" },
            { value: "20+", label: "LMS MODULES SHIPPED" },
            { value: "20%", label: "DEFECT RESOLUTION SPEED" },
            { value: "99.9%", label: "SYSTEM UPTIME" }
        ]
    },
    {
        company: "Yodha Foods",
        role: "Full Stack Developer Intern",
        jobType: "Internship",
        startDate: "Oct 2025",
        endDate: "Dec 2025",
        roleTag: "FULL STACK DEVELOPER",
        logoImage: "/images/yodhafoods.png",
        logoBg: "bg-gradient-to-br from-orange-500 via-amber-500 to-red-500",
        logoIcon: "Y",
        description: "Built a production MERN e-commerce platform for 1,000+ active users with Razorpay checkout and real-time inventory sync that cut stock discrepancies by 25%. Implemented secure JWT auth and RBAC portals. Optimized Next.js (TypeScript) SSR and caching to boost page load speed by 35%, while engineering Express/MongoDB APIs with Zod schema validation that reduced runtime errors by 50%+.",
        stats: [
            { value: "1,000+", label: "ACTIVE USERS" },
            { value: "35%", label: "PAGE SPEED BOOST" },
            { value: "50%+", label: "RUNTIME ERROR REDUCTION" },
            { value: "25%", label: "INVENTORY ACCURACY" }
        ]
    },
    {
        company: "Psychemasters",
        role: "Software Engineer",
        jobType: "Contract",
        startDate: "Aug 2025",
        endDate: "Oct 2025",
        roleTag: "SOFTWARE ENGINEER",
        logoImage: "/images/psychemaster.png",
        logoBg: "bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600",
        logoIcon: "P",
        description: "Architected and built the full-stack mental health platform (psychemasterindia.in) from scratch using Next.js, Node.js, and MongoDB. Designed an end-to-end therapy booking system, automated appointment scheduling, and confidential client-therapist portals. Optimized MongoDB queries and indexing to improve response times by 40%, while engineering responsive, SEO-friendly UI components with 95+ Lighthouse scores.",
        stats: [
            { value: "95+", label: "LIGHTHOUSE SCORE" },
            { value: "40%", label: "QUERY LATENCY REDUCTION" },
            { value: "100%", label: "FULL-STACK PLATFORM BUILT" },
            { value: "24/7", label: "AUTOMATED SCHEDULING" }
        ]
    }
];