document.addEventListener("DOMContentLoaded", () => {
  fetch('source/data/articles.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("categories-container");

      for (const key in data) {
        const category = data[key];

        const section = document.createElement("section");
        section.classList.add("category-block");

        const heading = document.createElement("h2");

        const icon = document.createElement("span");
        icon.classList.add("toggle-icon");
        icon.textContent = "▶";
        heading.appendChild(icon);

        const text = document.createTextNode(" " + category.title);
        heading.appendChild(text);
        section.appendChild(heading);

        const ul = document.createElement("ul");
        category.articles.forEach(article => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          if (article.subdir) {
            a.href = `source/articles/${encodeURIComponent(key)}/${encodeURIComponent(article.subdir)}/${encodeURIComponent(article.filename)}`;
          } else {
            a.href = `source/articles/${encodeURIComponent(key)}/${encodeURIComponent(article.filename)}`;
          }
          a.textContent = article.title;
          li.appendChild(a);
          ul.appendChild(li);
        });

        section.appendChild(ul);
        container.appendChild(section);

        heading.addEventListener("click", () => {
          const allSections = document.querySelectorAll(".category-block");

          allSections.forEach(otherSection => {
            const otherUl = otherSection.querySelector("ul");
            const otherIcon = otherSection.querySelector(".toggle-icon");

            if (otherSection !== section && otherSection.classList.contains("open")) {
              otherSection.classList.remove("open");
              if (otherIcon) otherIcon.textContent = "▶";
            }
          });

          const isOpen = section.classList.toggle("open");
          icon.textContent = isOpen ? "▼" : "▶";
        });
      }
    })
    .catch(error => {
      console.error("JSONの読み込みに失敗:", error);
    });
});
