import Link from 'next/link'

const experiments = [
  {
    title: "DramaQuest Chronicles",
    url: "https://drama-quest-chronicles.lovable.app",
    description: "Interactive storytelling platform. Explore narrative-driven quests and make choices that shape your journey."
  },
  {
    title: "Frameaway",
    url: "https://v0-travel-photographer-app.vercel.app/",
    description: "Book local professional photographers for your vacation. Get stunning travel photos and social-ready reels delivered digitally."
  },
  {
    title: "ExpertLink",
    url: "https://v0-founder-expert-platform.vercel.app/",
    description: "Connect with verified startup advisors for 30-minute consultations. Get fundraising advice and domain expertise from practitioners who've been there."
  },
  {
    title: "Parent Playbook",
    url: "https://v0-parent-playbook-app.vercel.app/",
    description: "Calm and confident parenting toolkit. Evidence-based strategies and practical guidance for modern parents."
  },
  {
    title: "Monday",
    url: "https://v0-mental-well-being-app-one.vercel.app/",
    description: "Mental well-being made easy. Daily practices and tools to support your emotional health journey."
  },
  {
    title: "BabyHub",
    url: "https://v0-family-sharing-app.vercel.app/",
    description: "Family parenting app for shared moments. Track milestones, share photos, and stay connected with your growing family."
  }
]

export default function Experiments() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        
        <Link href="/" className="inline-block mb-12 text-white/40 hover:text-white transition-colors duration-300">
          ← Back
        </Link>

        <header className="mb-16">
          <h1 className="text-5xl font-light mb-6 tracking-tight">
            Experiments
          </h1>
          <div className="h-px w-16 bg-gradient-to-r from-white/30 to-transparent mb-6"></div>
          <p className="text-white/60 font-light text-lg">
            Side projects and explorations. Ideas turned into prototypes.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {experiments.map((experiment, index) => (
            <a
              key={index}
              href={experiment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative overflow-hidden rounded-none border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-all duration-500 hover:border-white/20 h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl"></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-light tracking-wide group-hover:text-white transition-colors">
                      {experiment.title}
                    </h2>
                    <svg 
                      className="w-5 h-5 text-white/40 group-hover:text-white transition-all group-hover:translate-x-1 group-hover:-translate-y-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  
                  <p className="text-white/50 font-light leading-relaxed">
                    {experiment.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </main>
  )
}
