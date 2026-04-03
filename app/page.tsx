import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: "📐",
      title: "Linear Algebra",
      description:
        "Visualize multidimensional vectors and matrix transformations in interactive 3D space.",
      bgColor: "rgba(99, 102, 241, 0.1)",
      borderColor: "rgba(99, 102, 241, 0.2)",
      shadowColor: "rgba(99,102,241,0.2)",
    },
    {
      icon: "📉",
      title: "Calculus",
      description:
        "Explore gradient descent, optimization, and neural backpropagation through live derivations.",
      bgColor: "rgba(56, 189, 248, 0.1)",
      borderColor: "rgba(56, 189, 248, 0.2)",
      shadowColor: "rgba(56,189,248,0.2)",
    },
    {
      icon: "🎲",
      title: "Probability & Statistics",
      description:
        "Demystify the math of uncertainty, distributions, and model evaluation with interactive examples.",
      bgColor: "rgba(245, 158, 11, 0.1)",
      borderColor: "rgba(245, 158, 11, 0.2)",
      shadowColor: "rgba(245,158,11,0.2)",
    },
  ];
  return (
    <main
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "2rem",
      }}
    >
      {/* Background Ambient Glows */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <div
          className="bg-glow-orb"
          style={{
            top: "-15%",
            left: "-10%",
            width: "60vw",
            height: "60vw",
            background: "var(--primary-glow)",
          }}
        />
        <div
          className="bg-glow-orb"
          style={{
            bottom: "-15%",
            right: "-10%",
            width: "60vw",
            height: "60vw",
            background: "rgba(14, 165, 233, 0.15)", // sky-500 glow
            animationDelay: "-4s",
          }}
        />
      </div>

      {/* Hero Content */}
      <div
        className="container flex-col flex-center animate-fade-in"
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          maxWidth: "900px",
        }}
      >
        {/* Badge */}
        <div
          className="glass"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.5rem 1.25rem",
            borderRadius: "2rem",
            color: "var(--indigo-300)",
            fontSize: "0.65rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            marginBottom: "2.5rem",
          }}
        >
          <span
            style={{
              position: "relative",
              display: "flex",
              height: "8px",
              width: "8px",
            }}
          >
            <span
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                borderRadius: "50%",
                background: "var(--indigo-400)",
                opacity: 0.75,
                animation:
                  "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            ></span>
            <span
              style={{
                position: "relative",
                display: "inline-flex",
                borderRadius: "50%",
                height: "8px",
                width: "8px",
                background: "var(--indigo-500)",
              }}
            ></span>
          </span>
          Next-Gen Math Platform
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            marginBottom: "2rem",
          }}
        >
          Master Math for <br />
          <span className="text-gradient">Intelligence.</span>
        </h1>

        <p
          className="text-gradient-subtle delay-1 animate-fade-in"
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
            lineHeight: 1.6,
            maxWidth: "680px",
            marginBottom: "3.5rem",
            fontWeight: 500,
          }}
        >
          An interactive platform to visualize, code, and truly understand the
          mathematics powering the modern AI revolution. No installation
          required.
        </p>

        {/* CTA Buttons */}
        <div
          className="delay-2 animate-fade-in"
          style={{
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/learn" className="btn-primary">
            Begin Journey
          </Link>
          <Link href="/playground" className="btn-secondary">
            Interactive Sandbox
          </Link>
        </div>

        {/* Feature Grid */}
        <div
          className="feature-grid delay-3 animate-fade-in"
          style={{ marginTop: "7rem", textAlign: "left" }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card"
              style={{ padding: "2.5rem", borderRadius: "2rem" }}
            >
              <div
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "1rem",
                  background: feature.bgColor,
                  border: `1px solid ${feature.borderColor}`,
                  fontSize: "1.5rem",
                  marginBottom: "1.5rem",
                  boxShadow: `inset 0 2px 10px ${feature.shadowColor}`,
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  marginBottom: "0.75rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <footer
        style={{
          marginTop: "6rem",
          paddingBottom: "2rem",
          color: "var(--text-muted)",
          fontSize: "0.65rem",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          opacity: 0.5,
        }}
      >
        Mathbox — Architected for Deep Understanding.
      </footer>
    </main>
  );
}
