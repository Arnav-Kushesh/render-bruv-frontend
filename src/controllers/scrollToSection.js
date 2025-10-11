import goTo from "./goTo";

export default function scrollToSection(sectionID) {
  return () => {
    goTo("/")();

    setTimeout(() => {
      //main-scrollable-container
      const papaDiv = document.getElementById(`main-scrollable-container`);
      const targetSection = document.getElementById(`${sectionID}`);

      if (targetSection) {
        papaDiv.scroll({
          top: targetSection.offsetTop - 30,
          behavior: "smooth",
        });
      } else {
        console.log("Section not found!");
      }
    }, 300);
  };
}
