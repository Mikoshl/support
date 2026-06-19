const hero = document.querySelector("#hero");
const choices = document.querySelector("#choices");
const answer = document.querySelector("#answer");
const later = document.querySelector("#later");
const startButton = document.querySelector("#start-button");
const choiceCards = document.querySelectorAll(".choice-card");
const notNowButton = document.querySelector("#not-now-button");
const shareButton = document.querySelector("#share-button");
const changeButton = document.querySelector("#change-button");
const backButton = document.querySelector("#back-button");
const selectedAnswer = document.querySelector("#selected-answer");
const shareStatus = document.querySelector("#share-status");

let selectedMessage = "";

function showOnly(section) {
  [hero, choices, answer, later].forEach((item) => {
    item.classList.toggle("is-hidden", item !== section);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

startButton.addEventListener("click", () => showOnly(choices));

choiceCards.forEach((card) => {
  card.addEventListener("click", () => {
    selectedMessage = card.dataset.message;
    selectedAnswer.textContent = card.dataset.title;
    shareStatus.textContent = "";
    showOnly(answer);
  });
});

notNowButton.addEventListener("click", () => showOnly(later));
changeButton.addEventListener("click", () => showOnly(choices));
backButton.addEventListener("click", () => showOnly(choices));

async function shareOrCopy() {
  const shareData = {
    title: "Мой ответ",
    text: selectedMessage,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      shareStatus.textContent = "Сообщение отправлено.";
      return;
    }

    await navigator.clipboard.writeText(selectedMessage);
    shareStatus.textContent = "Скопировано. Осталось отправить в наш чат.";
    shareButton.textContent = "Скопировано ✓";
  } catch (error) {
    if (error?.name !== "AbortError") {
      shareStatus.textContent = "Не получилось скопировать. Можно просто написать: «пойдём гулять».";
    }
  }
}

shareButton.addEventListener("click", shareOrCopy);
