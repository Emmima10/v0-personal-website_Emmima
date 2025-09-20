export function AboutSection() {
  const interests = [
    { icon: "☕", text: "Coffee" },
    { icon: "📸", text: "Photography" },
    { icon: "✈️", text: "Travel" },
    { icon: "💻", text: "Coding" },
  ]

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">About Me</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - About Text */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate web developer with over 5 years of experience creating digital experiences that make a
              difference. My journey started with a curiosity about how websites work, and it has evolved into a love
              for crafting clean, efficient code and beautiful user interfaces.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or
              mentoring aspiring developers. I believe in the power of collaboration and continuous learning to create
              innovative solutions that solve real-world problems.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My approach combines technical expertise with creative problem-solving, ensuring that every project not
              only functions flawlessly but also provides an exceptional user experience.
            </p>
          </div>

          {/* Right Column - Interests */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground mb-6">What I Enjoy</h3>
            <div className="grid grid-cols-2 gap-4">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-card rounded-lg border border-border hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <span className="text-2xl">{interest.icon}</span>
                  <span className="text-lg font-medium text-card-foreground">{interest.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
              <h4 className="text-lg font-semibold text-foreground mb-2">Fun Fact</h4>
              <p className="text-muted-foreground">
                I've traveled to over 15 countries, and I love incorporating design inspiration from different cultures
                into my work!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
