document.addEventListener("DOMContentLoaded", function () {
  let basePath = "";
  let indexLinkPath = "";

  if (location.pathname.includes("/source/articles/")) {
    basePath = "../../../";
    indexLinkPath = "../../../../index.html";
  } else if (location.pathname.includes("/source/info/")) {
    basePath = "../";
    indexLinkPath = "../../index.html";
  } else {
    basePath = "source/";
    indexLinkPath = "./index.html";
  }

  fetch(`${basePath}includes/header.html`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("header-container").innerHTML = data;

      const headerLink = document.querySelector(".header-link");
      if (headerLink) {
        headerLink.href = indexLinkPath;
      }
    })
    .catch(err => console.error("ヘッダー読み込み失敗:", err));

  fetch(`${basePath}includes/footer.html`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch(err => console.error("フッター読み込み失敗:", err));
});
