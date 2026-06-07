export class SplitText {
  elements: HTMLElement[] = [];
  words: HTMLElement[] = [];
  chars: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  originalHTMLs: Map<HTMLElement, string> = new Map();

  constructor(
    target: string | HTMLElement | (string | HTMLElement)[],
    options: { type?: string; linesClass?: string } = {}
  ) {
    // 1. Resolve targets
    const resolvedTargets: HTMLElement[] = [];
    if (Array.isArray(target)) {
      target.forEach((t) => resolvedTargets.push(...this.resolveTarget(t)));
    } else {
      resolvedTargets.push(...this.resolveTarget(target));
    }
    this.elements = resolvedTargets;

    // 2. Backup original HTML
    this.elements.forEach((el) => {
      this.originalHTMLs.set(el, el.innerHTML);
    });

    const types = options.type || "words";
    const linesClass = options.linesClass || "split-line";

    this.elements.forEach((el) => {
      this.splitElement(el, types, linesClass);
    });
  }

  private resolveTarget(target: string | HTMLElement): HTMLElement[] {
    if (typeof target === "string") {
      return Array.from(document.querySelectorAll(target));
    } else if (target instanceof HTMLElement) {
      return [target];
    }
    return [];
  }

  private splitElement(el: HTMLElement, types: string, linesClass: string) {
    const text = el.textContent || "";
    el.innerHTML = ""; // Clear original content

    const words = text.split(/\s+/).filter(Boolean);
    const wordSpans: HTMLElement[] = [];
    const charSpans: HTMLElement[] = [];

    // Create wrapper spans for words and characters
    words.forEach((wordText, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";

      if (types.includes("chars")) {
        // Split word into characters
        Array.from(wordText).forEach((char) => {
          const charSpan = document.createElement("span");
          charSpan.style.display = "inline-block";
          charSpan.textContent = char;
          wordSpan.appendChild(charSpan);
          charSpans.push(charSpan);
          this.chars.push(charSpan);
        });
      } else {
        wordSpan.textContent = wordText;
      }

      wordSpans.push(wordSpan);
      this.words.push(wordSpan);

      el.appendChild(wordSpan);
      if (wordIndex < words.length - 1) {
        el.appendChild(document.createTextNode(" "));
      }
    });

    // If lines are requested, group elements by offsetTop
    if (types.includes("lines")) {
      const linesMap = new Map<number, HTMLElement[]>();
      wordSpans.forEach((w) => {
        const top = w.offsetTop;
        if (!linesMap.has(top)) {
          linesMap.set(top, []);
        }
        linesMap.get(top)!.push(w);
      });

      el.innerHTML = ""; // Clear again
      const sortedKeys = Array.from(linesMap.keys()).sort((a, b) => a - b);
      sortedKeys.forEach((top) => {
        const lineWords = linesMap.get(top)!;
        const lineSpan = document.createElement("span");
        lineSpan.className = linesClass;
        lineSpan.style.display = "block";
        lineSpan.style.overflow = "hidden"; // Clip text reveal if needed

        lineWords.forEach((w, idx) => {
          lineSpan.appendChild(w);
          if (idx < lineWords.length - 1) {
            lineSpan.appendChild(document.createTextNode(" "));
          }
        });
        el.appendChild(lineSpan);
        this.lines.push(lineSpan);
      });
    }
  }

  revert() {
    this.elements.forEach((el) => {
      const original = this.originalHTMLs.get(el);
      if (original !== undefined) {
        el.innerHTML = original;
      }
    });
  }
}
