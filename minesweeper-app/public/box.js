import { getAllNeighbors, openAllBombs } from "./matrix";

const body = document.getElementsByTagName("body")[0];
const container = document.createElement("div");
container.classList.add("container");
body.appendChild(container);

class Box {
  constructor(isBomb, coordinates) {
    this.isBomb = isBomb;
    this.coordinates = coordinates;
  }

  setBoxValue(value) {
    this.value = value;
  }

  setBoxType() {
    if (this.isBomb) {
      this.setBoxValue("q");
      return;
    }
    const allNeighbors = getAllNeighbors(this.coordinates);
    let bombCount = 0;

    allNeighbors.forEach((neighbor) => {
      if (neighbor === 1 || neighbor.isBomb) {
        bombCount++;
      }
    });

    if (bombCount) {
      this.setBoxValue(bombCount);
    }
  }

  showBoxValue() {
    this.boxElem.innerHTML = this.value || "";
  }

  setFlag(isFlagged) {
    this.isFlagged = isFlagged;
    this.boxElem.classList.toggle("flag");
  }

  open() {
    this.isOpenned = true;
    this.boxElem.classList.remove("hidden");
  }

  onBoxClick(isOpenNumber = false) {
    if (
      !this.value &&
      !this.isOpenned &&
      !this.boxElem.classList.contains("flag")
    ) {
      this.open();
      const allNeighbors = getAllNeighbors(this.coordinates);

      allNeighbors.forEach((neighbor) => {
        if (!neighbor.isOpenned) {
          neighbor.onBoxClick(true);
        }
      });
    } else if (
      (this.value && isOpenNumber) ||
      (typeof this.value === "number" &&
        !this.boxElem.classList.contains("flag"))
    ) {
      this.open();
    } else if (this.isBomb) {
      openAllBombs();
    }
    this.showBoxValue();
  }

  createBoxOnArea() {
    const boxElem = document.createElement("div");
    boxElem.classList.add("box");
    boxElem.classList.add("hidden");
    if (this.value) {
      boxElem.classList.add(`bomb-count-${this.value}`);
    }
    if (this.value === "q") {
      boxElem.classList.add("bomb-box");
    }
    this.boxElem = boxElem;
    this.boxElem.addEventListener("click", () => this.onBoxClick());
    this.boxElem.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (boxElem.classList.contains("hidden")) {
        this.setFlag();
      }
    });
    container.appendChild(boxElem);
  }
}

export function createBox(isBomb, coordinates) {
  const newBox = new Box(isBomb, coordinates);

  newBox.setBoxType();
  newBox.createBoxOnArea();

  return newBox;
}
