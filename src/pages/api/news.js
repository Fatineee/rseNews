import axios from "axios";
import * as cheerio from "cheerio";

const sources = [
  { name: "Ouest France", url: "https://www.ouest-france.fr/economie/entreprises/rse/", articleSelector: ".article", titleSelector: "h2", linkSelector: "a", imageSelector: "img" },
  { name: "Carenews", url: "https://www.carenews.com/rse", articleSelector: ".article", titleSelector: "h2", linkSelector: "a", imageSelector: "img" },
  { name: "Novethic", url: "https://www.novethic.fr/", articleSelector: ".news-item", titleSelector: ".news-title", linkSelector: "a", imageSelector: "img" },
  { name: "Mediatico", url: "https://mediatico.fr/category/actualite/", articleSelector: ".post", titleSelector: ".entry-title", linkSelector: "a", imageSelector: ".post-thumbnail img" },
  { name: "Green IT", url: "https://www.greenit.fr/", articleSelector: ".news-item", titleSelector: ".news-title", linkSelector: "a", imageSelector: "img" },
  { name: "L'Info Durable", url: "https://www.linfodurable.fr/aujourdhui/actualites", articleSelector: ".news-item", titleSelector: ".news-title", linkSelector: "a", imageSelector: "img" },
  { name: "YouMatter", url: "https://youmatter.world/fr/tous-les-articles/", articleSelector: ".post", titleSelector: "h2", linkSelector: "a", imageSelector: "img" },
  { name: "Reporterre", url: "https://reporterre.net/Toute-l-information", articleSelector: ".news-item", titleSelector: "h3", linkSelector: "a", imageSelector: "img" },
  { name: "RSE Magazine", url: "https://www.rse-magazine.com/rse/", articleSelector: ".post", titleSelector: ".post-title", linkSelector: "a", imageSelector: ".post-image img" },
  { name: "Agence Déclic", url: "https://www.agence-declic.fr/categories/actualite-article-rse/", articleSelector: ".news-item", titleSelector: "h3", linkSelector: "a", imageSelector: "img" },
  { name: "RSE Data News", url: "https://www.rsedatanews.net/", articleSelector: ".news-item", titleSelector: ".news-title", linkSelector: "a", imageSelector: "img" },
  { name: "Innovation24", url: "https://www.innovation24.news/category/rse/", articleSelector: ".post", titleSelector: ".entry-title", linkSelector: "a", imageSelector: "img" },
  { name: "RSE Web", url: "https://www.rse-web.it/en/news/", articleSelector: ".post", titleSelector: ".post-title", linkSelector: "a", imageSelector: ".post-image img" },
  { name: "Ross Engineering", url: "https://www.ross-eng.com/news/", articleSelector: ".news-item", titleSelector: ".news-title", linkSelector: "a", imageSelector: "img" }
];

async function scrapeWebsite(site) {
  try {
    /* const https = require("https");
    const agent = new https.Agent({ rejectUnauthorized: false });
    const { data } = await axios.get(site.url, { httpsAgent: agent }); */
    const userAgents = [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
    ];
    
    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
    
    const { data } = await axios.get(site.url, {
      headers: {
        "User-Agent": randomUserAgent,
        "Referer": site.url
      }
    });
    
    
    const $ = cheerio.load(data);
    let articles = [];

    $(site.articleSelector).each((index, element) => {
      const title = $(element).find(site.titleSelector).text().trim();
      let link = $(element).find(site.linkSelector).attr("href");
      let image = $(element).find(site.imageSelector).attr("src");

      // Convert relative links to absolute
      if (link && !link.startsWith("http")) {
        link = new URL(link, site.url).href;
      }
      if (image && !image.startsWith("http")) {
        image = new URL(image, site.url).href;
      }

      if (title && link) {
        articles.push({ source: site.name, title, link, image });
      }
    });

    return { source: site.name, articles };
  } catch (error) {
    console.error('❌ Error scraping ${site.name}:', error.message);
    return { source: site.name, articles: [] }; // Return empty data if error
  }
}

export default async function handler(req, res) {
  const results = await Promise.all(sources.map(scrapeWebsite));

  // Flatten results to a single array of articles
  const allArticles = results.flatMap(site => site.articles);

  res.status(200).json(allArticles);
}