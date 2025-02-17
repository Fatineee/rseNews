"use client";

import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import CourseCard from "@/components/course-card";
import axios from "axios";

export function OtherCourses() {
  interface Article {
    image: string;
    link: string;
    title: string;
  }
  
  const [news, setNews] = useState<Article[]>([]);
  const [displayedArticles, setDisplayedArticles] = useState(12); // Initial number of articles to display
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/news");
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  // Handle loading more articles
  const loadMoreArticles = () => {
    setDisplayedArticles((prev) => prev + 8); // Load 8 more articles each time
  };

  return (
    <section className="pb-20 px-8">
      <div className="container mx-auto mb-20 text-center">
        {/* Ajout d'une police personnalisée pour le titre */}
        <Typography
          variant="h2"
          color="blue-gray"
          className="mb-4 font-bold font-roboto" // Utilisation de font-roboto
          style={{ fontFamily: "'Roboto', sans-serif" }} // Forcer la police Roboto
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
          placeholder=""
        >
          News
        </Typography>
        {/* Ajout d'une police personnalisée pour le sous-titre */}
        <Typography
          variant="lead"
          className="mx-auto w-full px-4 font-normal !text-gray-500 lg:w-6/12 font-roboto" // Utilisation de font-roboto
          style={{ fontFamily: "'Roboto', sans-serif" }} // Forcer la police Roboto
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          Explore the latest RSE news and trends from trusted sources.
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-4">
        {news.length > 0 ? (
          news.slice(0, displayedArticles).map((article, idx) => (
            <CourseCard
              key={idx}
              img={article.image}
              title={
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-gray-900 hover:text-gray-700 font-roboto" // Utilisation de font-roboto
            style={{ fontFamily: "'Roboto', sans-serif" }} // Forcer la police Roboto
          >
            {article.title}
          </a>
              }
              desc=""
              buttonLabel="Read More"
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full font-roboto" style={{ fontFamily: "'Roboto', sans-serif" }}>
            Loading...
          </p>
        )}
      </div>
      {news.length > displayedArticles && (
        <div className="text-center mt-10">
          <button
            onClick={loadMoreArticles}
            className="px-6 py-2 text-white bg-black rounded-full hover:bg-gray-800 transition font-roboto" // Utilisation de font-roboto
            style={{ fontFamily: "'Roboto', sans-serif" }} // Forcer la police Roboto
            disabled={loading} // Désactiver le bouton pendant le chargement
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </section>
  );
}

export default OtherCourses;