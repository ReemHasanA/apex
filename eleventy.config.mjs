import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

export default function (eleventyConfig) {
  // async tailwindcss
  eleventyConfig.on('eleventy.before', async () => {
    const tailwindInputPath = path.resolve('./library/tailwind.css');
    const tailwindOutputPath = './_site/css/tailwind.css';
    const cssContent = fs.readFileSync(tailwindInputPath, 'utf8');
    const outputDir = path.dirname(tailwindOutputPath);
  
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  
    const result = await postcss([tailwindcss()]).process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });
  
    fs.writeFileSync(tailwindOutputPath, result.css);
  });
  // eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  eleventyConfig.addPassthroughCopy({ "public/": "/" }); // copies to site root

  eleventyConfig.addGlobalData("eleventyComputed.dict", () => {
    return (data) => data.i18n?.[data.locale?.code];
  });

  eleventyConfig.addGlobalData("layout", "base.njk"); // under _includes/

  eleventyConfig.addFilter("swapLang", (url, current, target) => {
    const curr = current?.slug || "";   // "" or "ar"
    const next = target?.slug  || "";   // "" or "ar"

    // Remove current locale prefix from the URL (if it’s there)
    let rest = url;
    if (curr && (url === `/${curr}/` || url.startsWith(`/${curr}/`))) {
      rest = url.slice(curr.length + 1); // keep leading "/"
    }

    // Prepend target locale (if any). No double slashes.
    const prefix = next ? `/${next}` : "";
    return prefix + rest.replace('.html',''); // trailing slash is preserved automatically
  });

  return{
    dir: {
      input: "src",
      output: "_site", // builded data
      includes: "_includes", 
      data: "_data" 
    },
    
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"]

  };

};