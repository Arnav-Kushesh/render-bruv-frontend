import goTo from "./goTo";

export default function scrollToSection(sectionID) {
  return () => {
    goTo("/")();

    setTimeout(() => {
      const papaDiv = document.body;
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
