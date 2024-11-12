"use client"

import HomeHeader from '@/components/Homeheader/HomeHeader'
import React from 'react'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <HomeHeader />
      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <h1>Welcome to PlanoEducation</h1>
          <p>Your AI-powered platform for customized, personalized learning and real-time note-taking.</p>
          <button className={styles.ctaButton}>Get Started</button>
        </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
          <h2>Features Designed to Empower Your Learning Journey</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <h3>Personalized Learning Roadmap</h3>
              <p>AI-curated learning paths tailored to your goals, guiding you through skill mastery.</p>
            </div>
            <div className={styles.feature}>
              <h3>Real-Time Note-Making</h3>
              <p>Seamlessly integrate note-taking with your learning path, organized and accessible.</p>
            </div>
            <div className={styles.feature}>
              <h3>Progress Tracking & Milestones</h3>
              <p>Visual progress trackers that adapt to your pace and celebrate your achievements.</p>
            </div>

          </div>
        </section>

        {/* Infographic Section */}
        <section className={styles.infographicSection}>
          <h2>Why Choose PlanoEducation?</h2>
          <div className={styles.infographic}>
            <div className={styles.infographicItem}>
              <h4>Customized Plans</h4>
              <p>Our AI crafts a unique roadmap based on your strengths and interests.</p>
            </div>
            <div className={styles.infographicItem}>
              <h4>Real-Time Insights</h4>
              <p>Instant recommendations that adapt as you progress and learn.</p>
            </div>
            <div className={styles.infographicItem}>
              <h4>Progress Transparency</h4>
              <p>Get real-time visibility on your learning milestones and achievements.</p>
            </div>
          </div>
        </section>

        {/* Review Section */}
        <section className={styles.reviewSection}>
          <h2>What Our Users Are Saying</h2>
          <div className={styles.reviewCards}>
            <div className={styles.reviewCard}>
              <p>“PlanoEducation has redefined the way I learn. The personalized roadmap is a game changer!”</p>
              <span>- Alex P., Student</span>
            </div>
            <div className={styles.reviewCard}>
              <p>“I love the real-time note-taking feature. It’s perfect for capturing ideas and thoughts seamlessly.”</p>
              <span>- Jamie L., Professional</span>
            </div>
            <div className={styles.reviewCard}>
              <p>“The AI-powered content suggestions keep me engaged and motivated every step of the way.”</p>
              <span>- Taylor M., Developer</span>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className={styles.finalCallToAction}>
          <h2>Join Thousands of Learners</h2>
          <p>Experience a new way to learn, tailored to your goals and interests. Start your journey with PlanoEducation today!</p>
          <button className={styles.startButton}>Sign Up Now</button>
        </section>
      </main>
    </>
  )
}
