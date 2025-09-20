export function SkillsSection() {
  const skillCategories = [
    {
      category: "Frontend",
      skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript"],
    },
    {
      category: "Design Tools",
      skills: ["Figma", "Photoshop"],
    },
    {
      category: "Other",
      skills: ["WordPress", "Git"],
    },
  ]

  const allSkills = skillCategories.flatMap((cat) => cat.skills)

  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Skills & Technologies</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Here are the technologies and tools I use to bring ideas to life.
          </p>
        </div>

        {/* All Skills Display */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {allSkills.map((skill, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-card text-card-foreground rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105 font-medium shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Categorized Skills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-6 pb-2 border-b-2 border-primary/20">
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="p-3 bg-card rounded-lg border border-border hover:shadow-md transition-all duration-300 hover:scale-105"
                  >
                    <span className="text-card-foreground font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-block p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
            <p className="text-muted-foreground text-lg">
              Always learning and exploring new technologies to stay current with industry trends.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
