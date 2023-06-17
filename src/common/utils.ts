export async function readTextFile(file: File): Promise<string> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener("load", function (e) {
            resolve(e.target?.result as string);
        });
        reader.readAsText(file);
    });
}
