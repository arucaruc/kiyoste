document.addEventListener("DOMContentLoaded", function () {
  let basePath = "";
  let linkPrefix = "";

  const path = location.pathname;

  if (path.includes("/source/articles/")) {
    basePath = "../../../source/includes/";
    linkPrefix = "../../../source/info/";
  } else if (path.includes("/source/info/")) {
    basePath = "../includes/";
    linkPrefix = "../info/";
  } else {
    basePath = "source/includes/";
    linkPrefix = "source/info/";
  }

  fetch(basePath + "footer.html")
    .then(res => res.text())
    .then(data => {
      // href="source/info/" → href="〇〇/〇〇/info/"
      const adjustedHTML = data.replace(/href="source\/info\//g, `href="${linkPrefix}`);
      document.getElementById("footer").innerHTML = adjustedHTML;

      // 同一ページでのリンククリックはリロードにする
      const links = document.querySelectorAll('#footer a');

      links.forEach(link => {
        const currentURL = location.href.split('#')[0];
        const linkURL = new URL(link.href, location.origin).href;

        if (linkURL === currentURL) {
          link.addEventListener('click', function (e) {
            e.preventDefault();
            location.reload();
          });
        }
      });
    })
    .catch(err => console.error("フッター読み込み失敗:", err));
});
