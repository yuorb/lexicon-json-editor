import { Root } from "./typings";

export async function readTextFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", function (e) {
      resolve(e.target?.result as string);
    });
    reader.readAsText(file);
  });
}

export function trimJson(roots: Root[]): Root[] {
  const trimmedRoots: Root[] = JSON.parse(JSON.stringify(roots));
  for (let root of trimmedRoots) {
    if (root.stems === undefined) continue;
    if (root.stems[0] === "" && root.stems[1] === "" && root.stems[2] === "") {
        delete root.stems
    }
    if (root.refers === '') delete root.refers;
    if (root.notes === '') delete root.notes;
    if (root.see === '') delete root.see;
  }
  return trimmedRoots;
}
