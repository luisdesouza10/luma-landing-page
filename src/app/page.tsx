import { content } from "@/data/content";
import { Categories } from "@/components/sections/Categories";
import { Contact } from "@/components/sections/Contact";
import { FeaturedCourse } from "@/components/sections/FeaturedCourse";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MeetPeople } from "@/components/sections/MeetPeople";
import { Testimonial } from "@/components/sections/Testimonial";

export default function Home() {
  return (
    <>
      <Header brandName={content.brand.name} nav={content.nav} actions={content.headerActions} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero content={content.hero} />
        <Categories content={content.categories} />
        <FeaturedCourse content={content.featuredCourse} />
        <HowItWorks content={content.howItWorks} />
        <Testimonial content={content.testimonial} />
        <MeetPeople content={content.people} />
        <Contact content={content.contact} />
        <FinalCta content={content.finalCta} />
      </main>
      <Footer brand={content.brand} content={content.footer} />
    </>
  );
}
