import * as fs from "fs";
import * as path from "path";
import { JSDOM } from "jsdom"; 
import { startTyping, stopClicking } from "../actions"; 
import { play } from "../play";

jest.mock("../actions", () => ({
  startTyping: jest.fn(),
  stopClicking: jest.fn(),
}));

const html = fs.readFileSync(
  path.resolve(__dirname, "../../index.html"),
  "utf8"
);

let dom;
let container: Document;
describe("Play/Pause Button", () => {
  let startButton: HTMLElement;
  let startIcon: HTMLElement;
  let statusCircle: HTMLElement;

  function setupDOM() {
    dom = new JSDOM(html);
    container = dom.window.document;
    startButton = container.getElementById("play-btn") as HTMLElement;
    startIcon = container.getElementById("play-icon") as HTMLElement;
    statusCircle = container.getElementById("status-circle") as HTMLElement;
  
  }
  beforeEach(() => {
    setupDOM();
    jest.spyOn(startButton, "addEventListener");

    startButton.addEventListener("click", () => play(startIcon, statusCircle));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("play button exists", () => {

    expect(startButton).not.toBeNull();

  });

  it("executes play() when clicked", () => {
    startButton.click();

    expect(startButton.addEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function)
    );
  });

  it("on first click executes startTyping, on second stopClicking", () => {
    startButton.click();
    expect(startTyping).toHaveBeenCalled();

    startButton.click();
    expect(stopClicking).toHaveBeenCalled();
  });
});
